import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import httpService from "../services/httpService";
import UserContext from './userContext';

const CartContext = createContext();

export default CartContext;

export const CartProvider = ({ children }) => {
  const [error, setError] = useState("");
  let [productsInCart, setProductsInCart] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const [shippingAddress, setShippingAddress] = useState(
    localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {}
  );
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "Stripe"
  );
  const navigate = useNavigate();
  const {logout} = useContext(UserContext);

  const addItemToCart = async (id, qty) => {
    const item = productsInCart.find((prod) => prod.id === Number(id));

    if (item) {
      updateItemQty(id, qty);
      return;
    }

    try {
      const { data } = await httpService.get(`/api/products/${id}/`);
      const product = {
        id: data.id,
        name: data.name,
        qty: qty,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
      };

      localStorage.setItem(
        "cartItems",
        JSON.stringify([...productsInCart, product])
      );
      setProductsInCart([...productsInCart, product]);
    } catch (ex) {
      setError(ex.message);
    }
  };

  const updateItemQty = (id, qty) => {
    const item = productsInCart.find((prod) => prod.id === Number(id));

    if (item.qty == Number(qty)) return;

    const product = { ...item };
    product.qty = Number(qty);

    const updatedProductsInCart = productsInCart.map((prod) =>
      prod.id == product.id ? product : prod
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedProductsInCart));
    setProductsInCart(updatedProductsInCart);
  };

  const removeFromCart = (id) => {
    const updatedProductsInCart = productsInCart.filter(
      (prod) => prod.id !== Number(id)
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedProductsInCart));
    setProductsInCart(updatedProductsInCart);
  };

  const updateShippingAddress = (address, city, postalCode, country) => {
    const newShippingAddress = {
      address,
      city,
      postalCode,
      country,
    };

    setShippingAddress(newShippingAddress);
    localStorage.setItem("shippingAddress", JSON.stringify(newShippingAddress));
  };

  const updatePaymentMethod = (method) => {
    setPaymentMethod(method);
    localStorage.setItem("paymentMethod", method);
  };

  const totalItemsPrice = Number(
    productsInCart
      .reduce((acc, prod) => acc + prod.qty * prod.price, 0)
      .toFixed(2)
  );
  const shippingPrice = totalItemsPrice > 1000 ? (totalItemsPrice >= 2000 ? 0 : 100) : 250;
  const taxPrice = Number((0.05 * totalItemsPrice).toFixed(2));
  const totalPrice = totalItemsPrice + shippingPrice + taxPrice;

  const placeOrder = async () => {
    try {
      const { data } = await httpService.post("/api/placeorder/", {
        orderItems: productsInCart,
        shippingAddress,
        paymentMethod,
        itemsPrice: totalItemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      console.log(data);
      setProductsInCart([]);
      localStorage.removeItem("cartItems");
      navigate(`/orders/${data.id}`);
    } catch (ex) {
      if (ex.response && ex.response.status == 403) logout();
      console.log(ex.response);
    }
  };

  const contextData = {
    error,
    productsInCart,
    addItemToCart,
    updateItemQty,
    removeFromCart,
    shippingAddress,
    updateShippingAddress,
    paymentMethod,
    totalItemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    updatePaymentMethod,
    placeOrder,
  };

  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  );
};

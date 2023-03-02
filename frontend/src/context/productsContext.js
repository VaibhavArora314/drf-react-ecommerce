import { createContext, useState } from "react";
import httpService from "../services/httpService";

const ProductsContext = createContext();

export default ProductsContext;

export const ProductsProvider = ({ children }) => {
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadProducts = async (forced = false) => {
    if (productsLoaded && !forced) return;

    try {
      const { data } = await httpService.get("/api/products/");
      setProducts(data);
      const { data: brandsData } = await httpService.get("/api/brands/");
      setBrands(brandsData);
      const { data: categoriesData } = await httpService.get("/api/category/");
      setCategories(categoriesData);
      setError("");
    } catch (ex) {
      setError(ex.message);
    }

    setProductsLoaded(true);
  };

  const loadProduct = async (id) => {
    if (productsLoaded) {
      const product = products.find((p) => p.id == id);
      return product;
    }

    try {
      const { data } = await httpService.get(`/api/products/${id}/`);
      return data;
    } catch (ex) {
      setError(ex.message);
      return {};
    }
  };

  const contextData = {
    products,
    error,
    loadProducts,
    loadProduct,
    // productsLoaded,
    brands,
    categories,
  };

  return (
    <ProductsContext.Provider value={contextData}>
      {children}
    </ProductsContext.Provider>
  );
};

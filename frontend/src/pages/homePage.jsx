import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
import ProductsContext from "../context/productsContext";
import Loader from '../components/loader';
import Message from '../components/message';

function HomePage(props) {
  const { error, products, loadProducts } = useContext(ProductsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      await loadProducts();
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  if (error != "")
    return (
      <Message variant="danger">
        <h4>{error}</h4>
      </Message>
    );

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;

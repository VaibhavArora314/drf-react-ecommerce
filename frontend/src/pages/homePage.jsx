import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
import ProductsContext from "../context/productsContext";
import Loader from "../components/loader";
import Message from "../components/message";
import BrandCard from "../components/brandCard";
import CategoryCard from '../components/categoryCard';
import ProductsCarousel from '../components/productsCarousel';

function HomePage(props) {
  const { error, products, loadProducts, brands, categories } = useContext(ProductsContext);
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

  let popularProducts = [...products];
  popularProducts.sort((a, b) => b.numReviews - a.numReviews);
  popularProducts = popularProducts.slice(0, 6);

  return (
    <div>
      <ProductsCarousel products={products}/>
      <h1>Popular Products</h1>
      <Row>
        {popularProducts.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Row>
        <h2>Brands:</h2>
        {brands.map((brand) => (
          <Col key={brand.id} xs={6} md={4} lg={3} xl={2}>
            <BrandCard brand={brand} />
          </Col>
        ))}
      </Row>
      <Row>
        <h2>Categories:</h2>
        {categories.map((category) => (
          <Col key={category.id} xs={6} md={4} lg={3} xl={2}>
            <CategoryCard category={category} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;

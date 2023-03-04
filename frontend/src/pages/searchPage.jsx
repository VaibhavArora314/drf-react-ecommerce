import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Product from "../components/product";
import ProductsContext from "../context/productsContext";
import Message from "../components/message";
import Loader from "../components/loader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function SearchPage() {
  const { error, products, loadProducts, brands, categories } =
    useContext(ProductsContext);
  const [loading, setLoading] = useState(true);
  const [errorFilters, setErrorFilters] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParam = searchParams.get("brand")
    ? Number(searchParams.get("brand"))
    : 0;
  const categoryParam = searchParams.get("category")
    ? Number(searchParams.get("category"))
    : 0;

  const keyword = searchParams.get("keyword")
    ? searchParams.get("keyword")
    : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadProducts();
        setLoading(false);
      } catch (ex) {
        setErrorFilters(ex.message);
      }
    };
    fetchData();
    setSelectedBrand(brandParam);
    setSelectedCategory(categoryParam);
    window.scrollTo(0, 0);
  }, []);

  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  if (selectedBrand != 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand == selectedBrand
    );
  }

  if (selectedCategory != 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category == selectedCategory
    );
  }

  if (loading) return <Loader />;

  if (error != "" || errorFilters != "")
    return (
      <Message variant="danger">
        <h4>{error != "" ? error : errorFilters}</h4>
      </Message>
    );

  return (
    <div>
      <Row>
        <Col md={3}>
          <h3>Filters</h3>
          <Form>
            <Link
              to={`/search?keyword=${keyword}`}
              className="btn btn-light text-decoration-none"
              onClick={() => {
                setSelectedBrand(0);
                setSelectedCategory(0);
              }}
            >
              Clear all filters{" "}
              <i className="fas fa-times" style={{ color: "red" }}></i>
            </Link>
            <Form.Group className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Select
                value={selectedBrand}
                onChange={({ currentTarget }) => {
                  setSelectedBrand(currentTarget.value);
                  navigate(
                    `/search?keyword=${keyword}&brand=${currentTarget.value}&category=${selectedCategory}`
                  );
                }}
              >
                <option value="0">Select a brand...</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={({ currentTarget }) => {
                  setSelectedCategory(currentTarget.value);
                  navigate(
                    `/search?keyword=${keyword}&brand=${selectedBrand}&category=${currentTarget.value}`
                  );
                }}
              >
                <option value="0">Select a category...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
        <Col md={9}>
          <h3>Filtered Products ({filteredProducts.length} products)</h3>
          <p></p>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default SearchPage;

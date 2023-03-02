import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoryCard({category}) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/search?keyword=&brand=&category=${category.id}`}>
        <Card.Img src={category.image} alt={category.title} style={{objectFit: 'contain',minHeight:'4rem'}} />
      </Link>
      <Card.Body>
        <Link to={`/search?keyword=&brand=&category=${category.id}`} className="text-decoration-none">
          <Card.Title as="div">
            <strong>{category.title}</strong>
          </Card.Title>
        </Link>
        {/* <Card.Text as="p">{category.description}</Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default CategoryCard;

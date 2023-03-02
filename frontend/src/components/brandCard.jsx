import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function BrandCard({brand}) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/search?keyword=&brand=${brand.id}&category=`}>
        <Card.Img src={brand.image} alt={brand.title} style={{objectFit: 'contain',minHeight:'4rem'}}/>
      </Link>
      <Card.Body>
        <Link to={`/search?keyword=&brand=${brand.id}&category=`} className="text-decoration-none">
          <Card.Title as="div">
            <strong>{brand.title}</strong>
          </Card.Title>
        </Link>
        {/* <Card.Text as="p">{brand.description}</Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default BrandCard;

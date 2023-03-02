import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function SearchBox({keyword,setKeyword}) {
  const [keywordText, setKeywordText] = useState(keyword);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const brandParam = queryParams.get("brand")
    ? Number(queryParams.get("brand"))
    : 0;
  const categoryParam = queryParams.get("category")
    ? Number(queryParams.get("category"))
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${keywordText}&brand=${brandParam}&category=${categoryParam}`);
    setKeyword(keywordText);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ display: "flex" }} className="p-1">
      <Form.Control
        type="text"
        placeholder="Enter product name..."
        value={keywordText}
        onChange={(e) => {
          setKeywordText(e.currentTarget.value);
        }}
        className="mx-2"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;

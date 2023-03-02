import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "../context/userContext";
import SearchBox from "./searchBox";

function Header({keyword,setKeyword}) {
  const { userInfo } = useContext(UserContext);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container className="">
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>
          <SearchBox keyword={keyword} setKeyword={setKeyword}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" /> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo && (
                <NavDropdown title={userInfo.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/logout">
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {!userInfo && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [totalCart, setTotalCart] = useState(0);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
     if (cartItems && cartItems.length > 0) {
      let totalItems = 0
      console.log(cartItems)
      cartItems.forEach((item) => {
        totalItems += item.qty;
      });
      setTotalCart(totalItems);
     }
  }, [cartItems]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand expand="xl">G01Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            className="toggle-button"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            {userInfo && !userInfo?.isAdmin && (
              <Route
                render={({ history }) => (
                  <SearchBox className="me-2" history={history} />
                )}
              />
            )}

            <Nav className="ml-auto">
              {userInfo && !userInfo?.isAdmin && (
                <LinkContainer to="/cart" style={{ width: "100px" }}>
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart
                    {totalCart && totalCart > 0 && (
                      <Badge
                        bg="danger"
                        className="badge-style"
                      >
                        {totalCart}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && !userInfo.isAdmin && (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!userInfo && (
                <LinkContainer to="/login" style={{ width: "90px" }}>
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

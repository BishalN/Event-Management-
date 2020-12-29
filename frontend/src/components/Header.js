import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../actions/auth';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>easyEvent</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {!userInfo && (
              <LinkContainer to='/auth'>
                <Nav.Link>Authenticate</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to='/events'>
              <Nav.Link>Events</Nav.Link>
            </LinkContainer>
            {userInfo && (
              <LinkContainer to='/bookings'>
                <Nav.Link>Bookings</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && (
              <LinkContainer to='/events'>
                <Nav.Link onClick={() => dispatch(logout())}>logOut</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

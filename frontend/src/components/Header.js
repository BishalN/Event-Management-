import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>easyEvent</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/auth'>
              <Nav.Link>Authenticate</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/events'>
              <Nav.Link>Events</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/bookings'>
              <Nav.Link>Bookings</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

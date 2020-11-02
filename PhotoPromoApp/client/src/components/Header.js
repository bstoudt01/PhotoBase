import React, { useState, useContext, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { Navbar, Nav, Dropdown, ButtonGroup, Button, Col, Form, NavDropdown } from 'react-bootstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import { GalleryContext } from "../providers/GalleryProvider";
import { PhotoContext } from "../providers/PhotoProvider";

const Header = () => {
  const { getAllGalleriesByUser, galleries, galleryUpdated } = useContext(GalleryContext);
  const { isLoggedIn, logout, activeUser } = useContext(UserProfileContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  useEffect(() => {

    if (activeUser != null) {
      getAllGalleriesByUser(activeUser.id);
    }
  }, [galleryUpdated]);


  return (
    <>

      <div className="fixNavbar">
        <div className="row">
          <div className="col-md-12">
            <Navbar fixed="top" bg="light" expand="md" sticky="top" >
              <Col>
                <Navbar.Brand tag={RRNavLink} href="/">PhotoBase</Navbar.Brand>

                <p>The Place Where Photos Go To Live!</p>
              </Col>
              <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle} />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" navbar>

                  {isLoggedIn &&
                    <>
                      <Nav.Item>
                        <Button href="/image/add">Add Image</Button>
                      </Nav.Item>
                      <div className="dropdown">
                        <Button className="dropbtn" href="/gallery">Gallery</Button>
                        <div className="dropdown-content">
                          <a>Select a gallery</a>
                          {galleries ? galleries.map(g =>
                            <a key={g.id} href={`/gallery/${g.id}`}>{g.name}</a>
                          ) : null}
                        </div>
                      </div>
                    </>
                  }

                  {!isLoggedIn &&
                    <>
                      <Nav.Item>
                        <Nav.Link tag={RRNavLink} href="/login">Login</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link tag={RRNavLink} href="/register">Register</Nav.Link>
                      </Nav.Item>
                    </>
                  }
                </Nav>

                {
                  isLoggedIn &&
                  <>
                    <Nav navbar>

                      <Nav.Item>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </>
                }
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </>
  );

}


export default Header;
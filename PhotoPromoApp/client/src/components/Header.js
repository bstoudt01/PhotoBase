import React, { useState, useContext, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { Navbar, Nav, Dropdown, ButtonGroup, Button, Col } from 'react-bootstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import { GalleryContext } from "../providers/GalleryProvider";


const Header = () => {
  const { getAllGalleriesByUser, galleries } = useContext(GalleryContext);
  const { isLoggedIn, logout, activeUser } = useContext(UserProfileContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  useEffect(() => {

    if (activeUser != null) {
      getAllGalleriesByUser(activeUser.id);
    }
  }, []);



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
                      <Dropdown as={ButtonGroup}>
                        <Button variant="success" href="/gallery">Galleries</Button>

                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                          {galleries ? galleries.map(g =>
                            <Dropdown.Item key={g.id} href={`/gallery/${g.id}`}>{g.name}</Dropdown.Item>
                          ) : null}
                        </Dropdown.Menu>
                      </Dropdown>
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
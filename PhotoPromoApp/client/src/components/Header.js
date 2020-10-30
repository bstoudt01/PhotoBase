import React, { useState, useContext, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownButton,
  SplitButton,
  ButtonGroup,
  Button,
  Col
} from 'react-bootstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ImageProvider } from '../providers/ImageProvider';
import { GalleryContext } from "../providers/GalleryProvider";
import { WindowViewContex } from "./WindowViewHandler";



//export default function Header() {
const Header = () => {
  const { getAllGalleriesByUser, galleries, addGallery } = useContext(GalleryContext);
  const { showNavbar } = useContext(WindowViewContex);

  const { isLoggedIn, logout, activeUser, userTypeId } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    if (activeUser != null) {
      getAllGalleriesByUser(activeUser.id);
    }
  }, []);



  return (
    <>
      {showNavbar ?
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
                    { /* When isLoggedIn === true, we will render the Home link */}
                    {isLoggedIn &&
                      <>
                        <Nav.Item>
                          <Nav.Link href="/image/add">Add Image</Nav.Link>
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
        : null}
    </>
  );

}

// const Header = ({ isNavRoute }) => {

//   if (isNavRoute) {
//     return (<SPAHeader />);
//   }
//   return (<div></div>);
// }


export default Header;
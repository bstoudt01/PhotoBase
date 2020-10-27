import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { GalleryProvider } from "./providers/GalleryProvider";
import ApplicationViews from "./components/ApplicationViews";
import Header from './components/Header';
import { PhotoProvider } from './providers/PhotoProvider';
import Sidebar from "./components/Sidebar";
import { Row, Col } from 'react-bootstrap';
import { ImageProvider } from './providers/ImageProvider';

function App() {

  return (

    <Router>
      <UserProfileProvider>
        <ImageProvider>
          <GalleryProvider>
            <PhotoProvider>
              <Header />
              {/* <Row>
              <Col xs={2} id="sidebar-wrapper">
                <Sidebar />
              </Col>
              <Col xs={10} id="page-content-wrapper">
                <ApplicationViews />
              </Col>
            </Row> */}
              <ApplicationViews />

            </PhotoProvider>
          </GalleryProvider>
        </ImageProvider>
      </UserProfileProvider>
    </Router>


  );
}

export default App;

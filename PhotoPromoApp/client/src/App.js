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
import { WindowViewHandler } from './components/WindowViewHandler';
function App() {

  return (

    <Router>
      <UserProfileProvider>
        <ImageProvider>
          <GalleryProvider>
            <PhotoProvider>
              <WindowViewHandler >
                {/* <Header /> */}
                <ApplicationViews />
              </WindowViewHandler>
            </PhotoProvider>
          </GalleryProvider>
        </ImageProvider>
      </UserProfileProvider>
    </Router>



  );
}

export default App;

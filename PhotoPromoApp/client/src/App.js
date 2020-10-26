import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { GalleryProvider } from "./providers/GalleryProvider";
import ApplicationViews from "./components/ApplicationViews";
import Header from './components/Header';
import { PhotoProvider } from './providers/PhotoProvider';

function App() {

  return (

    <Router>
      <UserProfileProvider>
        <GalleryProvider>
          <PhotoProvider>
            <Header />
            <ApplicationViews />
          </PhotoProvider>
        </GalleryProvider>
      </UserProfileProvider>
    </Router>


  );
}

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { GalleryProvider } from "./providers/GalleryProvider";
import ApplicationViews from "./components/ApplicationViews";

function App() {

  return (

    <Router>
      <UserProfileProvider>
        <GalleryProvider>
          <ApplicationViews />
        </GalleryProvider>
      </UserProfileProvider>
    </Router>


  );
}

export default App;

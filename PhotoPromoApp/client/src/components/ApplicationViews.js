import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Register from "./Register";
import Login from "./Login";
import GalleryList from "./Gallery/GalleryList";
import PhotoListByGallery from "./Photo/PhotoListByGallery";
import AddPhoto from "./Photo/AddPhoto";
import SinglePhoto from "./Photo/SinglePhoto";
import SinglePhotoThirdParty from "./Photo/SinglePhotoThirdParty";
import Home from "./Home";
import AddPhotoMultiple from "./Photo/AddPhotoMultiple";
import RandomPhotoPublic from "./Photo/RandomPhotoPublic";
import NotFoundPage from "./NotFoundPage";

export default function ApplicationViews(props) {
    const { isLoggedIn } = useContext(UserProfileContext);


    return (
        <>
            <main>

                <Switch>
                    {/* Register and Login Public Routes */}
                    <Route exact path="/">
                        {isLoggedIn ? <GalleryList /> : <Redirect to="/Home" />}
                    </Route>
                    <Route exact path="/home">
                        <Home />
                    </Route>

                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route path="/register">
                        <Register />
                    </Route>

                    {/* Authenticated Routes */}
                    <Route exact path="/gallery">
                        {isLoggedIn ? <GalleryList /> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/gallery/:id">
                        {isLoggedIn ? <PhotoListByGallery /> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/image/add">
                        {isLoggedIn ? <AddPhoto /> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/image/addmany">
                        {isLoggedIn ? <AddPhotoMultiple /> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/image/:id">
                        {isLoggedIn ? <SinglePhoto /> : <Redirect to="/Login" />}
                    </Route>



                    {/* Public Image Routes, none of these routes include the Navbar, set by "setShowNavbar(false)" 
                    from context from windowview handler who controlls TopLevelView using that state.. 
                    toplevel view contains application view and header*/}

                    {/* Matching of PhotoId to UserId is used to confirm that the imageId belongs to that user 
                to avoid incorrect images being displayed, This is not a secure practice just a quality standard  */}

                    {/* User-specific Photo including width by height resolution */}
                    <Route exact path="/image/:photoId/:width/:userId" >
                        < SinglePhotoThirdParty />
                    </Route>
\
                     {/* Random Public Photo including HxW resolution, 
                     this will eventualy include logo placed on image ( create copy with logo on image upload) */}
                    <Route exact path="/image/random/:width" >
                        < RandomPhotoPublic />
                    </Route>


                    <Route >
                        <NotFoundPage />
                    </Route>
                </Switch>
            </main>








        </>
    );
};
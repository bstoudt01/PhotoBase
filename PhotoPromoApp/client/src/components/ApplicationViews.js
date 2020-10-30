import React, { useContext, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Register from "./Register";
import Login from "./Login";
import GalleryList from "./Gallery/GalleryList";
import PhotoListByGallery from "./Photo/PhotoListByGallery";
import AddPhoto from "./Photo/AddPhoto";
import AddGallery from "./Gallery/AddGallery";
import EditGallery from "./Gallery/EditGallery";
import SinglePhoto from "./Photo/SinglePhoto";
import SinglePhotoThirdParty from "./Photo/SinglePhotoThirdParty";
import Home from "./Home";
import Header from "./Header";
import { ImageProvider } from "../providers/ImageProvider";
import { Navbar } from "react-bootstrap";
import AddPhotoMultiple from "./Photo/AddPhotoMultiple";
import { WindowViewContex } from "./WindowViewHandler";
import RandomPhotoPublic from "./Photo/RandomPhotoPublic";
export default function ApplicationViews(props) {
    const { isLoggedIn, activeUser, userTypeId } = useContext(UserProfileContext);
    const [refresh, setRefresh] = useState(false);


    return (
        <>
            <main>

                <Switch>
                    {/* Register and Login Public Routes */}
                    <Route exact path="/">
                        {isLoggedIn ? <GalleryList /> : <Redirect to="/Home" />}
                    </Route>
                    <Route exact path="/home">
                        <><Header /> <Home /> </>
                    </Route>

                    <Route path="/login">
                        <><Header /> <Login /></>
                    </Route>

                    <Route path="/register">
                        <><Header /><Register /> </>
                    </Route>

                    {/* Authenticated Routes */}
                    <Route exact path="/gallery">
                        {isLoggedIn ? <><Header /><GalleryList /> </> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/gallery/edit/:id">
                        {isLoggedIn ? <><Header /><EditGallery /></> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/gallery/:id">
                        {isLoggedIn ? <><Header /><PhotoListByGallery /></> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/gallery/add">
                        {isLoggedIn ? <><Header /> <AddGallery /> </> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/image/add">
                        {isLoggedIn ? <><Header /><AddPhoto /></> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/image/addmany">
                        {isLoggedIn ? <><Header /><AddPhotoMultiple /></> : <Redirect to="/Login" />}
                    </Route>

                    <Route exact path="/image/:id">
                        {isLoggedIn ? <><Header /><SinglePhoto /></> : <Redirect to="/Login" />}
                    </Route>

                    {/* Public Image Routes, none include the Navbar*/}
                    {/* Matching of PhotoId to UserId is used to confirm that the imageId belongs to that user 
                to avoid incorrect images being displayed, This is not a secure practice just a quality standard  */}

                    {/* User-specific Photo including width by height resolution */}
                    <Route exact path="/image/:photoId/:width/:heigt/:userId" >
                        < SinglePhotoThirdParty />
                    </Route>
\
                     {/* Random Public Photo including HxW resolution, this will eventualy include logo placed on image ( create copy with logo on image upload) */}
                    <Route exact path="/image/random/:width/:height" >
                        < RandomPhotoPublic />
                    </Route>
                </Switch>
            </main>








        </>
    );
};
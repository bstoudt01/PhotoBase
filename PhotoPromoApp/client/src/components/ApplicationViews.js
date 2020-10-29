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
import SinglePhoto3rdParty from "./Photo/SinglePhoto3rdParty";
export default function ApplicationViews(props) {
    const { isLoggedIn, activeUser, userTypeId } = useContext(UserProfileContext);
    const [refresh, setRefresh] = useState(false);

    return (
        <main>
            <Switch>
                {/* Register and Login Public Routes */}
                <Route exact path="/">
                    <Login />
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

                <Route exact path="/gallery/edit/:id">
                    {isLoggedIn ? <EditGallery /> : <Redirect to="/Login" />}
                </Route>

                <Route exact path="/gallery/:id">
                    {isLoggedIn ? <PhotoListByGallery /> : <Redirect to="/Login" />}
                </Route>

                <Route exact path="/gallery/add">
                    {isLoggedIn ? <AddGallery /> : <Redirect to="/Login" />}
                </Route>

                <Route exact path="/image/add">
                    {isLoggedIn ? <AddPhoto /> : <Redirect to="/Login" />}
                </Route>

                <Route exact path="/image/:id">
                    {isLoggedIn ? <SinglePhoto /> : <Redirect to="/Login" />}
                </Route>

                {/* Public Image Routes */}
                {/* Matching of PhotoId to UserId is used to confirm that the imageId belongs to that user 
                to avoid incorrect images being displayed, This is not a secure practice just a quality standard  */}

                {/* User-specific Photo including HxW resolution */}
                <Route exact path="/image/:photoId/:height/:width/:userId">
                    <SinglePhoto3rdParty />
                </Route>

                {/* Random Public Photo including HxW resolution, this will include logo placed on image ( create copy with logo on image upload) */}
                {/* <Route exact path="/image/random/:height/:width">
                </Route> */}


            </Switch>
        </main >
    );
};
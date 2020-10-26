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

export default function ApplicationViews(props) {
    const { isLoggedIn, activeUser, userTypeId } = useContext(UserProfileContext);
    const [refresh, setRefresh] = useState(false);

    return (
        <main>
            <Switch>

                <Route exact path="/">
                    <Login />
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route exact path="/gallery">
                    {isLoggedIn ? <GalleryList /> : <Redirect to="/Login" />}
                </Route>
                <Route exact path="/gallery/edit/:id">
                    {isLoggedIn ? <EditGallery /> : <Redirect to="/Login" />}
                </Route>

                <Route exact path="/gallery/detials/:id">
                    {isLoggedIn ? <PhotoListByGallery /> : <Redirect to="/Login" />}
                </Route>

                <Route exact path="/image/add">
                    {isLoggedIn ? <AddPhoto /> : <Redirect to="/Login" />}
                </Route>
                <Route exact path="/gallery/add">
                    {isLoggedIn ? <AddGallery /> : <Redirect to="/Login" />}
                </Route>


            </Switch>
        </main >
    );
};
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
import Header from "./Header";
import { ImageProvider } from "../providers/ImageProvider";
import { Navbar } from "react-bootstrap";


export default function ApplicationViews(props) {
    const { isLoggedIn, activeUser, userTypeId } = useContext(UserProfileContext);
    const [refresh, setRefresh] = useState(false);
    //const [isNotSPARoute, setIsNotSPARoute] = useState(false)

    //Set  NavHeader "false" to Not render navigation bar

    // const NavbarRoute = () => { if (isNavRoute) { < Header isNavRoute={false} /> } else { < Header isNavRoute={true} /> } }

    return (
        <>
            <>
                {/* {NavbarRoute ? <Navbar></Navbar> :<nav></nav> } */}
                <Header isNavRoute={true} />

                <main>


                    {/* {isNotSPARoute ? <Header isSPARoute={true} /> : <Header isSPARoute={false} />} */}

                    <Switch>
                        {/* Register and Login Public Routes */}
                        <Route exact path="/" >

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





                    </Switch>
                </main >
            </>
            <>
                {/* Public Image Routes, none include the Navbar*/}
                {/* Matching of PhotoId to UserId is used to confirm that the imageId belongs to that user 
                to avoid incorrect images being displayed, This is not a secure practice just a quality standard  */}

                {/* User-specific Photo including width by height resolution */}
                <Header isNavRoute={false} />


                <main>
                    <Switch>
                        <Route exact path="/image/:photoId/:width/:heigt/:userId" >
                            {/* {!SPAHeader} */}
                            {/* <Header isSPARoute={false} />                     */}
                            < SinglePhotoThirdParty />

                        </Route>

                        {/* Random Public Photo including HxW resolution, this will include logo placed on image ( create copy with logo on image upload) */}
                        {/* <Route exact path="/image/random/:height/:width">
                </Route> */}


                    </Switch>
                </main >
            </>
        </>
    );
};
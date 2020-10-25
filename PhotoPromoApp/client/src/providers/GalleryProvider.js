import React, { useState, createContext, useContext } from "react";

import { useHistory } from "react-router-dom";

import { UserProfileContext } from "./UserProfileProvider";

export const GalleryContext = createContext();

export function GalleryProvider(props) {
    const apiUrl = "/api/gallery";

    const history = useHistory();

    const [galleries, setGalleries] = useState([]);
    const [gallery, setGallery] = useState([]);

    const [photosByGallery, setPhotosByGallery] = useState([]);




    const { getToken } = useContext(UserProfileContext);

    const getAllGalleriesByUser = (userProfileId) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/UserProfile/${userProfileId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setGalleries));

    const getSingleGallery = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setGallery);
                }
                history.push("/gallery")
                //throw new Error("Unauthorized");
            }));



    return (
        <GalleryContext.Provider value={{ getToken, galleries, gallery, getAllGalleriesByUser, getSingleGallery }}>
            {props.children}
        </GalleryContext.Provider>
    );
}
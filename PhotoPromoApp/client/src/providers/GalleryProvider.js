import React, { useState, createContext, useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { UserProfileContext } from "./UserProfileProvider";

export const GalleryContext = createContext();

export function GalleryProvider(props) {

    const apiUrl = "/api/gallery";
    const history = useHistory();

    const [galleries, setGalleries] = useState([]);
    const [gallery, setGallery] = useState({});
    const [galleryUpdated, setGalleryUpdated] = useState(false);
    const [galleryLoaded, setGalleryLoaded] = useState(false);
    const { getToken } = useContext(UserProfileContext);

    const getAllGalleriesByUser = (userProfileId) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/UserProfile/${userProfileId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => resp.json()).then(setGalleries)
        );

    //useeffect watching galleries , if galleries is uppdateed change galleryLoaded
    //galleryLoaded is NOT placed in a useEffect on gallery list
    //galleryUpdated is in a useEffect on gallery list
    useEffect(() => {

        setGalleryLoaded(!galleryLoaded);
    }, [galleries]);

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
                throw new Error("Unauthorized");
            }));

    const addGallery = (gallery) =>
        getToken().then((token) =>
            fetch("/api/gallery", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(gallery)
            }).then(resp => {
                if (resp.ok) {
                    setGalleryUpdated(!galleryUpdated)
                    return resp.json()
                }
                throw new Error("Unauthorized");
            }));

    const updateGallery = (updatedGallery) =>
        getToken().then((token) =>
            fetch(`/api/gallery/${updatedGallery.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedGallery)

            }).then((resp) => resp.json()).then(setGalleryUpdated(!galleryUpdated))
        );


    const deleteGallery = (deletedGallery) =>
        getToken().then((token) =>
            fetch(`/api/gallery/${deletedGallery.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deletedGallery)
            }).then(resp => {
                if (resp.ok) {
                    setGalleryUpdated(!galleryUpdated)
                    return resp.json()
                }
                throw new Error("Unauthorized");
            }));
    return (
        <GalleryContext.Provider value={{ getToken, galleryLoaded, galleries, gallery, galleryUpdated, getAllGalleriesByUser, getSingleGallery, addGallery, updateGallery, deleteGallery, setGalleries }}>
            {props.children}
        </GalleryContext.Provider>
    );
}
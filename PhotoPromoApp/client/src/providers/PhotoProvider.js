import React, { useState, createContext, useContext } from "react";

import { useHistory } from "react-router-dom";

import { UserProfileContext } from "./UserProfileProvider";

export const PhotoContext = createContext();

export function PhotoProvider(props) {
    const apiUrl = "/api/photo";

    const history = useHistory();

    const [photosByUser, setPhotosByUser] = useState([]);
    const [photosByGallery, setPhotosByGallery] = useState([]);
    //const [photoFormData, setPhotoFormData] = useState()

    const [photo, setPhoto] = useState([]);


    const { getToken } = useContext(UserProfileContext);

    const getAllPhotosByUser = (userProfileId) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/UserProfile/${userProfileId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPhotosByUser));

    const getAllPhotosByGallery = (galleryId) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/Gallery/${galleryId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPhotosByGallery));

    const getSinglePhoto = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setPhoto);
                }
                history.push("/photo")
                //throw new Error("Unauthorized");
            }));

    const addPhoto = (photoFormData) =>
        getToken().then((token) =>
            fetch(`${apiUrl}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: photoFormData
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                })
                .catch((error) => {
                    console.error('Error:', error);
                }));

    return (
        <PhotoContext.Provider value={{ getToken, addPhoto, photosByGallery, photosByUser, photo, getAllPhotosByUser, getAllPhotosByGallery, getSinglePhoto }}>
            {props.children}
        </PhotoContext.Provider>
    );
}
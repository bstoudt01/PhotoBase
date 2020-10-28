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

    const addPhoto = (photo) =>
        getToken().then((token) =>
            fetch(`${apiUrl}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(photo)
                }).then(resp => {
                    if (resp.ok) {
                        return resp.json();
                    }
                    //debugger
                    throw new Error("Unauthorized");
                }));
    // const addPhoto = (photoFormData) =>
    //     getToken().then((token) =>
    //         fetch(`${apiUrl}`,
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 },
    //                 body: photoFormData
    //             })
    //             .then((response) => response.json())
    //             .then((result) => {
    //                 console.log('Success:', result);
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             }));

    const updatePhoto = (updatedPhoto) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${updatedPhoto.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedPhoto)

            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    const deletePhoto = (deletedPhoto) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${deletedPhoto.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deletedPhoto)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    return (
        <PhotoContext.Provider value={{ getToken, addPhoto, photosByGallery, photosByUser, photo, getAllPhotosByUser, getAllPhotosByGallery, getSinglePhoto, updatePhoto, deletePhoto }}>
            {props.children}
        </PhotoContext.Provider>
    );
}
import React, { useState, createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "./UserProfileProvider";

export const PhotoContext = createContext();

export function PhotoProvider(props) {

    const apiUrl = "/api/photo";
    const history = useHistory();

    const [photosByUser, setPhotosByUser] = useState([]);
    const [photosByGallery, setPhotosByGallery] = useState([]);
    const [newlyUpdatedPhoto, setNewlyUpdatedPhoto] = useState({});




    const [photoUpdated, setPhotoUpdated] = useState(false);
    const [photoLoaded, setPhotoLoaded] = useState(false);

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
            }).then((resp) => {
                resp.json().then(setPhotosByGallery)
            }));

    //watchin state...
    //when photo is deleted this useEffect is triggered during the http DELETE fetch, that useEffect changes 
    //when loadPhotoList changes, the useEffect on PhootListByGallery is triggered and getAllPhotosByGallery is run again
    useEffect(() => {
        setPhotoLoaded(!photoLoaded);
    }, [photosByGallery]);


    const getSinglePhoto = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setNewlyUpdatedPhoto);
                }
            }));

    //when Photo Updates it triggers this useEffect which changes loadSinglePhoto
    //loadsinglePhoto triggers a useEffect on Photo.js that has a conditional inside of it... if the update button has been clicked the conditontional is true and it runs, if not, notthing happens
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
                    setPhotoUpdated(!photoUpdated)
                    if (resp.ok) {
                        return resp.json();
                    }
                }));


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
                    (setPhotoUpdated(!photoUpdated));

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
                    (setPhotoUpdated(!photoUpdated));
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));


    return (
        <PhotoContext.Provider value={{ getToken, photoUpdated, addPhoto, photosByGallery, photosByUser, newlyUpdatedPhoto, getAllPhotosByUser, getAllPhotosByGallery, getSinglePhoto, updatePhoto, deletePhoto }}>
            {props.children}
        </PhotoContext.Provider>
    );
}
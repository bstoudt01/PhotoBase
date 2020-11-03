import React, { useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const ImageContext = createContext();

export const ImageProvider = (props) => {

    const apiUrl = "/api/image";
    const { getToken } = useContext(UserProfileContext);


    const addImage = (file) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                body: file,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {

                if (resp.ok) {
                    return resp;
                }
                throw new Error("Image Upload Failed.")
            }))
    };


    const deleteImage = (deletedImage) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${deletedImage.photoLocation}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deletedImage)
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            }));


    const getImageName = (imageName) => {
        if (imageName !== undefined || imageName != null) {
            const getName = `${apiUrl}/${imageName}`

            return (getName)
        }
    };


    const getImageId = (imageId) => {

        if (imageId !== undefined || imageId != null) {
            const getId = `${apiUrl}/${imageId}`

            return (getId)
        }
    };

    const getSingleImageThirdParty = (imageParams) => {

        if (imageParams !== undefined) {

            const getThirdParty = `${apiUrl}/custom/${imageParams.photoId}/${imageParams.width}/${imageParams.userId}`

            return (getThirdParty)

        }
    };


    const getRandomPublicImage = (imageParams) => {

        if (imageParams !== undefined) {

            const getRandomPublicImage = `${apiUrl}/random/${imageParams.width}`

            return (getRandomPublicImage)
        }
    };

    return (
        <ImageContext.Provider value={{ getRandomPublicImage, getImageId, getImageName, addImage, deleteImage, getSingleImageThirdParty }}>
            {props.children}
        </ImageContext.Provider>
    );
};
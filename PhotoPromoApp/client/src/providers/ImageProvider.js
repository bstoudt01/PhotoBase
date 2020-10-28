import React, { useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const ImageContext = createContext();

export const ImageProvider = (props) => {

    const { getToken } = useContext(UserProfileContext);

    const addImage = (file) =>
        getToken().then((token) =>
            fetch('/api/image', {
                method: "POST",
                body: file,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {

                if (resp.ok) {
                    return;
                }
                throw new Error("Image Upload Failed.")
            }));


    const deleteImage = (deletedImage) =>
        getToken().then((token) =>
            fetch(`/api/image/${deletedImage.name}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deletedImage)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    const getImageUrl = (imageUrl) => {
        const getUrl = `/api/image/${imageUrl}`
        return (getUrl)
    };




    return (
        <ImageContext.Provider value={{ getImageUrl, addImage, deleteImage }}>
            {props.children}
        </ImageContext.Provider>
    );
};
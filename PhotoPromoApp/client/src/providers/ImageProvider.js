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

    const getImageUrl = (imageUrl) => {
        const getUrl = `/api/image/${imageUrl}`
        return (getUrl)
    };




    return (
        <ImageContext.Provider value={{ getImageUrl, addImage }}>
            {props.children}
        </ImageContext.Provider>
    );
};
import React, { useContext, createContext, useState } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const ImageContext = createContext();

export const ImageProvider = (props) => {

    const apiUrl = "/api/image";

    const { getToken } = useContext(UserProfileContext);

    const [singleImageThirdParty, setSingleImageThirdParty] = useState();
    const [publicPhotoId, setPublicPhotoId] = useState();
    const [publicPhotoUserId, setPublicPhotoUserId] = useState();
    const [publicPhotoWidth, setPublicPhotoWidth] = useState();
    const [publicPhotoHeight, setPublicPhotoHeight] = useState();



    // var productsToReturn = [];
    // const addImagemultple = (file).map(singleFile => {
    //     //create a promise for each API call
    //     return new Promise((resolve, reject) => {
    //         fetch(apiUrl, {
    //             method: "POST",
    //             body: singleFile,
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             },
    //         }).then((err, res, body) => {
    //             if (err) { reject(err) }
    //             //call the resolve function which is passed to the executor                             //function passed to the promise
    //             resolve(body)
    //         })
    //     })
    // })
    // Promise.all(requests).then((body) => {
    //     //this gets called when all the promises have resolved/rejected.
    //     body.forEach(res => {
    //         if (res)
    //             productsToReturn.push(JSON.parse(res).productInfo)
    //     })
    // }).catch(err => console.log(err))





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
                    return;
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

            const get3rdParty = `${apiUrl}/custom/${imageParams.photoId}/${imageParams.width}/${imageParams.userId}`

            return (get3rdParty)



            // return fetch(`${apiUrl}/unique/${imageParams.photoId}/${imageParams.width}/${imageParams.height}/${imageParams.userId}`, {
            //     method: "GET"
            // }).then(resp => {
            //     const reader = resp.body.getReader();
            //     //.then(resp => {
            //     if (resp.ok) {
            //         debugger

            //         return new ReadableStream({
            //             start(controller) {
            //                 return pump();
            //                 function pump() {
            //                     return reader.read().then(({ done, value }) => {
            //                         // When no more data needs to be consumed, close the stream
            //                         if (done) {
            //                             controller.close();
            //                             return;
            //                         }
            //                         // Enqueue the next data chunk into our target stream
            //                         controller.enqueue(value);
            //                         return pump();
            //                     });
            //                 }
            //             }
            //         })


            //             // return resp.body.getReader().read().then(({ value, done }) => {
            //             //     console.log(decoder.decode(value))
            //             // })
            //             //.then((resp) => setSingleImage3rdParty(resp.url));

            //             //return resp.json().then((resp) => setSingleImage3rdParty(resp.url));
            //             .then(stream => new Response(stream))
            //             .then(response => response.blob())
            //             .then(blob => URL.createObjectURL(blob))
            //             .then(url => console.log(image.src = url))
            //             .catch(err => console.error(err));
            //     }
            //history.push("/gallery")
            //throw new Error("Unauthorized");
            // })
        }
    };


    const getRandomPublicImage = (imageParams) => {

        if (imageParams !== undefined) {

            const getRandomPublicImage = `${apiUrl}/random/${imageParams.width}`

            return (getRandomPublicImage)
        }
    };

    return (
        <ImageContext.Provider value={{ getRandomPublicImage, getImageId, getImageName, addImage, deleteImage, getSingleImageThirdParty, singleImageThirdParty, setPublicPhotoId, setPublicPhotoWidth, setPublicPhotoHeight, setPublicPhotoUserId }}>
            {props.children}
        </ImageContext.Provider>
    );
};
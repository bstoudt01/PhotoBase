import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg, Modal, Form, Image, Container } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
export default function SinglePhoto() {
    const { activeUser } = useContext(UserProfileContext);
    const { getImageUrl, getSingleImage3rdParty, singleImage3rdParty, setPublicPhotoId, setPublicPhotoWidth, setPublicPhotoHeight, setPublicPhotoUserId, getUniquePublicPhoto, getImageId } = useContext(ImageContext);
    const { deletePhoto, updatePhoto } = useContext(PhotoContext);


    const { id, width, height, userId } = useParams();
    const imageId = getImageId(id);
    // useEffect(() => {

    //     setPublicPhotoId(photoId);
    //     setPublicPhotoWidth(width);
    //     setPublicPhotoHeight(height);
    //     setPublicPhotoUserId(userId);

    //     let imageParams = { photoId, width, height, userId }


    // }, []);


    return (
        <>
            <Container>

                {imageId === "" || imageId === null || imageId === undefined ?
                    <Image />
                    :

                    <Image src={imageId} alt="singleImage" fluid />
                }

            </Container>
        </>

    );
}
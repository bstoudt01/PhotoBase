import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg, Modal, Form, Image, Container } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
export default function SinglePhoto3rdParty() {
    const { activeUser } = useContext(UserProfileContext);
    const { getImageUrl, getSingleImage3rdParty, singleImage3rdParty, setPublicPhotoId, setPublicPhotoWidth, setPublicPhotoHeight, setPublicPhotoUserId, getUniquePublicPhoto } = useContext(ImageContext);
    const { deletePhoto, updatePhoto } = useContext(PhotoContext);


    const { photoId, width, height, userId } = useParams();
    useEffect(() => {

        setPublicPhotoId(photoId);
        setPublicPhotoWidth(width);
        setPublicPhotoHeight(height);
        setPublicPhotoUserId(userId);
        debugger
        let imageParams = { photoId, width, height, userId }
        getSingleImage3rdParty(imageParams);


    }, []);


    return (
        <Container>
            {singleImage3rdParty === "" || singleImage3rdParty === null ?
                <Image />
                :

                <Image src={singleImage3rdParty} alt="singleImage" fluid />

            }
        </Container>

    );
}
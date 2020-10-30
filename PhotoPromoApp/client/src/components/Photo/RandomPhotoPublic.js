import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg, Modal, Form, Image, Container } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
import { WindowViewContex } from "../WindowViewHandler";
export default function RandomPhotoPublic() {
    const { activeUser } = useContext(UserProfileContext);
    const { getRandomPublicImage } = useContext(ImageContext);
    const { deletePhoto, updatePhoto } = useContext(PhotoContext);
    const { setShowNavbar } = useContext(WindowViewContex);

    const { width, height } = useParams();
    const imageParams = { width, height }

    const imageId = getRandomPublicImage(imageParams);
    useEffect(() => {

        setShowNavbar(false)

        // setPublicPhotoId(photoId);
        // setPublicPhotoWidth(width);
        // setPublicPhotoHeight(height);
        // setPublicPhotoUserId(userId);

        //  getSingleImage3rdParty(imageParams);


    }, []);


    return (
        <Container>
            {imageId === "" || imageId === null ?
                <Image />
                :

                <Image src={imageId} alt="singleImage" fluid />

            }
        </Container>

    );
}
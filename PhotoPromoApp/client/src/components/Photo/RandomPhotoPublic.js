import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { WindowViewContext } from "../WindowViewHandler";
export default function RandomPhotoPublic() {
    const { getRandomPublicImage } = useContext(ImageContext);
    const { setShowNavbar } = useContext(WindowViewContext);

    const { width, height } = useParams();
    const imageParams = { width, height }

    const imageId = getRandomPublicImage(imageParams);
    useEffect(() => {

        setShowNavbar(false)

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
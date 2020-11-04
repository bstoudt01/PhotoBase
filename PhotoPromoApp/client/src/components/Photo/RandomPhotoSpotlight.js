import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { WindowViewContext } from "../WindowViewHandler";
export default function RandomPhotoSpotlight(spotlightImage) {
    const { getRandomPublicImage } = useContext(ImageContext);
    const { setShowNavbar } = useContext(WindowViewContext);

    //   const imageParams = 200;

    //    const imageId = getRandomPublicImage(imageParams);
    // useEffect(() => {

    //     setShowNavbar(false)

    // }, []);


    return (
        <Container>
            {spotlightImage === "" || spotlightImage === null ?
                <Image />
                :
                <Image style={{ width: "auto" }} src={spotlightImage} alt="singleImage" fluid />

            }
        </Container>

    );
}
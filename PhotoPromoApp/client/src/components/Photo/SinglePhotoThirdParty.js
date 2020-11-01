import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { WindowViewContext } from "../WindowViewHandler";
export default function SinglePhotoThirdParty() {

    const { getSingleImageThirdParty } = useContext(ImageContext);
    const { setShowNavbar } = useContext(WindowViewContext);

    const { photoId, width, height, userId } = useParams();

    const imageParams = { photoId, width, height, userId }

    const imageId = getSingleImageThirdParty(imageParams);

    useEffect(() => {
        setShowNavbar(false)

    }, []);


    return (
        <Container>

            {imageId === "" || imageId === null ?
                <Image />
                :
                <div ><Image src={imageId} alt="singleImage" /></div>
            }
        </Container>

    );
}
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { WindowViewContext } from "../WindowViewHandler";
import "../.././App.css"
export default function SinglePhotoThirdParty() {

    const { getSingleImageThirdParty } = useContext(ImageContext);
    const { setShowNavbar } = useContext(WindowViewContext);

    const { photoId, width, userId } = useParams();

    const imageParams = { photoId, width, userId }

    const imageId = getSingleImageThirdParty(imageParams);

    useEffect(() => {

        setShowNavbar(false)
    }, []);


    return (
        <Container>

            {imageId === "" || imageId === null || imageId === undefined ?
                <div>Sorry It looks like there is a mistake in you request</div>
                :
                <div ><Image className="centerImage" style={{ width: "auto" }} src={imageId} alt="singleImage" /></div>
            }
        </Container>

    );
}
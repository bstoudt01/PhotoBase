import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { WindowViewContext } from "../WindowViewHandler";
import "../../App.css";

export default function RandomPhotoPublic() {

    const { getRandomPublicImage } = useContext(ImageContext);
    const { setShowNavbar } = useContext(WindowViewContext);

    const { width } = useParams();
    const imageParams = { width }

    const imageId = getRandomPublicImage(imageParams);
    useEffect(() => {

        setShowNavbar(false)

    }, []);


    return (
        <Container>
            {imageId === "" || imageId === null ?
                <Image />
                :
                <Image className="centerImage" style={{ width: "auto" }} src={imageId} alt="singleImage" fluid />

            }
        </Container>

    );
}
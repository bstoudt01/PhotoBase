import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
export default function SinglePhoto() {
    const { getImageId } = useContext(ImageContext);


    const { id } = useParams();
    const imageId = getImageId(id);



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
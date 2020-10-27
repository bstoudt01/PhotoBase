import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";

export default function Photo({ photo }) {
    const { activeUser } = useContext(UserProfileContext);

    const { getImageUrl } = useContext(ImageContext);
    const imageUrl = getImageUrl(photo.photoLocation);


    return (
        <Col>
            <Card body>
                <Row>
                    <Col>
                        <strong>{photo.name}</strong>
                        {/* <Image src={photo.photoLocation}></Image> */}

                    </Col>
                    {photo.photoLocation === "" || photo.photoLocation === null ?
                        <CardImg top />
                        :
                        <CardImg top src={imageUrl} alt={photo.title} />
                    }
                </Row>
            </Card >
        </Col >
    );
}
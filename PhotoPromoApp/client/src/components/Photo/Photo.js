import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, Image } from "react-bootstrap";

export default function Photo({ photo }) {
    const { activeUser } = useContext(UserProfileContext);

    return (
        <Col>
            <Card body>
                <Row>
                    <Col>
                        <strong>{photo.name}</strong>
                        <Image src={photo.photoLocation}></Image>

                    </Col>

                </Row>
            </Card >
        </Col >
    );
}
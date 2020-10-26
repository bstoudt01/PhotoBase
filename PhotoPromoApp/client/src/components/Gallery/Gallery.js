import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row } from "react-bootstrap";

export default function Gallery({ gallery }) {
    const { activeUser } = useContext(UserProfileContext);

    return (
        <Col>
            <Card body>
                <Row>
                    <Col sm="9">
                        <strong>{gallery.name}</strong>
                    </Col>

                </Row>
            </Card >
        </Col >
    );
}
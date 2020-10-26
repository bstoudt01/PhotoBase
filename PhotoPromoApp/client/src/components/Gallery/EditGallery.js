import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { GalleryContext } from "../../providers/GalleryProvider";
import { useParams } from "react-router-dom";
import { Card, Button, Col, Row, Image, Form } from "react-bootstrap";
import Gallery from "./Gallery";
export default function EditGallery() {
    const { activeUser } = useContext(UserProfileContext);
    const { getSingleGallery, gallery, updateGallery } = useContext(GalleryContext);
    const [Name, setName] = useState();
    const { id } = useParams();

    // const [UserProfileId, setImageGalleryId] = useState();

    const handleAddGallery = () => {
        const newGallery = {
            id: gallery.id,
            name: Name,
            userProfileId: gallery.userProfileId
        }
        debugger
        updateGallery(newGallery)
    };
    useEffect(() => {
        getSingleGallery(id);

    }, []);
    return (
        <Col>
            <Card body>
                <Row>
                    <Col>
                        <Form onSubmit={handleAddGallery}>


                            <Form.Group controlId="galleryName">
                                <Form.Label>Name: </Form.Label>
                                <Form.Control type="text" placeholder="Sunset In The Park" defaultValue={gallery.name} onChange={e => setName(e.target.value)} />
                            </Form.Group>


                            <Form.Group>
                                <Button type="submit">Submit</Button>
                            </Form.Group>
                        </Form>

                    </Col>

                </Row>
            </Card >
        </Col >
    );
}
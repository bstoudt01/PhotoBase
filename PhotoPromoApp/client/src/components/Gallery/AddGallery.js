import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { GalleryContext } from "../../providers/GalleryProvider";
import { Card, Button, Col, Row, Image, Form } from "react-bootstrap";
import Gallery from "./Gallery";
export default function AddGallery() {
    const { activeUser } = useContext(UserProfileContext);
    const { getAllGalleriesByUser, galleries, addGallery } = useContext(GalleryContext);
    const [Name, setName] = useState();
    // const [UserProfileId, setImageGalleryId] = useState();

    const handleAddPhoto = () => {
        const newGallery = {
            name: Name
        }
        debugger
        addGallery(newGallery)
    };
    useEffect(() => {
        getAllGalleriesByUser(activeUser.id);

    }, []);
    return (
        <Col>
            <Card body>
                <Row>
                    <Col>
                        <Form onSubmit={handleAddPhoto}>


                            <Form.Group controlId="galleryName">
                                <Form.Label>Name: </Form.Label>
                                <Form.Control type="text" placeholder="Sunset In The Park" onChange={e => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="imageGallery">
                                <Form.Label>Current Galleries</Form.Label>

                                <section>
                                    {galleries.map(g =>

                                        <Gallery key={g.id} gallery={g} />
                                    )}
                                </section>
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
import React, { useContext, useEffect, useState } from "react";
import { GalleryContext } from "../../providers/GalleryProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Gallery from "./Gallery";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";


export default function GalleryList() {
    const { getAllGalleriesByUser, galleries, addGallery, galleryUpdated } = useContext(GalleryContext);
    const { activeUser } = useContext(UserProfileContext);
    const [addName, setAddName] = useState();

    const [addIsOpen, setAddIsOpen] = useState(false);

    const showAddModal = (e) => {
        setAddIsOpen(true);
    };

    const hideModal = () => {
        setAddIsOpen(false);

    };

    const handleAddGallery = (e) => {
        e.preventDefault();
        const newGallery = {
            name: addName,
            userProfileId: activeUser.id
        }
        addGallery(newGallery)
        getAllGalleriesByUser(activeUser.id);

    };

    useEffect(() => {
        getAllGalleriesByUser(activeUser.id);
    }, []);
    return (
        <>
            <Container>
                <Col>
                    <Row>
                        <Button id="showModalAddButton" className="justify-content-center" varient="primary" onClick={showAddModal}>Add Gallery</Button>
                        <Modal id="addModal" show={addIsOpen} onHide={hideModal}>
                            <Modal.Header>
                                <Modal.Title>Add A New Gallery!</Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={handleAddGallery}>
                                <Form.Group controlId="galleryName">
                                    <Form.Label>Gallery Name: </Form.Label>
                                    <Form.Control type="text" onChange={e => setAddName(e.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Button type="submit" onClick={hideModal}>Submit</Button>
                                </Form.Group>
                            </Form>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>



                    <section>
                        {galleries ? galleries.map(g =>
                            < Gallery key={g.id} gallery={g} />
                        ) : null}
                    </section>
                </Col>
            </Container>
        </>
    );
}
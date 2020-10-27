import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { GalleryContext } from "../../providers/GalleryProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
import { Card, Button, Col, Row, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
export default function Gallery({ gallery }) {
    const { activeUser } = useContext(UserProfileContext);
    const { updateGallery, deleteGallery, getAllGalleriesByUser } = useContext(GalleryContext);
    const { getAllPhotosByGallery, photosByGallery } = useContext(PhotoContext);
    const [isOpen, setIsOpen] = React.useState(false);
    const [updatedName, setUpdatedName] = useState();

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        getAllGalleriesByUser(activeUser.id);
    };

    const handleUpdateGallery = (e) => {
        e.preventDefault();

        const newGallery = {
            id: gallery.id,
            name: updatedName,
            userProfileId: gallery.userProfileId
        }

        updateGallery(newGallery)
    };

    const handleDeleteGallery = (e) => {
        e.preventDefault();
        //return id from category context
        //return updated name from state of
        //updateCategory({ id: category.id, name: categoryText.name })
        deleteGallery(gallery);
    }

    useEffect(() => {
        getAllPhotosByGallery(gallery.id)
    }, []);

    return (
        <Col>
            <Card body>
                <Row>
                    <Col sm="9">
                        <strong>{gallery.name}</strong>
                    </Col>
                    {gallery.id != 1 ?
                        <Col>
                            <Button varient="primary" onClick={showModal}>Edit</Button>
                            <Modal show={isOpen} onHide={hideModal}>
                                <Modal.Header>
                                    <Modal.Title>{gallery.name}</Modal.Title>
                                </Modal.Header>
                                {/* <Modal.Body>asdfasdf</Modal.Body> */}
                                <Form onSubmit={handleUpdateGallery}>


                                    <Form.Group controlId="galleryName">
                                        <Form.Label>Gallery Name: </Form.Label>
                                        <Form.Control type="text" defaultValue={gallery.name} onChange={e => setUpdatedName(e.target.value)} />
                                    </Form.Group>


                                    <Form.Group>
                                        <Button type="submit" onClick={hideModal}>Submit</Button>
                                    </Form.Group>
                                </Form>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                        : null}
                    {/* {photosByGallery.length != 0 ? null :
                        <Col>
                            <Button varient="primary" onClick={showModal}>Delete</Button>
                            <Modal show={isOpen} onHide={hideModal}>
                                <Modal.Header>
                                    <Modal.Title>{gallery.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>asdfasdf</Modal.Body>
                                <Form onSubmit={handleDeleteGallery}>


                                    <Col sm="9">
                                        <strong>{gallery.name}</strong>
                                    </Col>

                                    <Form.Group>
                                        <Button type="submit" onClick={hideModal}>Submit</Button>
                                    </Form.Group>
                                </Form>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    } */}
                </Row>
            </Card >
        </Col >
    );
}
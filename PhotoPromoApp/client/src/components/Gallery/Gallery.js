import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { GalleryContext } from "../../providers/GalleryProvider";
import { Card, Button, Col, Row, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
export default function Gallery({ gallery }) {
    const { activeUser } = useContext(UserProfileContext);

    const { updateGallery, deleteGallery } = useContext(GalleryContext);

    const [updatedName, setUpdatedName] = useState();
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);

    const showDeleteModal = (e) => {
        setDeleteIsOpen(true);
    };

    const showUpdateModal = (e) => {
        setUpdateIsOpen(true);
    };

    const hideModal = () => {

        setUpdateIsOpen(false);

        setDeleteIsOpen(false);
    };

    const handleUpdateGallery = (e) => {
        e.preventDefault();

        const newGallery = {
            id: gallery.id,
            name: updatedName,
            userProfileId: gallery.userProfileId
        };

        updateGallery(newGallery);

        // getAllGalleriesByUser(activeUser.id);
    };

    const handleDeleteGallery = (e) => {
        e.preventDefault();

        deleteGallery(gallery);

        // getAllGalleriesByUser(activeUser.id);
    };

    return (
        <Col>
            <Card body>
                <Row>
                    <Col sm="9">
                        <Button variant="secondary" href={`/gallery/${gallery.id}`}><strong>{gallery.name}</strong></Button>
                    </Col>

                    {/* UPDATE GALLERY MODAL */}
                    {gallery.id !== 1 ?
                        <Col>
                            <Button id="showModalEditButton" varient="primary" onClick={showUpdateModal}>Edit</Button>
                            <Modal id="editModal" show={updateIsOpen} onHide={hideModal}>

                                <Modal.Header>
                                    <Modal.Title>{gallery.name}</Modal.Title>
                                </Modal.Header>
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

                    {/* DELETE GALLERY MODAL */}
                    {gallery.photoCount === 0 ?
                        <Col>
                            <Button id="showModalDeleteButton" varient="primary" onClick={showDeleteModal}>Delete</Button>
                            <Modal id="deleteModal" show={deleteIsOpen} onHide={hideModal}>
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
                        : <div></div>
                    }
                </Row>
            </Card >
        </Col >
    );
}
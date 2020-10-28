import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg, Modal, Form, Image } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
export default function Photo({ photo }) {
    const { activeUser } = useContext(UserProfileContext);
    const { getImageUrl, deleteImage } = useContext(ImageContext);
    const { deletePhoto, updatePhoto } = useContext(PhotoContext);

    const [photoToUpdate, setPhotoToUpdate] = useState(photo)
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);

    const imageUrl = getImageUrl(photo.photoLocation);

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
    function TryParseInt(str, defaultValue) {
        var retValue = defaultValue;
        if (str !== null) {
            if (str.length > 0) {
                if (!isNaN(str)) {
                    retValue = parseInt(str);
                }
            }
        }
        return retValue;
    }

    const handleFieldChange = (e) => {

        const stateToChange = { ...photoToUpdate };

        stateToChange[e.target.id] = e.target.value;

        setPhotoToUpdate(stateToChange);
    };
    const handleIntFieldChange = (e) => {

        const stateToChange = { ...photoToUpdate };

        stateToChange[e.target.id] = parseInt(e.target.value);

        setPhotoToUpdate(stateToChange);

    };

    const handleUpdate = (e) => {

        e.preventDefault();
        debugger
        updatePhoto(photoToUpdate);
    };


    const handleDelete = () => {
        debugger
        //deletePhoto(photo).then((resp) => { if (resp.ok) { return (deleteImage(photo)) } else { return console.log("broken") } });
        deleteImage(photo)
        // debugger
        deletePhoto(photo);
    }



    return (
        <Col xs={6} lg={3} >
            <Card body >
                <Row>
                    <Col>
                        <Row>
                            <strong>{photo.name}</strong>
                            {/* <Image src={photo.photoLocation}></Image> */}
                        </Row>

                        {photo.photoLocation === "" || photo.photoLocation === null ?
                            <Row>
                                <Image />
                            </Row>
                            :
                            <Row>
                                <Image src={imageUrl} alt={photo.name} fluid />
                            </Row>
                        }
                        {photo != null ?
                            <Row>
                                {/* UPDATE PHOTO MODAL */}
                                <>
                                    <Button id="showModalEditButton" varient="primary" onClick={showUpdateModal}>Edit</Button>
                                    <Modal id="editModal" show={updateIsOpen} onHide={hideModal}>
                                        <Modal.Header>
                                            <Modal.Title>{photo.name}</Modal.Title>
                                        </Modal.Header>
                                        {/* <Modal.Body>asdfasdf</Modal.Body> */}
                                        <Form onSubmit={handleUpdate}>
                                            <Form.Group controlId="name">
                                                <Form.Label>Name: </Form.Label>
                                                <Form.Control type="text" defaultValue={photo.name} onChange={handleFieldChange} />
                                            </Form.Group>
                                            <Form.Group controlId="attribute">
                                                <Form.Label>Attribute: </Form.Label>
                                                <Form.Control type="text" defaultValue={photo.attribute} onChange={handleFieldChange} />
                                            </Form.Group>
                                            <Form.Group controlId="galleryId">
                                                <Form.Label>GalleryId: </Form.Label>
                                                <Form.Control type="text" defaultValue={photo.galleryId} onChange={handleIntFieldChange} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Button type="submit" onClick={hideModal}>Submit</Button>
                                            </Form.Group>
                                        </Form>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>

                                {/* DELETE PHOTO MODAL */}
                                <>
                                    <Button id="showModalDeleteButton" varient="primary" onClick={showDeleteModal}>Delete</Button>
                                    <Modal id="deleteModal" show={deleteIsOpen} onHide={hideModal}>
                                        <Modal.Header>
                                            <Modal.Title>{photo.name}</Modal.Title>
                                        </Modal.Header>
                                        <Form>
                                            <Form.Group controlId="photoName">
                                                <Button onClick={handleDelete} >Confirm Delete</Button>
                                            </Form.Group>
                                        </Form>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            </ Row >
                            : null}
                    </Col>
                </Row>
            </Card >
        </Col >
    );
}
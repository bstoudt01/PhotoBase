import React, { useContext, useState, useEffect } from "react";
import { Card, Button, Col, Row, Modal, Form, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
import { GalleryContext } from "../../providers/GalleryProvider";
import AddPhotoGalleryOption from "./AddPhotoGalleryOption";

export default function Photo({ photo }) {

    const { galleries } = useContext(GalleryContext);
    const { getImageName } = useContext(ImageContext);
    const { deletePhoto, updatePhoto } = useContext(PhotoContext);

    const [photoToUpdate, setPhotoToUpdate] = useState(photo)
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [detailsIsOpen, setDetailsIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [checked, setChecked] = useState(photo.isPublic);
    const [imageState, setImageState] = useState();

    const handleClick = () => {

        setChecked(!checked)

        const stateToChange = { ...photoToUpdate };

        stateToChange["isPublic"] = !checked;

        setPhotoToUpdate(stateToChange);
    }

    const showDeleteModal = (e) => {
        setDeleteIsOpen(true);
    };

    const showUpdateModal = (e) => {
        setUpdateIsOpen(true);
    };

    const showDetailsModal = (e) => {
        setDetailsIsOpen(true);
    };

    const hideModal = () => {

        setUpdateIsOpen(false);

        setDeleteIsOpen(false);

        setDetailsIsOpen(false);
    };

    const thirdPartyLink = () => {

        var copyText = document.querySelector("#input");

        copyText.select();

        document.execCommand("copy");

        alert("Copied Link To Share: " + copyText.value);
    };

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
        if (photoToUpdate.name === "") {
            alert("Name Field Required")
        }
        setIsUpdating(!isUpdating);

        const stateToChange = { ...photoToUpdate };

        stateToChange[photo.Id] = parseInt(photo.id);

        setPhotoToUpdate(stateToChange);

        updatePhoto(photoToUpdate);

    };


    const handleDelete = (e) => {
        e.preventDefault();

        deletePhoto(photo);

    };
    const handleGetImage = () => {

        setImageState(getImageName(photo.photoLocation));
    }

    useEffect(() => {
        handleGetImage()
    }, [])


    return (
        <  Col xs={6} lg={4} >
            <Card body >
                <Row >
                    <Col >
                        {/* Photo / Image and Tooltip to highlight properties */}
                        {photo.photoLocation === "" || photo.photoLocation === null ?
                            <Row>
                                <div />
                            </Row>
                            :
                            <Row >
                                <OverlayTrigger
                                    id="photoDetails"
                                    overlay={
                                        <Tooltip id={`tooltip-${photo.id}`}>
                                            Name: <strong>{photo.name}</strong> <br />
                                            Attribute: <strong>{photo.attribute}</strong> < br />
                                            Is Public: <strong>{photo.isPublic ? "YES" : "NO"}</strong>
                                        </Tooltip>
                                    }
                                >
                                    <Image src={imageState} alt={photo.name} fluid />
                                </OverlayTrigger>
                            </Row>
                        }

                        {photo != null ?
                            <Row>
                                {/* UPDATE IMAGE/FILE MODAL */}
                                <>
                                    <Button id="showModalEditButton" varient="primary" onClick={showUpdateModal}>Edit</Button>
                                    <Modal id="editModal" centered show={updateIsOpen} onHide={hideModal}>
                                        <Modal.Header className="modal-content-sm"  >
                                            <Modal.Title>{photo.name}</Modal.Title>
                                        </Modal.Header>
                                        <Form onSubmit={handleUpdate}>
                                            <Form.Group controlId="name">
                                                <Form.Label>Name: </Form.Label>
                                                <Form.Control required type="text" defaultValue={photo.name} onChange={handleFieldChange} />
                                            </Form.Group>
                                            <Form.Group controlId="attribute">
                                                <Form.Label>Attribute: </Form.Label>
                                                <Form.Control type="text" defaultValue={photo.attribute} onChange={handleFieldChange} />
                                            </Form.Group>
                                            <Form.Check type="checkbox" id="isPublic">
                                                <Form.Check.Input id="isPublic" type="checkbox" defaultChecked={photo.isPublic} isValid onClick={handleClick} />
                                                <Form.Check.Label>{`Make this Public?`}</Form.Check.Label>
                                                <Form.Control.Feedback>Thanks for Sharing</Form.Control.Feedback>
                                            </Form.Check>

                                            {galleries !== undefined ?
                                                <Form.Group controlId="galleryId">
                                                    <Form.Label>Gallery Name</Form.Label>
                                                    <Form.Control as="select" onChange={handleIntFieldChange}>
                                                        <option id={photo.gallery.id} value={photo.gallery.id} >{photo.gallery.name}</option>
                                                        {
                                                            galleries.map(g =>
                                                                <AddPhotoGalleryOption key={g.id} id={g.id} gallery={g} />

                                                            )
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                : null}
                                            <Form.Group>
                                                <Button type="submit" onClick={hideModal}>Submit</Button>
                                            </Form.Group>
                                        </Form>
                                        <Modal.Footer className="modal-full-sm">
                                            <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>

                                {/* DELETE IMAGE/FILE MODAL */}
                                <>
                                    <Button id="showModalDeleteButton" varient="primary" onClick={showDeleteModal}>Delete</Button>
                                    <Modal id="deleteModal" show={deleteIsOpen} onHide={hideModal}>
                                        <Modal.Header>
                                            <Modal.Title>{photo.name}</Modal.Title>
                                        </Modal.Header>
                                        <Form onSubmit={handleDelete}>
                                            <Form.Group controlId="photoName">
                                                <Button type="submit" onClick={hideModal} >Confirm Delete</Button>
                                            </Form.Group>
                                        </Form>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>

                                {/* DETAILS VIEW IMAGE/FILE MODAL */}
                                <Button id="showModalEditButton" varient="primary" onClick={showDetailsModal}>Details</Button>
                                <Modal aria-labelledby="contained-modal-title-vcenter" centered size="lg"
                                    id="editModal" show={detailsIsOpen} onHide={hideModal}>
                                    <Modal.Header className="modal-content">
                                        <Modal.Title>{photo.name}</Modal.Title>
                                        <Modal.Body>
                                            <strong>Attribute: {photo.attribute}</strong> <br />
                                            <strong>Gallery: {photo.gallery.name}</strong> < br />
                                            <strong>Is Public: {photo.isPublic ? "YES" : "NO"}</strong>
                                        </Modal.Body>
                                        <input id="input" valuetype="text" defaultValue={`http://localhost:3000/image/${photo.id}/600/${photo.userProfileId}`} />
                                        <Button id="copy" onClick={thirdPartyLink}>Share</Button>
                                        <Image src={imageState} alt={photo.name} fluid />
                                    </Modal.Header>
                                    <Modal.Footer className="modal-full">
                                        <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                                    </Modal.Footer>
                                </Modal>
                            </ Row >
                            : null}
                    </Col>
                </Row>
            </Card >
        </Col >
    );
}
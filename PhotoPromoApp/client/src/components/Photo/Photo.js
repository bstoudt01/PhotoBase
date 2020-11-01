import React, { useContext, useState, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, Modal, Form, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
import { GalleryContext } from "../../providers/GalleryProvider";
import AddPhotoGalleryOption from "./AddPhotoGalleryOption";
import PhotoListByGallery from "./PhotoListByGallery";

export default function Photo({ photo }) {

    const { getAllGalleriesByUser, galleries } = useContext(GalleryContext);
    const { activeUser } = useContext(UserProfileContext);
    const { getImageName, deleteImage } = useContext(ImageContext);
    const { deletePhoto, updatePhoto, getAllPhotosByGallery } = useContext(PhotoContext);
    const [photoToUpdate, setPhotoToUpdate] = useState(photo)
    //const imageName = getImageName(photo.photoLocation);
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [detailsIsOpen, setDetailsIsOpen] = useState(false);

    const [checked, setChecked] = useState(photo.isPublic);
    const [isDeleted, setIsDeleted] = useState(false);

    const [imageName, setImageName] = useState();

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

        const stateToChange = { ...photoToUpdate };
        stateToChange[photo.Id] = parseInt(photo.id);
        setPhotoToUpdate(stateToChange);
        updatePhoto(photoToUpdate);
        getAllPhotosByGallery(photo.galleryId);


    };


    const handleDelete = () => {
        deletePhoto(photo);
        setIsDeleted(true);
        //deletePhoto(photo).then((resp) => { if (resp.ok) { return (deleteImage(photo)) } else { return console.log("broken") } });
        // deleteImage(photo);
        //getAllPhotosByGallery(photo.galleryId);

    }
    const imageHandler = () => {

        if (isDeleted == false) {
            const updatedImageName = getImageName(photo.photoLocation);
            setImageName(updatedImageName)
        }
    };

    // const imageName = getImageName(photo.photoLocation);
    useEffect(() => {
        imageHandler();


        getAllGalleriesByUser(activeUser.id);
    }, []);


    return (
        <Col xs={6} lg={3} >
            <Card body >
                <Row>
                    <Col>
                        {photo.photoLocation === "" || photo.photoLocation === null ?
                            <Row>
                                <div />
                            </Row>
                            :
                            <Row>
                                <OverlayTrigger
                                    id="photoDetails"
                                    // key={placement}
                                    // placement={placement}
                                    overlay={
                                        <Tooltip id={`tooltip-${photo.id}`}>
                                            Name: <strong>{photo.name}</strong> <br />
                                            Attribute: <strong>{photo.attribute}</strong> < br />
                                            Is Public: <strong>{photo.isPublic ? "YES" : "NO"}</strong>
                                        </Tooltip>
                                    }
                                >
                                    <Image src={imageName} alt={photo.name} fluid />
                                </OverlayTrigger>
                            </Row>
                        }
                        {photo != null ?
                            <Row>
                                {/* UPDATE IMAGE/FILE MODAL */}
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
                                            <Form.Check type="checkbox" id="isPublic">
                                                <Form.Check.Input id="isPublic" type="checkbox" defaultChecked={photo.isPublic} isValid onClick={handleClick} />
                                                <Form.Check.Label>{`Make this Public?`}</Form.Check.Label>
                                                <Form.Control.Feedback>Thanks for Sharing</Form.Control.Feedback>
                                            </Form.Check>

                                            {galleries != undefined ?
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
                                        <Modal.Footer>
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

                                {/* VIEW IMAGE/FILE DETAILS MODAL */}
                                <Button id="showModalEditButton" varient="primary" onClick={showDetailsModal}>Details</Button>
                                <Modal id="editModal" contentClassName=" modal-full" show={detailsIsOpen} onHide={hideModal}>
                                    <Modal.Header className="modal-content">
                                        <Modal.Title>{photo.name}</Modal.Title>
                                        <Modal.Body><strong>Attribute: {photo.attribute}</strong> <br />
                                            <strong>Gallery: {photo.gallery.name}</strong> < br />
                                            <strong>Is Public: {photo.isPublic ? "YES" : "NO"}</strong></Modal.Body>
                                        {/* <Modal.Body></Modal.Body>
                                        <Modal.Body></Modal.Body> */}
                                        <input id="input" valuetype="text" defaultValue={`http://localhost:3000/image/${photo.id}/200/300/${photo.userProfileId}`} />
                                        <Button id="copy" onClick={thirdPartyLink}>Share</Button>

                                        <Image src={imageName} alt={photo.name} fluid />

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
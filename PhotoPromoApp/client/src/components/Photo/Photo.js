import React, { useContext, useState, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg, Modal, Form, Image } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
import { GalleryContext } from "../../providers/GalleryProvider";
import AddPhotoGalleryOption from "./AddPhotoGalleryOption";
export default function Photo({ photo }) {

    const { getAllGalleriesByUser, galleries } = useContext(GalleryContext);
    const { activeUser } = useContext(UserProfileContext);
    const { getImageName, deleteImage } = useContext(ImageContext);
    const { deletePhoto, updatePhoto } = useContext(PhotoContext);
    const [photoToUpdate, setPhotoToUpdate] = useState(photo)
    const imageName = getImageName(photo.photoLocation);
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [userGalleries, setUserGalleries] = useState();
    const [checked, setChecked] = useState(photo.isPublic);
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

    const hideModal = () => {
        setUpdateIsOpen(false);
        setDeleteIsOpen(false);
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
        debugger
        const stateToChange = { ...photoToUpdate };

        stateToChange[photo.Id] = parseInt(photo.id);

        setPhotoToUpdate(stateToChange);

        updatePhoto(photoToUpdate);
    };


    const handleDelete = () => {
        debugger
        //deletePhoto(photo).then((resp) => { if (resp.ok) { return (deleteImage(photo)) } else { return console.log("broken") } });
        deleteImage(photo)
        // debugger
        deletePhoto(photo);
    }
    useEffect(() => {
        getAllGalleriesByUser(activeUser.id);
        setUserGalleries(galleries)
    }, []);


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
                                <Image src={imageName} alt={photo.name} fluid />
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
                            </ Row >
                            : null}
                    </Col>
                </Row>
            </Card >
        </Col >
    );
}
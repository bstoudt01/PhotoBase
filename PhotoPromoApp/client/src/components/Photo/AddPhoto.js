import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { GalleryContext } from "../../providers/GalleryProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
import { Card, Button, Col, Row, Image, Form } from "react-bootstrap";
import GalleryOption from "../Gallery/GalleryOption";
export default function AddPhoto() {
    const { activeUser } = useContext(UserProfileContext);
    const { getAllGalleriesByUser, galleries } = useContext(GalleryContext);
    const { addPhoto, setPhotoFormData } = useContext(PhotoContext);
    const [imageName, setImageName] = useState();
    const [imageGalleryId, setImageGalleryId] = useState();
    const [imageFile, setImageFile] = useState();
    const [imageAttribute, setImageAttribute] = useState();
    const [imageToSubmit, setImageToSubmit] = useState([]);
    const [checked, setChecked] = useState(false);
    const handleClick = () => setChecked(!checked)
    const handleAddPhoto = () => {
        // const newImage = {
        //     name: imageName,
        //     galleryId: imageGalleryId,
        //     imageLocation: imageFile,
        //     isPublic: checked,
        //     attribute: imageAttribute,
        //     userProfileId: activeUser.id
        // }
        // debugger
        // addPhoto(newImage);
        //setImageToSubmit(newImage)


        // const formData = new FormData();
        // formData.append("Name", imageName);
        // formData.append("GalleryId", imageGalleryId);
        // formData.append("PhotoLocation", imageFile);
        // formData.append("IsPublic", checked);
        // formData.append("Attribute", imageAttribute);
        // formData.append("UserProfileId", activeUser.id);
        // debugger
        // addPhoto(formData);

        debugger
        const formData = new FormData();
        formData.append("Name", imageName);
        formData.append("GalleryId", imageGalleryId);
        formData.append("PhotoLocation", imageFile, imageFile.name);
        formData.append("IsPublic", checked);
        formData.append("Attribute", imageAttribute);
        formData.append("UserProfileId", activeUser.id);
        // setPhotoFormData(formData);
        addPhoto(formData);

        // addPhoto(formData);
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

                            <Form.Group>
                                <Form.File id="imageFile" label="Add Image" onChange={(e) => setImageFile(e.target.files[0])} />
                            </Form.Group>
                            <Form.Group controlId="imageName">
                                <Form.Label>Name: </Form.Label>
                                <Form.Control type="text" placeholder="Sunset In The Park" onChange={e => setImageName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="imageName">
                                <Form.Label>Attribute: </Form.Label>
                                <Form.Control type="text" placeholder="Taken by Allie Stoudt" onChange={e => setImageAttribute(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="imageGallery">
                                <Form.Label>Gallery Name</Form.Label>
                                <Form.Control as="select" onChange={e => setImageGalleryId(e.target.value)}>
                                    <option>Select Gallery</option>
                                    {
                                        galleries.map(g =>
                                            <GalleryOption key={g.id} gallery={g} />

                                        )
                                    }
                                </Form.Control>
                            </Form.Group>


                            <div className="mb-3">
                                <Form.Check type="checkbox" id="public">
                                    <Form.Check.Input type="checkbox" isValid onClick={handleClick} />
                                    <Form.Check.Label>{`Make this Public?`}</Form.Check.Label>
                                    <Form.Control.Feedback>Thanks for Sharing</Form.Control.Feedback>
                                </Form.Check>
                            </div>

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
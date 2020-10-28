import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { GalleryContext } from "../../providers/GalleryProvider";
import { PhotoContext } from "../../providers/PhotoProvider";
import { Card, Button, Col, Row, Image, Form } from "react-bootstrap";
import GalleryOption from "./AddPhotoGalleryOption";
import { ImageContext } from "../../providers/ImageProvider";
export default function AddPhoto() {
    const { activeUser } = useContext(UserProfileContext);
    const { getAllGalleriesByUser, galleries } = useContext(GalleryContext);
    const { addPhoto, setPhotoFormData } = useContext(PhotoContext);
    const { addImage } = useContext(ImageContext);
    const [imageName, setImageName] = useState();
    const [imageGalleryId, setImageGalleryId] = useState();
    const [imageFile, setImageFile] = useState();
    const [imageAttribute, setImageAttribute] = useState();
    const [photoToSubmit, setphotoToSubmit] = useState("");
    const [checked, setChecked] = useState(false);
    const handleClick = () => setChecked(!checked)


    const handleAddPhoto = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append("Name", imageName);
        // formData.append("GalleryId", imageGalleryId);
        // formData.append("PhotoLocation", imageFile);
        // formData.append("IsPublic", checked);
        // formData.append("Attribute", imageAttribute);
        // formData.append("UserProfileId", activeUser.id);
        // debugger
        // addPhoto(formData);
        const file = document.querySelector('input[type="file"]').files[0];

        const fileType = file.name.split('.').pop();
        const newImageName = `${new Date().getTime()}.${fileType}`
        const formData = new FormData();

        formData.append('file', file, newImageName);

        //setPhotoFormData(formData);
        const newPhoto = {
            Name: imageName,
            PhotoLocation: newImageName,
            IsPublic: checked,
            Attribute: imageAttribute,

            GalleryId: parseInt(imageGalleryId),
            UserProfileId: activeUser.id
        }
        addImage(formData);

        addPhoto(newPhoto);
        //addImage(formData).then((resp) => { if (resp.ok) { return (addPhoto(newImage)) } else { return console.log("broken") } });
        //addImage(formData).then((resp) => { if (resp.ok) { return resp.json().then(addPhoto(newImage)) } });


    };
    useEffect(() => {
        getAllGalleriesByUser(activeUser.id);

    }, []);


    return (
        <Col>
            <Card body>
                <Row>
                    <Col>
                        {/* <Form onSubmit={handleAddPhoto} type="multipart/form-data"> */}
                        <Form onSubmit={handleAddPhoto} >
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
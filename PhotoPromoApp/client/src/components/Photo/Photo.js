import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg, Modal, Form } from "react-bootstrap";
import { ImageContext } from "../../providers/ImageProvider";

export default function Photo({ photo }) {
    const { activeUser } = useContext(UserProfileContext);

    const { getImageUrl, deleteImage } = useContext(ImageContext);
    const imageUrl = getImageUrl(photo.photoLocation);

    const [isOpen, setIsOpen] = React.useState(false);
    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };


    return (
        <Col>
            <Card body>
                <Row>
                    <Col>
                        <strong>{photo.name}</strong>
                        {/* <Image src={photo.photoLocation}></Image> */}

                    </Col>
                    {photo.photoLocation === "" || photo.photoLocation === null ?
                        <CardImg />
                        :
                        <CardImg src={imageUrl} alt={photo.title} />
                    }
                    {photo != null ?
                        <Col>
                            <Button varient="primary" onClick={showModal}>Edit</Button>
                            <Modal show={isOpen} onHide={hideModal}>
                                <Modal.Header>
                                    <Modal.Title>{photo.name}</Modal.Title>
                                </Modal.Header>
                                {/* <Modal.Body>asdfasdf</Modal.Body> */}
                                <Form>


                                    <Form.Group controlId="galleryName">
                                        <Form.Label> Name: </Form.Label>
                                        <Form.Control type="text" defaultValue={photo.name} onClick={e => deleteImage(photo.photoLocation)} />
                                    </Form.Group>



                                </Form>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                        : null}
                </Row>
            </Card >
        </Col >
    );
}
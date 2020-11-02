import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../../providers/PhotoProvider";
import Photo from "./Photo";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function PhotoListByGallery() {
    const { getAllPhotosByGallery, photosByGallery, photoUpdated } = useContext(PhotoContext);

    const { id } = useParams();

    useEffect(() => {

        getAllPhotosByGallery(id);
    }, [photoUpdated]);


    return (
        <Container>
            <Col>

                <Row className="justify-content-center">
                    <Button type="button" href={`/image/add`}>Add Image</Button>
                </Row>
                <ListGroup>
                    <Row xs={6} lg={4}>

                        {photosByGallery !== null || photosByGallery !== undefined ? photosByGallery.map(p =>
                            <Photo key={p.id} photo={p} />
                        ) : <section>EMPTY</section>}

                    </Row>
                </ListGroup>
            </Col>
        </Container >
    );
}
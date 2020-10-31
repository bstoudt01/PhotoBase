import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../../providers/PhotoProvider";
import Photo from "./Photo";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function PhotoListByGallery() {
    const { getAllPhotosByGallery, photosByGallery } = useContext(PhotoContext);
    const { id } = useParams();


    useEffect(() => {

        getAllPhotosByGallery(id);
    }, []);

    return (
        <Container>
            <Col >

                <Row className="justify-content-center">
                    <Button type="button" href={`/image/add`}>Add Image</Button>
                </Row>
                <section >
                    {photosByGallery != null ? photosByGallery.map(p =>
                        <Photo key={p.id} photo={p} />
                    ) : <section>EMPTY</section>}
                </section>
            </Col>
        </Container>
    );
}
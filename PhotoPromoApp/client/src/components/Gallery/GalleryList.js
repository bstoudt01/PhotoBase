import React, { useContext, useEffect, useState } from "react";
import { GalleryContext } from "../../providers/GalleryProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Gallery from "./Gallery";
import { Button, Col, Container, Row } from "react-bootstrap";


export default function GalleryList() {
    const { getAllGalleriesByUser, galleries } = useContext(GalleryContext);
    const { activeUser } = useContext(UserProfileContext);

    useEffect(() => {
        getAllGalleriesByUser(activeUser.id);
    }, []);
    return (
        <Container>
            <Col>

                <Row className="justify-content-center">
                    <Button type="button" href={`/gallery/add`}>Add Gallery</Button>
                </Row>
                <section>
                    {galleries.map(g =>
                        < Gallery key={g.id} gallery={g} />
                    )}
                </section>
            </Col>
        </Container>
    );
}
import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row } from "react-bootstrap";

export default function GalleryOption({ gallery }) {
    const { activeUser } = useContext(UserProfileContext);

    return (
        <>
            <option id={gallery.id} value={gallery.id}>{gallery.name}</option>
        </>
    );
}
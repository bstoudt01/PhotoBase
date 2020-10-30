import React from "react";

export default function AddPhotoGalleryOption({ gallery }) {
    return (
        <>
            <option id={gallery.id} value={gallery.id}>{gallery.name}</option>
        </>
    );
}
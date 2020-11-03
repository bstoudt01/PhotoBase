import React from "react";
import { Button, Col } from 'react-bootstrap';


export default function home() {

    const randomPhotoLink = () => {

        var copyText = document.querySelector("#input");

        copyText.select();

        document.execCommand("copy");

        alert("Copied Link For Random Photos: " + copyText.value);
    };

    return (

        <Col>
            <h1>welcome home</h1>

            <Button href="/login">Login</Button>

            <Button href="/register">Register</Button>

            <h3>Looking for Free Use Photos?</h3>
            <h4>Thank to our generous photographers, you can embed their photography into your website</h4>
            <input id="input" valuetype="text" defaultValue={`http://localhost:3000/image/random/600/`} />
            <Button id="copy" onClick={randomPhotoLink}>Random Photo Link</Button>
        </Col>
    );
}
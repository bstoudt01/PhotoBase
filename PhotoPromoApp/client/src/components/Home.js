import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row, Image, Container } from 'react-bootstrap';
import { ImageContext } from "../providers/ImageProvider";
import "../App.css";


export default function Home() {

    const { getRandomPublicImage } = useContext(ImageContext);
    const [spotlightImage, setSpotlightImage] = useState(0);
    const [changeSpotlight, setChangeSpotlight] = useState(0);
    const refreshRandomImage = () => {

        setChangeSpotlight(changeSpotlight + 1)
    };


    const randomPhotoLink = () => {

        var copyText = document.querySelector("#input");

        copyText.select();

        document.execCommand("copy");

        alert("Copied Link For Random Photos: " + copyText.value);
    };


    const handleRandomImage = () => {
        const imageParams = { width: "500" };

        setSpotlightImage({ image: getRandomPublicImage(imageParams), time: Date.now() });
    };


    useEffect(() => {

        handleRandomImage()
    }, [changeSpotlight]);

    return (
        <>
            <Container>
                <Row>
                    <h1><strong>Welcome To PhotoBase</strong> </h1>
                </Row>
                <Row>
                    <h1 className="marginBottom"> A Place Where Photos Go To Live!</h1>
                </Row>

                <Row>
                    <Col>
                        <div>
                            <Button onClick={refreshRandomImage}>Reload &#x27f3;</Button>
                        </div>
                        {spotlightImage.image &&
                            <Image style={{ width: "auto" }} className="homePageRandomImage marginTop"
                                src={`${spotlightImage.image}?${spotlightImage.time}`} alt="singleImage" fluid />
                        }
                    </Col>
                    <Col >
                        <Row>
                            <h3>Looking for Free Use Photos?</h3>
                        </Row>
                        <Col >
                            <Row>
                                <Button id="copy" className="marginBottom" onClick={randomPhotoLink}>Click Here</Button>
                            </Row>
                            <Row>
                                <input xs="7" id="input" valuetype="text" size="40"
                                    defaultValue={`http://localhost:3000/image/random/500/`} />
                            </Row>
                        </Col>
                        <Row className="marginTop">
                            <h4>Thanks to our generous photographers, < br /> you can embed their photography into your website.</h4>
                        </Row>
                        <Row>
                            <h5>Easy to Use <br /> 1. Click the Button for "Random Photo Link"
                            <br />2. Paste the link where desired..</h5>
                            <h5 className="marginTop"> <br /> <strong>...Looking for a specific image Size?</strong>
                                <br /> add your desired image size (width) at the end of our URL,
                                and you'll get a random image with that width. </h5>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </>
    );
}
import React, { useState, useContext } from "react";
import { Button, Form, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState(" ");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [imageName, setImageName] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, displayName, imageLocation, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
  };
  const checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {

      setImageLocation(resultEvent.info.secure_url)
      setImageName(resultEvent.info.original_filename + `.${resultEvent.info.format}`)

    }
  }



  const showWidget = (event) => {
    let widget = window.cloudinary.createUploadWidget({
      cloudName: "dgllrw1m3",
      uploadPreset: "kxr8ogeo"
    },
      (error, result) => { checkUploadResult(result) })

    widget.open()
  }

  return (
    <Col sm="12" md={{ size: 6, offset: 3 }}>

      <Form onSubmit={registerClick}>
        <fieldset>
          <Form.Group>
            <Form.Label htmlFor="firstName">First Name</Form.Label>
            <Form.Control id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="lastName">Last Name</Form.Label>
            <Form.Control id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="displayName">Display Name</Form.Label>
            <Form.Control id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <div>
              <Button onClick={showWidget}>Upload Photo</Button> <p>{imageName}</p>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
            <Form.Control id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Button>Register</Button>
          </Form.Group>
        </fieldset>
      </Form>
    </Col>
  );
}

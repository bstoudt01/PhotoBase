import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [company, setCompany] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [facebookUserId, setFacebookUserId] = useState();
  const [validated, setValidated] = useState(false);


  const registerClick = (e) => {
    debugger
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else if (password && password !== confirmPassword) {

      alert("Passwords don't match. Do better.");

    }
    else {
      setValidated(true);
      debugger
      if (company === "") {
        setCompany("NA");
      }
      if (facebookUserId === "") {
        setFacebookUserId("NA")
      }

      const userProfile = { firstName, lastName, displayName, company, email, facebookUserId };

      register(userProfile, password)

        .then(() => history.push("/"));
    }
  };




  return (
    <Col xs="3">
      <Form noValidate validated={validated} onSubmit={registerClick}>
        <fieldset>
          <Form.Group>
            <Form.Label htmlFor="firstName">First Name</Form.Label>
            <Form.Control required id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="lastName">Last Name</Form.Label>
            <Form.Control required id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="displayName">Display Name</Form.Label>
            <Form.Control required id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="companyName">Company Name</Form.Label>
            <Form.Control id="companyName" type="text" onChange={e => setCompany(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="facebookUserId">Facebook Business Account Info</Form.Label>
            <Form.Control id="facebookUserId" type="text" onChange={e => setFacebookUserId(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control required id="email" type="email" onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control required id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
            <Form.Control required id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Register</Button>
          </Form.Group>
        </fieldset>
      </Form>
    </Col>
  );
}

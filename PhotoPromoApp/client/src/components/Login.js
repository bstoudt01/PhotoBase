import React, { useState, useContext } from "react";
import { Button, Form, Col } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (

    <Col xs="3" className="align-self-center mr-3">
      <Form onSubmit={loginSubmit}>
        <fieldset>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Login</Button>
          </Form.Group>
          <em>
            Not registered? <Link to="register">Register</Link>
          </em>
        </fieldset>
      </Form>
    </Col>
  );
}
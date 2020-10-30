import React, { useState, useContext } from "react";
import { Button, Form, Col } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function home() {



    return (

        <Col>
            <h1>welcome home</h1>

            <Button href="/login">Login</Button>

            <Button href="/register">Register</Button>
        </Col>
    );
}
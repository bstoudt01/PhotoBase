import React, { useState, createContext, useContext } from "react";

import { useHistory } from "react-router-dom";

import Header from "./Header";

export const WindowViewContex = createContext();

export function WindowViewHandler(props) {


    const [showNavbar, setShowNavbar] = useState(true);


    const handleNavBar = ({ showNavbar }) => {

        if (showNavbar) {
            return (<Header />);
        }
        return (<div></div>);
    }


    return (
        <WindowViewContex.Provider value={{ setShowNavbar, showNavbar, handleNavBar }}>
            {props.children}
        </WindowViewContex.Provider>
    )
}
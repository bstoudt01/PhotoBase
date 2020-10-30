import React, { useState, createContext, useContext } from "react";

import { useHistory } from "react-router-dom";

import Header from "./Header";
import ApplicationViews from "./ApplicationViews";
export const WindowViewContext = createContext();

export function WindowViewHandler(props) {

    const [showNavbar, setShowNavbar] = useState(true);

    return (
        <WindowViewContext.Provider value={{ setShowNavbar, showNavbar }}>
            {props.children}
        </WindowViewContext.Provider>
    )
}
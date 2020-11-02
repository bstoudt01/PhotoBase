import React, { useState, createContext } from "react";

export const WindowViewContext = createContext();

export function WindowViewHandler(props) {

    const [showNavbar, setShowNavbar] = useState(true);

    return (
        <WindowViewContext.Provider value={{ setShowNavbar, showNavbar }}>
            {props.children}
        </WindowViewContext.Provider>
    )
}
import React, { useState, createContext, useContext } from "react";

import { useHistory } from "react-router-dom";

import Header from "./Header";
import ApplicationViews from "./ApplicationViews";
import { WindowViewContext } from "./WindowViewHandler";
export function TopLevelView(props) {

    const { showNavbar } = useContext(WindowViewContext);

    return (
        <>
            {showNavbar &&
                <Header />
            }
            <ApplicationViews />
        </>);




}
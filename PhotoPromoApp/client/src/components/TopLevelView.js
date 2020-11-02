import React, { useContext } from "react";
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
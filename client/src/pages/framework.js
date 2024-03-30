import React from "react";

import Navbar from "../components/navbar";
import SidebarComp from "../components/sidebar";

// This page component includes the navbar and sidebar components.
// Takes in the main page component as a paramater.
const PageFramework = ({ component }) => {
    return (
        <div className="app-container">
            <div className="content-container">
                <SidebarComp className="sidebar" style={{width: 50 + "px"}}/>
                <div className="main-content">
                    {component}
                </div>
            </div>
        </div>
    );
};

export default PageFramework;
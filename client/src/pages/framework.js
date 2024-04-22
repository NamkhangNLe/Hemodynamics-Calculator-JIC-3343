import React from "react";
import SidebarComp from "../components/sidebar";
import '../styles/styles.css';

// This page component includes the sidebar component and the main page.
// Takes in the main page component as a paramater.
const PageFramework = ({ component }) => {
    return (
        <div className="app-container">
            <div className="content-container">
                <SidebarComp className="sidebar" style={{ width: 50 + "px" }} />
                <div className="main-content">
                    {component}
                </div>
            </div>
        </div>
    );
};

export default PageFramework;
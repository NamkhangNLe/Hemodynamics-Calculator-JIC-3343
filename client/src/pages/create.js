import React from "react";

import Navbar from "../components/navbar";
import Create from "../components/create";
import SidebarComp from "../components/sidebar";


const CreatePage = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
            <SidebarComp />
            <div className="main-content">
            <Create/>
            </div>
            </div>
        </div>
    );
};

export default CreatePage;
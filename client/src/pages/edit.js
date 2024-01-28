import React from "react";

import Navbar from "../components/navbar";
import Edit from "../components/edit";
import SidebarComp from "../components/sidebar";


const EditPage = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
            <SidebarComp />
            <div className="main-content">
            <Edit/>
            </div>
            </div>
        </div>
    );
};

export default EditPage;
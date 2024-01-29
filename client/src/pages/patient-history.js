import React from "react";

import Navbar from "../components/navbar";
import RecordList from "../components/recordList";
import SidebarComp from "../components/sidebar";

 
const Patients = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
            <SidebarComp className="sidebar"/>
            <div className="main-content">
            <RecordList/>
            </div>
            </div>
        </div>
    );
};
 
export default Patients;
import React from "react";

import Navbar from "../components/navbar";
import SidebarComp from "../components/sidebar";
import Addition from "../components/addition";

 
const Calculator = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
            <SidebarComp />
            <div className="main-content">
            <Addition />
            </div>
            </div>
        </div>
    );
};
 
export default Calculator;
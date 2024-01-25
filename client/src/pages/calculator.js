import React from "react";

import Navbar from "../components/navbar";
import SidebarComp from "../components/sidebar";
 
const Calculator = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
            <SidebarComp />
            <div className="main-content">
                <h1>Calculator Goes Here</h1>
            </div>
            </div>
        </div>
    );
};
 
export default Calculator;
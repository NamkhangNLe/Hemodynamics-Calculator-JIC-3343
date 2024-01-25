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
                <h2>Calculate</h2>
            <form>
                <label>
                    Value1:
                    <input type="text" name="value1" />
                </label>
                <label>
                    Value2:
                    <input type="text" name="value2" />
                </label>
                <label>
                    Output:
                    <input type="text" name="output" />
                </label>
            </form>
            </div>
            </div>
        </div>
    );
};
 
export default Calculator;
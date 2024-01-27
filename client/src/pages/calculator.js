import React, { useState } from "react";
import Navbar from "../components/navbar";
import SidebarComp from "../components/sidebar";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Addition from "../components/addition";

const Calculator = () => {
    const [selectedPatient, setSelectedPatient] = useState("Select Patient");

    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
            <SidebarComp />
            <div className="main-content">
                <h2>Calculate</h2>
            <form>
                <label>
                        Select Patient:
                        <DropdownButton id="dropdown-basic-button" title={selectedPatient}> {/* Update this line */}
                            <Dropdown.Item onClick={() => setSelectedPatient('Patient 1')}>Patient 1</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedPatient('Patient 2')}>Patient 2</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedPatient('Patient 3')}>Patient 3</Dropdown.Item>
                        </DropdownButton>
                </label>
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

            <Addition />

            </div>
            </div>
        </div>
    );
};
 
export default Calculator;
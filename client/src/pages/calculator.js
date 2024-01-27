import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import SidebarComp from "../components/sidebar";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Addition from "../components/addition";

const Calculator = () => {
    const [selectedPatient, setSelectedPatient] = useState("Select Patient");

    const [records, setRecords] = useState([]);
    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }

        getRecords();
    }, [records.length]);

    // DropdownOption object; updates selected patient using initials when clicked
    const DropdownOption = (props) => (
        <Dropdown.Item onClick={() => setSelectedPatient(props.record.initials)}>{props.record.initials}</Dropdown.Item>
    )

    function patientList() {
        return records.map((record) => {
                return <DropdownOption record = {record}/>
            }
        );
    }

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
                        <DropdownButton id="dropdown-basic-button" title={selectedPatient}>{patientList()}</DropdownButton>
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
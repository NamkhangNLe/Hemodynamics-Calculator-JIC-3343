import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Addition from "../components/addition";
import "../styles/styles.css"


const CalculatorFramework = () => {
    // TODO: Populate this list with the calculations
    const availableCalculations = [
        {name: "Addition", component: <Addition/>,},
    ];

    const [selectedPatient, setSelectedPatient] = useState("Select Patient");
    const [selectedPatientID, setSelectedPatientID] = useState();
    const [selectedCalculation, setSelectedCalculation] = useState(availableCalculations[0]);

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
    const PatientDropdownOption = (props) => (
        <Dropdown.Item onClick={() => {
            setSelectedPatient(props.record.initials)
            setSelectedPatientID(props.record._id)
        }}>{props.record.initials}</Dropdown.Item>
    )

    function patientList() {
        return records.map((record) => {
                return <PatientDropdownOption record = {record}/>
            }
        );
    }

    // DropdownOption object; updates selected patient using initials when clicked
    const CalculationDropdownOption = (props) => (
        <Dropdown.Item onClick={() => {
            setSelectedCalculation({
                name: props.calculation.name,
                calculation: props.calculation.calculation,
            })
        }}>{props.calculation.name}</Dropdown.Item>
    )

    function calculationList() {
        return availableCalculations.map((calculation) => {
                return <CalculationDropdownOption calculation = {calculation}/>
            }
        );
    }

    return (
        <div className="app-container">


            <div className="content-container">

            <div className="main-content">
                <h3>Calculate</h3>
                <div id="calc-framework-top-bar">

                    <form>
                        <label>
                            Select Patient:
                            <DropdownButton id="dropdown-basic-button" title={selectedPatient}>{patientList()}</DropdownButton>
                        </label>
                    </form>

                    <form>
                        <label>
                            Select Calculation:
                            <DropdownButton id="dropdown-basic-button" title={selectedCalculation.name}>{calculationList()}</DropdownButton>
                        </label>
                    </form>
                </div>

                <Addition selectedPatientID={selectedPatientID}/>
            </div>
            </div>
        </div>
    );
};

export default CalculatorFramework;
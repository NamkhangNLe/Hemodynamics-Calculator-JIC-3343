import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Addition from "../components/calculations/addition";
import Svr from "../components/calculations/svr";
import Pvr from "../components/calculations/pvr";
import TranspulGradient from "../components/calculations/transpulGradient";
import Papi from "../components/calculations/papi";
import CardiacIndex from "../components/calculations/ci";
import Fick from "../components/calculations/fick";
import "../styles/styles.css"
import Weight from "../components/calculations/weight";
import Bsa from "../components/calculations/bsa";
import LaFarge from "../components/calculations/lafarge";
import Dpg from "../components/calculations/dpg";



const CalculatorFramework = () => {
    // TODO: Populate this list with the calculations
    const availableCalculations = [
        { name: "Addition", component: Addition },
        { name: "Systemic Vasuclar Resistance", component: Svr },
        { name: "Pulmonary Vascular Resistance", component: Pvr },
        { name: "Transpulmonary Gradient", component: TranspulGradient },
        { name: "Diastolic Pulmonary Gradient", component: Dpg },
        { name: "Pulmonary Artery Pulsatility Index", component: Papi },
        { name: "Cardiac Index", component: CardiacIndex },
        { name: "Fick Cardiac Output", component: Fick },
        { name: "VO2 by Weight", component: Weight },
        { name: "VO2 by BSA", component: Bsa },
        { name: "VO2 by LaFarge Equation", component: LaFarge }
    ];

    const [selectedPatient, setSelectedPatient] = useState("Select Patient");
    const [selectedPatientID, setSelectedPatientID] = useState();
    const [selectedCalculation, setSelectedCalculation] = useState(availableCalculations[0]);

    const [patientObj, setPatientObj] = useState();

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

    useEffect(() => {
        async function getPatientObj() {
            const response = await fetch(`http://localhost:5000/record/${selectedPatientID}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const patient = await response.json();
            setPatientObj(patient);
        }
        if (selectedPatientID !== undefined) {
            getPatientObj();
        }

    }, [selectedPatientID]);

    // DropdownOption object; updates selected patient using initials when clicked
    const PatientDropdownOption = (props) => (
        <Dropdown.Item onClick={() => {
            setSelectedPatient(props.record.initials)
            setSelectedPatientID(props.record._id)
        }}>{props.record.initials}</Dropdown.Item>
    )

    function patientList() {
        return records.map((record) => {
            return <PatientDropdownOption record={record} />
        }
        );
    }

    // DropdownOption object; updates selected patient using initials when clicked
    const CalculationDropdownOption = (props) => (
        <Dropdown.Item onClick={() => {
            setSelectedCalculation({
                name: props.calculation.name,
                component: props.calculation.component,
            })
        }}>{props.calculation.name}</Dropdown.Item>
    )

    function calculationList() {
        return availableCalculations.map((calculation) => {
            return <CalculationDropdownOption calculation={calculation} />
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
                    {<selectedCalculation.component patientObj={patientObj} />}
                </div>
            </div>
        </div>
    );
};

export default CalculatorFramework;
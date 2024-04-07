import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { submitAll } from "../utils/calculationUtils.js";

import Svr from "../components/calculations/svr";
import Pvr from "../components/calculations/pvr";
import Tpg from "../components/calculations/tpg.js";
import Dpg from "../components/calculations/dpg";
import Papi from "../components/calculations/papi";
import CardiacIndex from "../components/calculations/ci";
import Fick from "../components/calculations/fick";
import Weight from "../components/calculations/weight";
import Bsa from "../components/calculations/bsa";
import LaFarge from "../components/calculations/lafarge";

import "../styles/styles.css"

const CalculatorFramework = () => {
    const calculations = {
        SVR: { valueType: "Systemic Vasuclar Resistance", calculatedValue: "" },
        PVR: { valueType: "Pulmonary Vascular Resistance", calculatedValue: "" },
        TPG: { valueType: "Transpulmonary Gradient", calculatedValue: "" },
        DPG: { valueType: "Diastolic Pulmonary Gradient", calculatedValue: "" },
        PAPI: { valueType: "Pulmonary Artery Pulsatility Index", calculatedValue: "" },
        CI: { valueType: "Cardiac Index", calculatedValue: "" },
        CO: { valueType: "Fick Cardiac Output", calculatedValue: "" },
        VO2W: { valueType: "VO2 by Weight", calculatedValue: "" },
        BSA: { valueType: "VO2 by BSA", calculatedValue: "" },
        VO2L: { valueType: "VO2 by LaFarge Equation", calculatedValue: "" }
    };

    const [selectedPatient, setSelectedPatient] = useState("Select Patient");
    const [selectedPatientID, setSelectedPatientID] = useState();
    const [patientObj, setPatientObj] = useState();
    const [selectedPatientRecord, setSelectedPatientRecord] = useState();

    const [records, setRecords] = useState([]);

    // Fetches all patient records from the database.
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

    // Updates patientObj if a different patient is selected.
    // Subsequently updates selectedPatient (initials) and selectedPatientID upon selection.
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

    // DropdownOption object; updates selectedPatient and selectedPatientID when clicked
    const PatientDropdownOption = (props) => (
        <Dropdown.Item onClick={() => {
            setSelectedPatient(props.record.initials);
            setSelectedPatientID(props.record._id);
            setSelectedPatientRecord(props.record);
        }}>{props.record.initials}</Dropdown.Item>
    );

    /**
     * Maps each patient object to a PatientDropdownOption object.
     * @returns an array of PatientDropdownOption objects containing each patients' initials
     */
    function patientList() {
        return records.map((record) => {
            return <PatientDropdownOption record={record} />
        });
    }

    /**
     * Passed into each component so that they can update the calculatedValue for their valueType
     * in the calculations object.
     */
    function updateCalculatedValue(valueCode, calculatedValue) {
        calculations[valueCode].calculatedValue = calculatedValue;
    }
    /**
     * Used for displaying Selected Patient's Medications
     * Converts the medications object to a string.
     * @returns a string representation of the medications object
     */
    let medications = '';
    if (selectedPatientRecord) {
        if (Array.isArray(selectedPatientRecord.medications)) {
            medications = selectedPatientRecord.medications.join(', ');
        } else if (typeof selectedPatientRecord.medications === 'string') {
            medications = selectedPatientRecord.medications;
        } else if (typeof selectedPatientRecord.medications === 'object') {
            // Convert the object to a string, depending on its structure
            // This is just an example, adjust it according to your needs
            medications = JSON.stringify(selectedPatientRecord.medications);
        }
    }

    return (
        <div className="app-container">
            <div className="content-container">
                <div className="main-content">
                    <h3>Calculate</h3>
                    <div id="calc-framework-top-bar">
                        <form onSubmit={e => submitAll(e, patientObj, calculations)}>
                            <label>
                                Select Patient:
                                <DropdownButton id="dropdown-basic-button" title={selectedPatient}>{patientList()}</DropdownButton>
                            </label>
                            <input
                                type="submit"
                                value={"Save All Calculations"}
                            />

                            <table>
                            <label>
                                Selected Patient's Medications: 
                                <input type="text" value={medications} readOnly />
                            </label>
                                <tbody>
                                    <tr>
                                        <td><Svr updateCalculatedValue={updateCalculatedValue} /></td>
                                        <td><Pvr updateCalculatedValue={updateCalculatedValue} /></td>
                                        <td><Tpg updateCalculatedValue={updateCalculatedValue} /></td>
                                    </tr>
                                    <tr>
                                        <td><Dpg updateCalculatedValue={updateCalculatedValue} /></td>
                                        <td><Papi updateCalculatedValue={updateCalculatedValue} /></td>
                                        <td><CardiacIndex patientObj={patientObj} updateCalculatedValue={updateCalculatedValue} /></td>
                                    </tr>
                                    <tr>
                                        <td><Fick updateCalculatedValue={updateCalculatedValue} /></td>
                                        <td><Weight patientObj={patientObj} updateCalculatedValue={updateCalculatedValue} /></td>
                                        <td><Bsa patientObj={patientObj} updateCalculatedValue={updateCalculatedValue} /></td>
                                    </tr>
                                    <tr>
                                        <td><LaFarge patientObj={patientObj} updateCalculatedValue={updateCalculatedValue} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorFramework;
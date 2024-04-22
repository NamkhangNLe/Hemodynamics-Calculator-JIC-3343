import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton} from 'react-bootstrap';
import { submitAll, arrString} from "../utils/calculationUtils.js";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from "react-bootstrap";


import "../styles/styles.css"
import PatientMedicationsDisplay from "../components/patientMedicationsDisplay.js";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const calculations = {
    SVR: { valueType: "Systemic Vascular Resistance", calculatedValue: "" },
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

const CalculatorFramework = () => {
    const [selectedPatient, setSelectedPatient] = useState("Select Patient");
    const [selectedPatientID, setSelectedPatientID] = useState();
    const [patientObj, setPatientObj] = useState();
    const [selectedPatientRecord, setSelectedPatientRecord] = useState();

    const [records, setRecords] = useState([]);

    const [age, setAge] = useState("");
    const [bsa, setBsa] = useState("");
    const [co, setCo] = useState("");
    const [cvp, setCvp] = useState("");
    const [hb, setHb] = useState("");
    const [hr, setHr] = useState("");
    const [map, setMap] = useState("");
    const [pap, setPap] = useState("");
    const [padp, setPadp] = useState("");
    const [pasp, setPasp] = useState("");
    const [pcwp, setPcwp] = useState("");
    const [ra, setRa] = useState("");
    const [satA, setSatA] = useState("");
    const [satMV, setSatMV] = useState("");
    const [sex, setSex] = useState("");
    const [vo2, setVo2] = useState("");
    const [wedge, setWedge] = useState("");
    const [weight, setWeight] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("danger");
    const [alertMessage, setAlertMessage] = useState("Error");

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
            const activeRecords = records.filter((record) => record.archived === false);
            setRecords(activeRecords);
        }

        getRecords();
    }, [records.length]);

    useEffect(() => {
        setSex((patientObj !== undefined) ? patientObj.sex : "");
        setAge((patientObj !== undefined) ? patientObj.age : age);
        setBsa((patientObj !== undefined) ? patientObj.bsa : bsa);
        setWeight((patientObj !== undefined) ? patientObj.weight : weight);
    }, [patientObj]);

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

    const calculationComponents = [
        <Svr updateCalculatedValue={updateCalculatedValue} map={map} cvp={cvp} co={co} setMap={setMap} setCvp={setCvp} setCo={setCo} />,
        <Pvr updateCalculatedValue={updateCalculatedValue} pap={pap} wedge={wedge} co={co} setPap={setPap} setWedge={setWedge} setCo={setCo} />,
        <Tpg updateCalculatedValue={updateCalculatedValue} map={map} pcwp={pcwp} setMap={setMap} setPcwp={setPcwp} />,
        <Dpg updateCalculatedValue={updateCalculatedValue} padp={padp} pcwp={pcwp} setPadp={setPadp} setPcwp={setPcwp} />,
        <Papi updateCalculatedValue={updateCalculatedValue} pasp={pasp} padp={padp} ra={ra} setPasp={setPasp} setPadp={setPadp} setRa={setRa} />,
        <CardiacIndex updateCalculatedValue={updateCalculatedValue} co={co} bsa={bsa} setCo={setCo} setBsa={setBsa} />,
        <Fick updateCalculatedValue={updateCalculatedValue} vo2={vo2} hb={hb} satA={satA} satMV={satMV} setVo2={setVo2} setHb={setHb} setSatA={setSatA} setSatMV={setSatMV} />,
        <Weight updateCalculatedValue={updateCalculatedValue} weight={weight} setWeight={setWeight} />,
        <Bsa updateCalculatedValue={updateCalculatedValue} bsa={bsa} setBsa={setBsa} />,
        <LaFarge updateCalculatedValue={updateCalculatedValue} sex={sex} age={age} hr={hr} setAge={setAge} setHr={setHr} />
    ];


    function getComponentCards() {
        return (
            <div style={{ display: "flex", flexDirection: "row", gap: "1%", flexWrap: "wrap"}}>
                {calculationComponents.map((component, index) => {
                    return (
                        // <Col key={index}>
                            <Card className="calculation-card">
                                <Card.Body>
                                    {component}
                                </Card.Body>
                            </Card>
                        // </Col>
                    );
                })}
            </div>
        );
    }

    async function saveAllCalculations(e) {
        let outcome = await submitAll(e, patientObj, calculations);
        if (!outcome) {
            setAlertVariant("danger");
            setAlertMessage("Patient was not selected.\nCalculation not saved.");
        } else {
            const {
                numTotalCalculations,
                numInvalidCalculations,
                numValidCalculations,
                missingInputs,
                badOutputs
            } = outcome;

            setAlertVariant("success");
            if (numInvalidCalculations !== 0) {
                setAlertMessage(numValidCalculations + " calculations saved!");
            } else {
                setAlertMessage("All calculations saved!");
            }
        }

        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }

    function getAlerts() {
        return (
            <div className="confirmation">
                <Alert variant={alertVariant}>
                    {alertMessage}
                </Alert>
            </div>
        );
    }

    return (
        <div>
            {showAlert && getAlerts()}
            <h3>Calculate</h3>
            <p className="subheading">Calculate hemodynamic values and save them to patient profiles.</p>
            <div className="d-flex justify-content-between">
                <DropdownButton id="dropdown-basic-button" title={selectedPatient}>{patientList()}</DropdownButton>
                <button className="btn btn-primary" onClick={e => saveAllCalculations(e)}>
                    <div className="button-icon">
                        <FontAwesomeIcon icon={faSave} />
                        Save All Calculations
                    </div>
                </button>
            </div>
            <PatientMedicationsDisplay medications={medications} />
            {getComponentCards()}
        </div>
    );
};

export default CalculatorFramework;
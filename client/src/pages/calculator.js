import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Addition from "../components/addition";
import Svr from "../components/svr";
import Pvr from "../components/pvr";
import TranspulGradient from "../components/transpulGradient";
import "../styles/styles.css"



const CalculatorFramework = () => {
    // TODO: Populate this list with the calculations
    const availableCalculations = [
        {name: "Addition", component: <Addition/>},
        {name: "Systemic Vasuclar Resistance", component: <Svr/>},
        {name: "Pulmonary Vascular Resistance", component: <Pvr/>},
        {name: "Transpulmonary Gradient", component: <TranspulGradient/>}
    ];

    const [selectedPatient, setSelectedPatient] = useState("Select Patient");
    const [selectedPatientID, setSelectedPatientID] = useState();
    const [selectedCalculation, setSelectedCalculation] = useState(availableCalculations[0]);
    
    // Booleans for component visibility - Maybe a better way to do this?
    const [additionVisible, setAdditionVisible] = useState(false);
    const [svrVisible, setSvrVisible] = useState(false);
    const [pvrVisible, setPvrVisible] = useState(false);
    const [transpulGradientVisible, setTranspulGradientVisible] = useState(false);

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

            // Set components active / inactive
            if (props.calculation.name == "Addition") {
                setAdditionVisible(true);
                setSvrVisible(false);
                setPvrVisible(false);
                setTranspulGradientVisible(false);
            }
            if (props.calculation.name == "Systemic Vasuclar Resistance") {
                setAdditionVisible(false);
                setSvrVisible(true);
                setPvrVisible(false);
                setTranspulGradientVisible(false);
            }
            if (props.calculation.name == "Pulmonary Vascular Resistance") {
                setAdditionVisible(false);
                setSvrVisible(false);
                setPvrVisible(true);
                setTranspulGradientVisible(false);
            }
            if (props.calculation.name == "Transpulmonary Gradient") {
                setAdditionVisible(false);
                setSvrVisible(false);
                setPvrVisible(false);
                setTranspulGradientVisible(true);
            }


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
                {additionVisible && <Addition/>}
                {svrVisible && <Svr/>}
                {pvrVisible && <Pvr/>}
                {transpulGradientVisible && <TranspulGradient/>}
            </div>
            </div>
        </div>
    );
};

export default CalculatorFramework;
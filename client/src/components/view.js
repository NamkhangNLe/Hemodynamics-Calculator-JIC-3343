import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PatientInfoCards from "./patientInfoCards";
import ConfirmationAlert from "./confirmationAlert";

export default function View() {
    const params = useParams();
    const navigate = useNavigate();
    const state = useLocation().state;

    const [patientCalculations, setPatientCalculations] = useState([]);
    const [patientRecord, setPatientRecord] = useState([]);

    /** EditingID keeps track of which calculation we are currently editing */
    const [editingID, setEditingID] = useState(null);

    /** The following hooks track the updates to each field (Date, ValueType/Formula, and Calculated Value) */
    // const [editedDateTime, setEditedDateTime] = useState("");
    const [editedDate, setEditedDate] = useState("");
    const [editedTime, setEditedTime] = useState("");
    const [editedValueType, setEditedValueType] = useState("");
    const [editedCalculatedValue, setEditedCalculatedValue] = useState("");

    useEffect(() => {
        async function fetchPatientCalculations() {
            const id = params.id;

            // Check if a patient with the specified id is found; alerts if query returned null.
            const patientResponse = await fetch(`http://localhost:5000/record/${id}`);
            const patient = await patientResponse.json();
            if (patient == null) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setPatientRecord(patient);

            const response = await fetch(`http://localhost:5000/calculation/${id}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            // Parse server response as JSON, which are the calculations for the patient with specified id.
            setPatientCalculations(await response.json());
        }

        fetchPatientCalculations();
    }, [params.id, navigate, editingID]);

    /**
     * Handles the edit button being pushed by setting the hooks to whatever is entered. Default is whatever is currently in there
     * @param {String} calculationId The ID of the calculation that we are currently editing
     */
    const handleEdit = (calculationId) => {
        const calculationToEdit = patientCalculations.find(calculation => calculation._id === calculationId);

        // Default the EditingID to whatever the current value of the calculation is.
        if (calculationToEdit) {
            setEditingID(calculationId);
            // setEditedDateTime(calculationToEdit.date);
            setEditedDate(parseDate(new Date(calculationToEdit.date)));
            setEditedTime(parseTime(new Date(calculationToEdit.date)));
            setEditedValueType(calculationToEdit.valueType);
            setEditedCalculatedValue(calculationToEdit.calculatedValue);
        }
    };

    /**
     * Formats a Date object to get its date as a String
     * @param {Date} date the Date object to parse the date out of
     * @returns formatted date string
     */
    function parseDate(date) {
        let month = (date.getMonth() + 1).toString();
        let dotm = date.getDate().toString();
        return date.getFullYear() + '-' + (month.length === 1 ? '0' + month : month) + '-' + (dotm.length === 1 ? '0' + dotm : dotm);
    }

    /**
     * Formats a Date object to get its time as a String
     * @param {Date} date the Date object to parse the time out of
     * @returns formatted time string
     */
    function parseTime(date) {
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        return (hours.length === 1 ? '0' + hours : hours) + ':' + (minutes.length === 1 ? '0' + minutes : minutes);
    }

    function getAlerts() {
        if (state === null) {
            return;
        }
        if (state.editSuccess === true) {
            return (
                <ConfirmationAlert message="Patient updated successfully!" variant="success"/>
            );
        }
    }

    /**
     * Parses calculations into table rows.
     * @returns formatted Table
     */
    function parseCalculations() {
        return patientCalculations.map(calculation => {
            let data = {
                date: parseDate(new Date(calculation.date)),
                time: parseTime(new Date(calculation.date)),
                formula: calculation.valueType,
                value: calculation.calculatedValue
            }

            return (
                <tr>
                    {editingID === calculation._id ? (
                        <>
                            <td>
                                <input
                                    type="text"
                                    value={editedDate}
                                    onChange={(e) => {
                                        setEditedDate(e.target.value);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={editedTime}
                                    onChange={(e) => {
                                        setEditedTime(e.target.value);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={editedValueType}
                                    onChange={(e) => setEditedValueType(e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={editedCalculatedValue}
                                    onChange={(e) => setEditedCalculatedValue(e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={handleSave} className="btn btn-link" title="Save Calculation">
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                            </td>
                        </>
                    ) : (
                        <>
                            <td>{data.date}</td>
                            <td>{data.time}</td>
                            <td>{data.formula}</td>
                            <td>{data.value}</td>
                            <td>
                                <button onClick={() => handleEdit(calculation._id)} className="btn btn-link" title="Edit Calculation">
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                            </td>
                        </>
                    )}
                </tr>
            );
        });
    }

    function calculationsTable() {
        return (
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Formula</th>
                        <th>Calculated Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {parseCalculations()}
                </tbody>
            </table>
        );
    }

    /**
     * Saves the data/values currently in the text fields to the database.
     */
    async function handleSave(e) {
        e.preventDefault();

        const editedCalculation = {
            date: new Date(`${editedDate}T${editedTime}:00.000`),
            valueType: editedValueType,
            calculatedValue: editedCalculatedValue
        };

        fetch(`http://localhost:5000/updatecalc/${editingID}`, {
            method: "PATCH",
            body: JSON.stringify(editedCalculation),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // Clear the editingID, editedDateTime, editedValueType, and editedCalculatedValue once saved.
        setEditingID(null);
        // setEditedDateTime("");
        setEditedDate("");
        setEditedTime("");
        setEditedValueType("");
        setEditedCalculatedValue("");
    };

    // Used to set the link to the trends page using the params.id

    return (
        <div>
            {getAlerts()}
            <h3>View Calculation History</h3>
            <p className="subheading">History of all calculations saved on the patient's profile.</p>
            <div style={{paddingBottom: "2%"}}>
                <PatientInfoCards patientRecord={patientRecord} patientCalculations={patientCalculations}/>
                <Link to={`/trends`} state={{id: params.id}}>
                    <button className="btn btn-primary" style={{width: "175px"}}>
                        <div className="button-icon">
                            <FontAwesomeIcon icon={faChartSimple} />
                            View {patientRecord.initials}'s Trends
                        </div>
                    </button>
                </Link>
            </div>
            <div>
                <h4>Calculation History</h4>
                {calculationsTable()}
            </div>
        </div>
    );
}

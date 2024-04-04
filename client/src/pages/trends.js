import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Trends = () => {

    // For navigating to the proper trends page once a user clicks an option from the dropdown menu
    const navigate = useNavigate();

    // Hook for when a user selects a patient's initials from the drop down menu
    const [selectedPatient, setSelectedPatient] = useState("Select Patient");

    // Hook for when a user selects a patient from the drop down menu (sets the actual patients' ID)
    const [selectedPatientID, setSelectedPatientID] = useState();

    // Hook for setting the actual patient records
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            const active_records = records.filter((record) => record.archived === false);
            setRecords(active_records);
        }

        getRecords();
    }, [records.length]);

    // DropdownOption object; updates selected patient using initials when clicked
    const PatientDropdownOption = (props) => (

        <Dropdown.Item onClick={() => {
            setSelectedPatientID(props.record._id)
            navigate(`/trends/${props.record._id}`);

        }

        }>{props.record.initials}</Dropdown.Item>
    )

    function patientList() {
        return records.map((record) => {
            return <PatientDropdownOption record={record} />
        }
        );
    }

    return (
        <div>
            <h3>Patient Trends</h3>
            <form>
                <label>
                    Select Patient:
                    <DropdownButton id="dropdown-basic-button" title={selectedPatient}>{patientList()}</DropdownButton>
                </label>
            </form>
        </div>
    );
}



export default Trends;

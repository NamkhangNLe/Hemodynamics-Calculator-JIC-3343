import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate, useLocation} from 'react-router-dom';
import PatientForm from "./patientForm";

/**
 * Edit component that allows the user to update a record in the database.
 * @returns {JSX.Element} The JSX element that displays the form to update the record.
 */
export default function Edit() {
    const params = useParams();
    const navigate = useNavigate();
    const state = useLocation().state;
    const sourcePath = state ? state.sourcePath : "/";

    const [form, setForm] = useState({
        initials: "",
        dob: "",
        sex: "",
        height: "",
        weight: "",
        medications: "",
        notes: "",
        archived: false,
        hardware: []
    });

    useEffect(() => {
        /**
         * Fetches the record with the given ID from the database and updates the form state with its values.
         * If the record is not found, redirects the user to the home page.
         */
        async function fetchData() {
            const id = params.id;
            // console.log("Fetching record with id: " + id);

            const response = await fetch(`http://localhost:5000/record/${id}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const patientRecord = await response.json();
            if (patientRecord == null) {
                window.alert(`No patient with id ${id} found.`);
                navigate(sourcePath, {state: {editSuccess: false}});
                return;
            }

            setForm(patientRecord);
        }

        fetchData();
    }, [params.id, navigate]);

    /**
     * Updates the form state with the given values.
     * @param {Object} value - The values to update the form state with.
     * @param {number} permission - For hardware updates, set to 1 if we are removing.
     */
    function updateForm(value, permission) {
        return setForm((prev) => {

            if (value.medications) {
                const updatedMedications = prev.medications.includes(value.medications)
                    ? prev.medications.filter(med => med !== value.medications)
                    : [...prev.medications, value.medications];

                return { ...prev, medications: updatedMedications };
            }

            if (value.hardware) {

                if (permission === 1) {

                    const updatedHardware = prev.hardware.filter(hardware => hardware.deviceName !== value.hardware.deviceName);
                    return { ...prev, hardware: updatedHardware };

                } else {

                    const deviceName = value.hardware[0].deviceName;
                    for (let i = 0; i < prev.hardware.length; i += 1) {

                        if (prev.hardware[i].deviceName === deviceName) {
                            const updatedHardware = value.hardware;
                            return { ...prev, hardware: updatedHardware };
                        }
                    }
                    const updatedHardware = [...prev.hardware, ...value.hardware];
                    return { ...prev, hardware: updatedHardware };
                }
                }
            return { ...prev, ...value };
        });
    }

    /**
     * Submits the updated record to the database.
     * @param {Event} e - The form submit event.
     */
    async function onSubmit(e) {
        e.preventDefault();

        const editedPerson = {
            initials: form.initials,
            dob: form.dob,
            sex: form.sex,
            height: form.height,
            weight: form.weight,
            medications: form.medications,
            notes: form.notes,
            archived: form.archived,
            hardware: form.hardware
        };

        fetch(`http://localhost:5000/update/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate(sourcePath, {state: {editSuccess: true}});
    }

    // Displays the form that takes input from the user to update the data.
    return (
        <div>
            <h3> Edit Patient Profile</h3>
            <p className="subheading">Edit patient profile.</p>
            <span style={{ fontStyle: "italic", color: "gray" }}> <span style={{ color: "red" }}>*</span> = required field</span>
            <PatientForm form={form} onSubmit={onSubmit} updateForm={updateForm} mode="Update" />
        </div>
    );
}
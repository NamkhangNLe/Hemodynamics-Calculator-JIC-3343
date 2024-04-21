import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"
import PatientForm from "./patientForm";
/**
 * Renders a form to create a new record in the database.
 * @returns {JSX.Element} The create form component.
 */
export default function Create() {
    // Initialize the form state with empty values for initials, dob, sex, height, and weight.
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


    // Import the useNavigate hook from the React Router library.
    const navigate = useNavigate();

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
     * Handles the form submission by sending a POST request to the server to create a new record.
     * @param {Event} e - The form submission event.
     * @returns {void}
     */
    async function onSubmit(e) {
        e.preventDefault();
        // Create a new object with the values from the form state.
        const newPerson = { ...form };

        try {
            // Send a POST request to the server to create a new record.
            const response = await fetch("http://localhost:5000/record/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            }).then(() => navigate("/", {state: {createSuccess: true}}));

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            // If the fetch request is successful, log the response (optional).
            // console.log('Record added successfully:', await response.json());

            // Reset the form state to empty values.
            setForm({ initials: "", dob: "", sex: "", height: "", weight: "", medications: "", notes: "", hardware: "" });

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    // Render the create form component.
    return (
        <div>
            <h3> New Patient Profile</h3>
            <p className="subheading">Create patient profile.</p>
            <span style={{ fontStyle: "italic", color: "gray" }}> <span style={{ color: "red" }}>*</span> = required field</span>
            <PatientForm form={form} onSubmit={onSubmit} updateForm={updateForm} mode="Create" />
        </div>
    );
}
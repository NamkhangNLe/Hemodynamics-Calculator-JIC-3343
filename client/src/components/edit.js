import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import PatientForm from "./patientForm";
import ConfirmationAlert from "./confirmationAlert";

/**
 * Edit component that allows the user to update a record in the database.
 * @returns {JSX.Element} The JSX element that displays the form to update the record.
 */
export default function Edit() {
    const params = useParams();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

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
                navigate(-1);
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
     * Redirects to the record list page and displays the confirmation box.
     * @returns {void}
     */
    function redirectConfirmation() {
        navigate(-1);

        // Create a div element with a fading animation
        const divElement = document.createElement('div');
        const textElement = document.createElement('span');
        textElement.innerText = 'Patient updated successfully!';
        divElement.className = "fading-div";
        divElement.append(textElement);
        divElement.style.opacity = 0; // Set initial opacity to 0
        divElement.style.transition = 'opacity 1s ease-in-out'; // Set animation transition
        document.body.appendChild(divElement); // Append the div to the body

        // Animate the div to fade in and fade out
        divElement.style.opacity = 1; // Fade in
        setTimeout(() => {
            divElement.style.opacity = 0; // Fade out
            setTimeout(() => {
                divElement.parentNode.removeChild(divElement); // Remove the div from the body
            }, 1000); // Delay removal after animation
        }, 2000); // Delay fade out after 2 seconds

        setShowSuccess(true);
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

        redirectConfirmation(); // Navigate back to the home page.
        // Sends a post request to update the data in the database.
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
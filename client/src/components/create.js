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
        archived: false
    });




    // Import the useNavigate hook from the React Router library.
    const navigate = useNavigate();



    /**
     * Updates the form state with the provided values.
     * @param {Object} value - The values to update the form state with.
     * @returns {void}
     */
    function updateForm(value) {
        // Use the spread operator to merge the previous state with the new values.
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    /**
     * Redirects to the record list page and displays the confirmation box.
     * @returns {void}
     */
    function redirectConfirmation() {


        navigate("/");

        // Create a div element with a fading animation
        const divElement = document.createElement('div');
        const textElement = document.createElement('span');
        textElement.innerText = 'Patient created successfully!';
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
            }).then(sleep(100).then(redirectConfirmation));

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            // If the fetch request is successful, log the response (optional).
            console.log('Record added successfully:', await response.json());

            // Reset the form state to empty values.
            setForm({ initials: "", dob: "", sex: "", height: "", weight: "", medications: "", notes: "" });

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    // Render the create form component.
    return (
        <div className="form-div">
            <h3> New Patient Profile</h3>
            <span style={{ fontStyle: "italic", color: "gray" }}> <span style={{ color: "red" }}>*</span> = required field</span>
            <PatientForm form={form} onSubmit={onSubmit} updateForm={updateForm} mode="Create" />
        </div>
    );
}

/**
   * Waits an amount of time
   * @param {int} ms - Time in milliseconds
   * @returns
   */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {useNavigate} from 'react-router-dom';
import PatientForm from "./patientForm";

/**
 * Edit component that allows the user to update a record in the database.
 * @returns {JSX.Element} The JSX element that displays the form to update the record.
 */
export default function Edit() {
  const [form, setForm] = useState({
    initials: "",
    dob: "",
    sex: "",
    height: "",
    weight: "",
    medications: "",
    records: [],
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Fetches the record with the given ID from the database and updates the form state with its values.
     * If the record is not found, redirects the user to the home page.
     */
    async function fetchData() {
      const id = params.id.toString();
      console.log("Fetching record with id: " + id);

      // TODO: Change to single route fetching instead of filtering.
      const response = await fetch(`http://localhost:5000/record`);
      console.log("Fetch done");
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const allPatients = await response.json();

      if (!allPatients) {
        window.alert(`Error querying patients.`);
        navigate("/");
        return;
      }
      const records = allPatients.filter(patient => patient._id === id);
      if (records.length === 0) {
        window.alert(`No patient with id ${id} found.`);
        navigate("/");
        return;
      }

      const patientRecord = records[0];
      console.log(patientRecord);
      setForm(patientRecord);
    }

    fetchData();
    return;
  }, [params.id, navigate]);

  /**
   * Updates the form state with the given values.
   * @param {Object} value - The values to update the form state with.
   */
  function updateForm(value) {
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
      medications: form.medications
    };
    redirectConfirmation(); // Navigate back to the home page.
    // Sends a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  // Displays the form that takes input from the user to update the data.
  return (
    <div className="form-div">
      <h3> Edit Patient Profile</h3>
      <span style={{fontStyle: "italic", color: "gray"}}> <span style = {{color: "red"}}>*</span> = required field</span>
      <PatientForm form={form} onSubmit={onSubmit} updateForm={updateForm} mode="Update"/>
    </div>
  );
}

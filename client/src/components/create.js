import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"
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
    medications: ""
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
    // redirect back to the recordlist page
    navigate("/")
    // Create a div element with a fading animation
    const divElement = document.createElement('div');
    const textElement = document.createElement('span');
    textElement.innerText = 'Patient Created Successfuly!';
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
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // If the fetch request is successful, log the response (optional).
      console.log('Record added successfully:', await response.json());

      // Reset the form state to empty values.
      setForm({ initials: "", dob: "", sex: "", height: "", weight: "", medications: ""});

      // Navigate back to the home page.
      navigate("/");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  // Render the create form component.
  return (
    <div className="form-div">
      <h3> New Patient Profile</h3>
      <span style={{fontStyle: "italic", color: "gray"}}> <span style = {{color: "red"}}>*</span> = required field</span>
      <form onSubmit={onSubmit} className = "form">
        <div className="form-region">
          <div className="form-column-region">

            {/* Column 1 */}
            <div className="form-column">
              <div className="form-group">
                <label className="field-label" htmlFor="initials">Initials<span style = {{color: "red"}}>*</span>:</label>
                <input
                  type="text"
                  maxLength="2"
                  required="true"
                  className="form-control"
                  id="initials"
                  value={form.initials}
                  onChange={(e) => {updateForm({ initials: e.target.value })}}
                  style={{ width: '100px' }}
                />
              </div>
              <div className="form-group">
                <label className="field-label" htmlFor="dob">Date of Birth<span style = {{color: "red"}}>*</span>:</label>
                <input
                  type="date"
                  className="form-control"
                  required="true"
                  id="dob"
                  value={form.dob}
                  onChange={(e) => updateForm({ dob: e.target.value })}
                  style={{ width: '200px' }}
                />
              </div>
              <div className="form-group">
                <label className="field-label" htmlFor="sex">Sex<span style = {{color: "red"}}>*</span>:</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sexOptions"
                    required="true"
                    id="male"
                    value="M"
                    checked={form.sex === "M"}
                    onChange={(e) => updateForm({ sex: e.target.value })}
                  />
                  <label htmlFor="male" className="form-check-label">
                    M
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sexOptions"
                    id="female"
                    required="true"
                    value="F"
                    checked={form.sex === "F"}
                    onChange={(e) => updateForm({ sex: e.target.value })}
                  />
                  <label htmlFor="female" className="form-check-label">
                    F
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="field-label" htmlFor="height">Height<span style = {{color: "red"}}>*</span>:</label>
                <input
                  type="number"
                  className="form-control"
                  required="true"
                  id="height"
                  value={form.height}
                  onChange={(e) => updateForm({ height: e.target.value })}
                  style={{ width: '100px' }}
                />
                <span style={{paddingLeft:5 + "px"}}>cm</span>
              </div>
              <div className="form-group">
                <label className="field-label" htmlFor="weight">Weight<span style = {{color: "red"}}>*</span>:</label>
                <input
                  type="number"
                  className="form-control"
                  required="true"
                  id="weight"
                  value={form.weight}
                  onChange={(e) => updateForm({ weight: e.target.value })}
                  style={{ width: '100px' }}
                />
                <span style={{paddingLeft:5 + "px"}}>kg</span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="form-column">
              <h6>Current Medications:</h6>
              {/* TODO: Make this section into checkboxes */}
              <div className="medication-section">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="medicationA"
                    value="A"
                    checked={form.medications === "A"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="medicationA" className="form-check-label">
                    Medication A
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="medicationB"
                    value="B"
                    checked={form.medications === "B"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="medicationB" className="form-check-label">
                    Medication B
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="medicationC"
                    value="C"
                    checked={form.medications === "C"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="medicationC" className="form-check-label">
                    Medication C
                  </label>
                </div>
              </div>
              <div className="form-long-answer">
                {/* TODO: add patient notes to the database*/}
                <h6>Other Notes:</h6>
                <textarea id="message" name="message" rows="5" cols="30"></textarea>
              </div>
            </div>
          </div>
          <div className="submit-form-section">
            <input
              type="submit"
              value="Create Patient Profile"
              className="btn btn-primary"
            />
            <input
              onClick={redirectConfirmation}
              value="Redirect Temporary"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
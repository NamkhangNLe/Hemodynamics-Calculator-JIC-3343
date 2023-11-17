import React, { useState } from "react";
import { useNavigate } from "react-router";
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
   * Handles the form submission by sending a POST request to the server to create a new record.
   * @param {Event} e - The form submission event.
   * @returns {void}
   */
  async function onSubmit(e) {
    e.preventDefault();

    // Create a new object with the values from the form state.
    const newPerson = { ...form };

    // Send a POST request to the server to create a new record.
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .catch((error) => {
        // If there's an error, display an alert with the error message.
        window.alert(error);
        return;
      });

    // Reset the form state to empty values.
    setForm({ initials: "", dob: "", sex: "", height: "", weight: "", medications: ""});

    // Navigate back to the home page.
    navigate("/");
  }

  // Render the create form component.
  return (
    <div>
      <h3>Create Patient</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="initials">Initials</label>
          <input
            type="text"
            className="form-control"
            id="initials"
            value={form.name}
            onChange={(e) => updateForm({ initials: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="text"
            className="form-control"
            id="dob"
            value={form.position}
            onChange={(e) => updateForm({ dob: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sexOptions"
              id="male"
              value="M"
              checked={form.level === "M"}
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
              value="F"
              checked={form.level === "F"}
              onChange={(e) => updateForm({ sex: e.target.value })}
            />
            <label htmlFor="female" className="form-check-label">
              F
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="height">Height</label>
          <input
            type="number"
            className="form-control"
            id="height"
            value={form.position}
            onChange={(e) => updateForm({ height: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            className="form-control"
            id="weight"
            value={form.position}
            onChange={(e) => updateForm({ weight: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="medicationOptions"
              id="medicationA"
              value="A"
              checked={form.level === "A"}
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
              checked={form.level === "B"}
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
              checked={form.level === "C"}
              onChange={(e) => updateForm({ medications: e.target.value })}
            />
            <label htmlFor="medicationC" className="form-check-label">
              Medication C
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Patient"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
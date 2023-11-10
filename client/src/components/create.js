import React, { useState } from "react";
import { useNavigate } from "react-router";
/**
 * Renders a form to create a new record in the database.
 * @returns {JSX.Element} The create form component.
 */
export default function Create() {
  // Initialize the form state with empty values for name, position, and level.
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
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
    setForm({ name: "", position: "", level: "" });

    // Navigate back to the home page.
    navigate("/");
  }

  // Render the create form component.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">
              Intern
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">
              Junior
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionSenior" className="form-check-label">
              Senior
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
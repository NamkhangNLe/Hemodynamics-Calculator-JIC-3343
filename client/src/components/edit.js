import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router";
import {Route, useNavigate} from 'react-router-dom';
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
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();

      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
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
    navigate("/"); // Navigate back to the home page.
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
    <div>
      <h3>Update Patient</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="initials">Initials: </label>
          <input
            type="text"
            className="form-control"
            id="initials"
            value={form.intials}
            onChange={(e) => updateForm({ initials: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth: </label>
          <input
            type="text"
            className="form-control"
            id="dob"
            value={form.dob}
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
              checked={form.sex === "M"}
              onChange={(e) => updateForm({ sex: e.target.value })}
            />
            <label htmlFor="male" className="form-check-label">M</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sexOptions"
              id="female"
              value="F"
              checked={form.sex === "F"}
              onChange={(e) => updateForm({ sex: e.target.value })}
            />
            <label htmlFor="male" className="form-check-label">F</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="height">Height: </label>
          <input
            type="number"
            className="form-control"
            id="height"
            value={form.height}
            onChange={(e) => updateForm({ height: e.target.value })}
          />
        </div><div className="form-group">
          <label htmlFor="weight">Weight: </label>
          <input
            type="number"
            className="form-control"
            id="weight"
            value={form.weight}
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
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

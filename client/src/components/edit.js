import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {useNavigate} from 'react-router-dom';
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
    <div className="form-div">
      <h3> Edit Patient Profile</h3>
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
                  maxLength={2}
                  required={true}
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
                  required={true}
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
                    required={true}
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
                    required={true}
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
                  required={true}
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
                  required={true}
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
              value="Save Profile"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

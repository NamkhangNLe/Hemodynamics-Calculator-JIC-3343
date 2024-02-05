import React from "react";

/**
 * Form component to edit/create patient fields.
 * @returns {JSX.Element} The form component.
 */
export default function PatientForm({form, onSubmit, updateForm}) {
    return (
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
                <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    rows="5"
                    cols="10"
                    value={form.notes}
                    onChange={(e) => updateForm({ notes: e.target.value })}
                >
                </textarea>
              </div>
            </div>
          </div>
          <div className="submit-form-section">
            <input
              type="submit"
              value="Create Patient Profile"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    );
}
import React from "react";

/**
 * Form component to edit/create patient fields.
 * @returns {JSX.Element} The form component.
 */
export default function PatientForm({form, onSubmit, updateForm, mode}) {
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
                    id="milrinone"
                    value="Milrinone"
                    checked={form.medications === "Milrinone"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="medicationA" className="form-check-label">
                    Milrinone
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="Dobutamine"
                    value="Dobutamine"
                    checked={form.medications === "Dobutamine"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="Dobutamine" className="form-check-label">
                    Dobutamine
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="Lasix"
                    value="Lasix"
                    checked={form.medications === "Lasix"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="Lasix" className="form-check-label">
                    Lasix
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="Bumex"
                    value="Bumex"
                    checked={form.medications === "Bumex"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="Bumex" className="form-check-label">
                    Bumex
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="Diuril"
                    value="Diuril"
                    checked={form.medications === "Diuril"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="Diuril" className="form-check-label">
                    Diuril
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="Hydralazine"
                    value="Hydralazine"
                    checked={form.medications === "Hydralazine"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="Hydralazine" className="form-check-label">
                    Hydralazine
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="Epinephrine"
                    value="Epinephrine"
                    checked={form.medications === "Epinephrine"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="Epinephrine" className="form-check-label">
                    Epinephrine
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="Norepinephrine"
                    value="Norepinephrine"
                    checked={form.medications === "Norepinephrine"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="Norepinephrine" className="form-check-label">
                    Norepinephrine
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="Dopamine"
                    value="Dopamine"
                    checked={form.medications === "Dopamine"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="Dopamine" className="form-check-label">
                    Dopamine
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="medicationOptions"
                    id="Vasopressin"
                    value="Vasopressin"
                    checked={form.medications === "Vasopressin"}
                    onChange={(e) => updateForm({ medications: e.target.value })}
                  />
                  <label htmlFor="Vasopressin" className="form-check-label">
                    Vasopressin
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
              value={mode + " Patient Profile"}
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    );
}
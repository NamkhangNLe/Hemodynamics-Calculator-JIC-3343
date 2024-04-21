import React from "react";
import HardwareForm from "./hardwareForm";

/**
 * Form component to edit/create patient fields.
 * @returns {JSX.Element} The form component.
 */
export default function PatientForm({ form, onSubmit, updateForm, mode }) {

    return (
        <form onSubmit={onSubmit} className="form">
            <div className="form-region">
                <div className="form-column-region">

                    {/* Column 1 */}
                    <div className="form-column">
                        <div className="form-group">
                            <label className="field-label" htmlFor="initials">Initials<span style={{ color: "red" }}>*</span>:</label>
                            <input
                                type="text"
                                maxLength={2}
                                required={true}
                                className="form-control"
                                id="initials"
                                value={form.initials}
                                onChange={(e) => { updateForm({ initials: e.target.value }, 0) }}
                                style={{ width: '100px' }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="field-label" htmlFor="dob">Date of Birth<span style={{ color: "red" }}>*</span>:</label>
                            <input
                                type="date"
                                className="form-control"
                                required={true}
                                id="dob"
                                value={form.dob}
                                onChange={(e) => updateForm({ dob: e.target.value }, 0)}
                                style={{ width: '200px' }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="field-label" htmlFor="sex">Sex<span style={{ color: "red" }}>*</span>:</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sexOptions"
                                    required={true}
                                    id="male"
                                    value="M"
                                    checked={form.sex === "M"}
                                    onChange={(e) => updateForm({ sex: e.target.value }, 0)}
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
                                    onChange={(e) => updateForm({ sex: e.target.value }, 0)}
                                />
                                <label htmlFor="female" className="form-check-label">
                                    F
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="field-label" htmlFor="height">Height<span style={{ color: "red" }}>*</span>:</label>
                            <input
                                type="number"
                                className="form-control"
                                required={true}
                                id="height"
                                value={form.height}
                                onChange={(e) => updateForm({ height: e.target.value }, 0)}
                                style={{ width: '100px' }}
                            />
                            <span style={{ paddingLeft: 5 + "px" }}>cm</span>
                        </div>
                        <div className="form-group">
                            <label className="field-label" htmlFor="weight">Weight<span style={{ color: "red" }}>*</span>:</label>
                            <input
                                type="number"
                                className="form-control"
                                required={true}
                                id="weight"
                                value={form.weight}
                                onChange={(e) => updateForm({ weight: e.target.value }, 0)}
                                style={{ width: '100px' }}
                            />
                            <span style={{ paddingLeft: 5 + "px" }}>kg</span>
                        </div>

                        <div className="hardware-section">
                            <h6>Current Hardware:</h6>
                            <HardwareForm form={form} updateForm={updateForm} />
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
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="milrinone"
                                    value="Milrinone"
                                    checked={form.medications.includes("Milrinone")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="milrinone" className="form-check-label">
                                    Milrinone
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="dobutamine"
                                    value="Dobutamine"
                                    checked={form.medications.includes("Dobutamine")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="dobutamine" className="form-check-label">
                                    Dobutamine
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="lasix"
                                    value="Lasix"
                                    checked={form.medications.includes("Lasix")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="lasix" className="form-check-label">
                                    Lasix
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="bumex"
                                    value="Bumex"
                                    checked={form.medications.includes("Bumex")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="bumex" className="form-check-label">
                                    Bumex
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="diuril"
                                    value="Diuril"
                                    checked={form.medications.includes("Diuril")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="diuril" className="form-check-label">
                                    Diuril
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="hydralazine"
                                    value="Hydralazine"
                                    checked={form.medications.includes("Hydralazine")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="hydralazine" className="form-check-label">
                                    Hydralazine
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="epinephrine"
                                    value="Epinephrine"
                                    checked={form.medications.includes("Epinephrine")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="epinephrine" className="form-check-label">
                                    Epinephrine
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="norepinephrine"
                                    value="Norepinephrine"
                                    checked={form.medications.includes("Norepinephrine")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="norepinephrine" className="form-check-label">
                                    Norepinephrine
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="dopamine"
                                    value="Dopamine"
                                    checked={form.medications.includes("Dopamine")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="dopamine" className="form-check-label">
                                    Dopamine
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicationOptions"
                                    id="vasopressin"
                                    value="Vasopressin"
                                    checked={form.medications.includes("Vasopressin")}
                                    onChange={(e) => updateForm({ medications: e.target.value }, 0)}
                                />
                                <label htmlFor="vasopressin" className="form-check-label">
                                    Vasopressin
                                </label>
                            </div>
                        </div>

                        <div className="form-long-answer">
                            {/* TODO: add patient notes to the database*/}
                            <h6>Notes:</h6>
                            <textarea
                                className="form-control"
                                name="message"
                                id="message"
                                rows="5"
                                cols="10"
                                value={form.notes}
                                onChange={(e) => updateForm({ notes: e.target.value }, 0)}
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
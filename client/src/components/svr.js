import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Svr({ selectedPatientID }) {
    const [map, setMap] = useState("");
    const [cvp, setCvp] = useState("");
    const [co, setCo] = useState("");
    const [form, setForm] = useState({
        valueType: "Systemic Vascular Resistance",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((map === "" && cvp === "" && co === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({ valueType: "Systemic Vascular Resistance", calculatedValue: (map !== "" && cvp !== "" && co !== "") ? ((+map - +cvp) / +co).toFixed(3) : "" });
    }, [map, cvp, co]);

    return (
        <div>
            <h1>Systemic Vasuclar Resistance</h1>
            <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                <div>
                    MAP: <input name="MPA" placeholder="Ex: 68 mmHg" type="number" value={map} onChange={e => setMap(e.target.value)} />
                </div>
                <div>
                    CVP: <input name="CVP" placeholder="Ex: 12 mmHg" type="number" value={cvp} onChange={e => setCvp(e.target.value)} />
                </div>
                <div>
                    CO: <input name="CO" placeholder="Ex: 4.3 L/min" type="number" value={co} onChange={e => setCo(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={form.calculatedValue} readOnly />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}
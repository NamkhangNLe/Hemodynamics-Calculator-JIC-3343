import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Pvr({ selectedPatientID }) {
    const [pap, setPap] = useState("");
    const [wedge, setWedge] = useState("");
    const [co, setCo] = useState("");
    const [form, setForm] = useState({
        valueType: "Pulmonary Vascular Resistance",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((pap === "" && wedge === "" && co === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({ valueType: "Pulmonary Vascular Resistance", calculatedValue: (pap !== "" && wedge !== "" && co !== "") ? ((+pap - +wedge) / +co).toFixed(3) : "" });
    }, [pap, wedge, co]);

    return (
        <div>
            <h1>Pulmonary Vasuclar Resistance</h1>
            <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                <div>
                    PAP: <input name="PAP" placeholder="Ex: 16 mmHg" type="number" value={pap} onChange={e => setPap(e.target.value)} />
                </div>
                <div>
                    Wedge: <input name="wedge" placeholder="Ex: 6 mmHg" type="number" value={wedge} onChange={e => setWedge(e.target.value)} />
                </div>
                <div>
                    CO: <input name="CO" placeholder="Ex: 4.1 L/min" type="number" value={co} onChange={e => setCo(e.target.value)} />
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
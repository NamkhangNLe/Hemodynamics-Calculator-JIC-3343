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
    const [error, setError] = useState(null);

    useEffect(() => {
        if (co === 0) {
            setError('CO cannot be zero');
            setForm({ valueType: "Pulmonary Vascular Resistance", calculatedValue: "" });
            return;
        }
        setPlaceholderText((pap === "" && wedge === "" && co === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({ valueType: "Pulmonary Vascular Resistance", calculatedValue: (pap !== "" && wedge !== "" && co !== "") ? ((+pap - +wedge) / +co).toFixed(3) : "" });
    }, [pap, wedge, co]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Pulmonary Vasuclar Resistance</h1>
            <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                <div>
                    PAP: <input name="PAP" type="number" value={pap} onChange={e => setPap(e.target.value)} />
                </div>
                <div>
                    Wedge: <input name="wedge" type="number" value={wedge} onChange={e => setWedge(e.target.value)} />
                </div>
                <div>
                    CO: <input name="CO" type="number" value={co} onChange={e => setCo(e.target.value)} />
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
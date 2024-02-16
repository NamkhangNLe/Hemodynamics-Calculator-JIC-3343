import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Papi({ selectedPatientID }) {
    const [pasp, setPasp] = useState("");
    const [padp, setPadp] = useState("");
    const [ra, setRa] = useState("");
    const [form, setForm] = useState({
        valueType: "Pulmonary Artery Pulsatility Index",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (ra === 0) {
            setError('RA cannot be zero');
            setForm({ valueType: "Pulmonary Artery Pulsatility Index", calculatedValue: "" });
            return;
        }
        
        setPlaceholderText((pasp === "" && padp === "" && ra === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({ valueType: "Pulmonary Artery Pulsatility Index", calculatedValue: (pasp !== "" && padp !== "" && ra !== "") ? ((+pasp - +padp) / +ra).toFixed(3) : "" });
    }, [pasp, padp, ra]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Pulmonary Artery Pulsatility Index</h1>
            <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                <div>
                    PASP: <input name="PASP" type="number" value={pasp} onChange={e => setPasp(e.target.value)} />
                </div>
                <div>
                    PADP: <input name="PADP" type="number" value={padp} onChange={e => setPadp(e.target.value)} />
                </div>
                <div>
                    RA: <input name="RA" type="number" value={ra} onChange={e => setRa(e.target.value)} />
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
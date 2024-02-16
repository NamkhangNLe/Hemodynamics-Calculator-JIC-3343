import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Weight({ selectedPatientID }) {
    const [weight, setWeight] = useState("");
    const [form, setForm] = useState({
        valueType: "Weight",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((weight === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({ valueType: "Weight", calculatedValue: (weight !== "") ? (+weight * 3).toFixed(3) : "" });
    }, [weight]);

    return (
        <div>
            <h1>VO2 by Weight</h1>
            <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                <div>
                    Weight: <input name="weight" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
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
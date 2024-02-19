import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Weight({ patientObj }) {
    const [weight, setWeight] = useState("");
    const [form, setForm] = useState({
        valueType: "Weight",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((weight === "") ? "Enter calculation inputs" : "Missing inputs");
        setWeight((patientObj !== undefined) ? patientObj.weight : weight);
        setForm({ valueType: "Weight", calculatedValue: (weight !== "") ? (+weight * 3).toFixed(3) : "" });
    }, [weight, patientObj]);

    return (
        <div>
            <h1>VO2 by Weight</h1>
            <form onSubmit={e => onSubmit(e, patientObj, form)}>
                <div>
                    Weight (kg): <input name="weight" placeholder="Ex: 120 lbs" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={form.calculatedValue} readOnly /> ml/min/m<sup>2</sup>
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}
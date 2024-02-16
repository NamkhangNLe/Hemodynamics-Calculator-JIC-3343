import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Bsa({ selectedPatientID }) {
    const [bsa, setBsa] = useState("");
    const [form, setForm] = useState({
        valueType: "VO2 by BSA",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((bsa === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({ valueType: "VO2 by BSA", calculatedValue: (bsa !== "") ? (+bsa * 125).toFixed(3) : "" });
    }, [bsa]);

    return (
        <div>
            <h1>VO2 by BSA</h1>
            <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                <div>
                    BSA: <input name="BSA" placeholder="Ex: 1.9 m2" type="number" value={bsa} onChange={e => setBsa(e.target.value)} />
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
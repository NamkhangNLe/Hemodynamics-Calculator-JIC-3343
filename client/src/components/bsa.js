import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Bsa({ patientObj }) {
    const [bsa, setBsa] = useState("");
    const [form, setForm] = useState({
        valueType: "VO2 by BSA",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((bsa === "") ? "Enter calculation inputs" : "Missing inputs");
        setBsa((patientObj !== undefined) ? patientObj.bsa : bsa)
        setForm({ valueType: "VO2 by BSA", calculatedValue: (bsa !== "") ? (+bsa * 125).toFixed(3) : "" });
    }, [bsa, patientObj]);

    return (
        <div>
            <h1>VO2 by BSA</h1>
            <form onSubmit={e => onSubmit(e, patientObj, form)}>
                <div>
                    Body Surface Area (m<sup>2</sup>): <input name="BSA" type="number" value={bsa} onChange={e => setBsa(e.target.value)} />
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
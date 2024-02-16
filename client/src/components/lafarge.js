import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function LaFarge({ patientObj }) {
    const [logeage, setLogeage] = useState("");
    const [hr, setHr] = useState("");
    const [form, setForm] = useState({
        valueType: "VO2 by LaFarge Equation",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((logeage === "" && hr === "") ? "Enter calculation inputs" : "Missing inputs");
        if (patientObj.sex == "Male") {
            setForm({valueType: "VO2 by LaFarge Equation", calculatedValue: (logeage !== "" && hr !== "") ? (138.1 - (11.49 * +logeage) + (0.378 * +hr)).toFixed(3) : "" });
        } else {
            setForm({valueType: "VO2 by LaFarge Equation", calculatedValue: (logeage !== "" && hr !== "") ? (138.1 - (17.04 * +logeage) + (0.378 * +hr)).toFixed(3) : "" })
        }
        
    }, [logeage, hr]);

    return (
        <div>
            <h1>VO2 by LaFarge Equation</h1>
            <form onSubmit={e => onSubmit(e, patientObj, form)}>
                <div>
                    Logeage: <input name="logeage" type="number" value={logeage} onChange={e => setLogeage(e.target.value)} />
                </div>
                <div>
                    Heart Rate (bpm): <input name="hr" type="number" value={hr} onChange={e => setHr(e.target.value)} />
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
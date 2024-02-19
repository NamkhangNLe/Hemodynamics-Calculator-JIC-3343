import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function LaFarge({ patientObj }) {
    const [age, setAge] = useState("");
    const [hr, setHr] = useState("");
    const [form, setForm] = useState({
        valueType: "VO2 by LaFarge Equation",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((age === "" && hr === "") ? "Enter calculation inputs" : "Missing inputs");
        setAge((patientObj !== undefined) ? patientObj.age : age);
    
        function calculateLafarge() {
            let factor = patientObj.sex === "M" ? 11.49 : 17.04;
            setForm({valueType: "VO2 by LaFarge Equation", calculatedValue: (age !== "" && hr !== "") ? (138.1 - (factor * +age) + (0.378 * +hr)).toFixed(3) : "" });
        }
    
        if (patientObj !== undefined) {
            calculateLafarge();
        }
    
    }, [age, hr, patientObj]);

    return (
        <div>
            <h1>VO2 by LaFarge Equation</h1>
            <form onSubmit={e => onSubmit(e, patientObj, form)}>
                <div>
                    Age: <input name="logeage" placeholder="Ex: ?" type="number" value={logeage} onChange={e => setLogeage(e.target.value)} />
                </div>
                <div>
                    Heart Rate (bpm): <input name="hr" placeholder="Ex: ?" type="number" value={hr} onChange={e => setHr(e.target.value)} />
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
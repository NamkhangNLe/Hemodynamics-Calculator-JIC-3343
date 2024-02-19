import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Addition({ patientObj }) {
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [form, setForm] = useState({
        valueType: "Addition",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");
    const [error, setError] = useState(null); // Add an error state

    useEffect(() => {
        try {
            setPlaceholderText((val1 === "" && val2 === "") ? "Enter calculation inputs" : "Missing inputs");
            if (val1 !== "" && val2 !== "") {
                const result = (+val1 + +val2).toFixed(3);
                if (isNaN(result)) {
                    throw new Error("Invalid inputs for addition");
                }
                setForm({ valueType: "Addition", calculatedValue: result });
            } else {
                setForm({ valueType: "Addition", calculatedValue: "" });
            }
        } catch (err) {
            setError(err.message);
        }
    }, [val1, val2]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Addition of Values</h1>
            <form onSubmit={e => onSubmit(e, patientObj, form)}>
                <div>
                    Value 1: <input name="value1" placeholder="Ex: 9.0" type="number" step="1.0" value={val1} onChange={e => setVal1(e.target.value)} />
                </div>
                <div>
                    Value 2: <input name="value2" placeholder="Ex: 10.0" type="number" value={val2} onChange={e => setVal2(e.target.value)} />
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
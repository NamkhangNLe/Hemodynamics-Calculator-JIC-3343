import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function Addition({selectedPatientID}) {
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    // const [calculatedValue, setCalculatedValue] = useState("");
    const [placeholderText, setPlaceholderText] = useState("Enter calculation inputs");
    const [form, setForm] = useState({
        valueType: "Addition",
        calculatedValue: ""
      });

    useEffect(() => {
        setPlaceholderText((val1 === "" && val2 === "") ? "Enter calculation inputs" : "Missing inputs");
        let output = (val1 !== "" && val2 !== "") ? +val1 + +val2 : "";
        // setCalculatedValue(output);
        setForm({valueType: "Addition", calculatedValue: output});
    }, [val1, val2]);

    return (
        <div>
            <h1>Addition of Values</h1>
            <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                <div>
                    Value 1: <input name="value1" type="number" step="1.0" value={val1} onChange={e => setVal1(e.target.value)}/>
                </div>
                <div>
                    Value 2: <input name="value2" type="number" value={val2} onChange={e => setVal2(e.target.value)}/>
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={form.calculatedValue} readOnly/>
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}
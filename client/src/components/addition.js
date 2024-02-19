import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Addition({ patientObj }) {
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const valueType = "Addition";
    const [calculatedValue, setCalculatedValue] = useState("");
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((val1 === "" && val2 === "") ? "Enter calculation inputs" : "Missing inputs");

        if (val1 === "" && val2 === "") {
            setCalculatedValue("");
            return;
        }

        const result = +(+val1 + +val2).toFixed(3);
        setCalculatedValue(result);
    }, [val1, val2]);

    return (
        <div>
            <h1>{valueType}</h1>
            <form onSubmit={e => onSubmit(e, patientObj, { valueType: valueType, calculatedValue: calculatedValue })}>
                <div>
                    Value 1: <input name="value1" placeholder="Ex: 9.0" type="number" step="1.0" value={val1} onChange={e => setVal1(e.target.value)} />
                </div>
                <div>
                    Value 2: <input name="value2" placeholder="Ex: 10.0" type="number" value={val2} onChange={e => setVal2(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}
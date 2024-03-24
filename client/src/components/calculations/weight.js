import React, { useState, useEffect } from "react";
import { onSubmit } from "../../utils/calculationUtils";
import "../../styles/styles.css";

export default function Weight({ patientObj }) {
    const [weight, setWeight] = useState("");
    const valueType = "Weight";
    const [calculatedValue, setCalculatedValue] = useState("");
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((weight === "") ? "Enter calculation inputs" : "Missing inputs");
        setWeight((patientObj !== undefined) ? patientObj.weight : weight);

        if (weight === "") {
            setCalculatedValue("");
            return;
        }

        const result = +(+weight * 3).toFixed(3);
        setCalculatedValue(result);
    }, [weight, patientObj]);

    return (
        <div>
            <h1>{valueType}</h1>
            <form onSubmit={e => onSubmit(e, patientObj, { valueType: valueType, calculatedValue: calculatedValue })}>
                <div>
                    Weight (kg): <input name="weight" placeholder="Ex: 120 lbs" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> ml/min/m<sup>2</sup>
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}
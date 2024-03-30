import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Weight({ patientObj, updateCalculatedValue }) {
    const [weight, setWeight] = useState("");

    const valueType = "VO2 by Weight";
    const valueCode = "VO2W";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((weight === "") ? "Enter calculation inputs" : "Missing inputs");
        setWeight((patientObj !== undefined) ? patientObj.weight : weight);

        if (weight === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +(+weight * 3).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [weight, patientObj]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div>
                    Weight (kg): <input name="weight" placeholder="Ex: 120 lbs" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> ml/min/m<sup>2</sup>
                </div>
            </form>
        </div>
    );
}
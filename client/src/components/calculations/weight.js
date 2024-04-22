import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Weight({ updateCalculatedValue, weight, setWeight }) {
    const valueType = "VO2 by Weight";
    const valueCode = "VO2W";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((weight === "") ? "Enter calculation inputs" : "Missing inputs");

        if (weight === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +(+weight * 3).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [weight]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Weight (kg):</span>
                    <input name="weight" placeholder="Ex: 120" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Output:</span>
                    <div>
                        <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
                        <span> ml/min/m<sup>2</sup></span>
                    </div>
                </div>
            </form>
        </div>
    );
}
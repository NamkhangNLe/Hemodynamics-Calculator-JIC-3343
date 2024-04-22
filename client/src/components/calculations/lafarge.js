import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function LaFarge({ updateCalculatedValue, sex, age, hr, setAge, setHr }) {
    const valueType = "VO2 by LaFarge Equation";
    const valueCode = "VO2L";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((age === "" && hr === "") ? "Enter calculation inputs" : "Missing inputs");

        function calculateLafarge() {
            let factor = sex === "M" ? 11.49 : 17.04;

            if (age === "" || hr === "") {
                setCalculatedValue("");
                updateCalculatedValue(valueCode, "");
                return;
            }

            const result = +(138.1 - (factor * Math.log(age)) + (0.378 * +hr)).toFixed(3);
            setCalculatedValue(result);
            updateCalculatedValue(valueCode, result);
        }

        if (sex !== "") {
            calculateLafarge();
        }

    }, [sex, age, hr]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Age (Years):</span>
                    <input name="age" placeholder="Ex: 21" type="number" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Heart Rate (bpm):</span>
                    <input name="hr" placeholder="Ex: 80" type="number" value={hr} onChange={e => setHr(e.target.value)} />
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
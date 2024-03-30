import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function LaFarge({ patientObj, updateCalculatedValue }) {
    const [age, setAge] = useState("");
    const [hr, setHr] = useState("");

    const valueType = "VO2 by LaFarge Equation";
    const valueCode = "VO2L";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((age === "" && hr === "") ? "Enter calculation inputs" : "Missing inputs");
        setAge((patientObj !== undefined) ? patientObj.age : age);

        function calculateLafarge() {
            let factor = patientObj.sex === "M" ? 11.49 : 17.04;

            if (age === "" || hr === "") {
                setCalculatedValue("");
                updateCalculatedValue(valueCode, "");
                return;
            }

            const result = +(138.1 - (factor * +age) + (0.378 * +hr)).toFixed(3);
            setCalculatedValue(result);
            updateCalculatedValue(valueCode, result);
        }

        if (patientObj !== undefined) {
            calculateLafarge();
        }

    }, [age, hr, patientObj]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div>
                    Age: <input name="age" placeholder="Ex: ?" type="number" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div>
                    Heart Rate (bpm): <input name="hr" placeholder="Ex: ?" type="number" value={hr} onChange={e => setHr(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> ml/min/m<sup>2</sup>
                </div>
            </form>
        </div>
    );
}
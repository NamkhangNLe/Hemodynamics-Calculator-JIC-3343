import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function CardiacIndex({ patientObj, updateCalculatedValue }) {
    const [co, setco] = useState("");
    const [bsa, setbsa] = useState("");

    const valueType = "Cardiac Index";
    const valueCode = "CI";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((co === "" && bsa === "") ? "Enter calculation inputs" : "Missing inputs");
        setbsa((patientObj !== undefined) ? patientObj.bsa : bsa)

        if (co === "" || bsa === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +(+co / +bsa).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [co, bsa]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div>
                    Cardiac Output (L/min): <input name="CO" placeholder="Ex: 5.2" type="number" value={co} onChange={e => setco(e.target.value)} />
                </div>
                <div>
                    Body Surface Area (m<sup>2</sup>): <input name="BSA" placeholder="Ex: 1.9" type="number" value={bsa} onChange={e => setbsa(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
                </div>
            </form>
        </div>
    );
}
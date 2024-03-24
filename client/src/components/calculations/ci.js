import React, { useState, useEffect } from "react";
import { onSubmit } from "../../utils/calculationUtils";
import "../../styles/styles.css";

export default function CardiacIndex({ patientObj }) {
    const [co, setco] = useState("");
    const [bsa, setbsa] = useState("");
    const valueType = "Cardiac Index";
    const [calculatedValue, setCalculatedValue] = useState("");
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((co === "" && bsa === "") ? "Enter calculation inputs" : "Missing inputs");
        setbsa((patientObj !== undefined) ? patientObj.bsa : bsa)

        if (co === "" || bsa === "") {
            setCalculatedValue("");
            return;
        }

        const result = +(+co / +bsa).toFixed(3);
        setCalculatedValue(result);
    }, [co, bsa]);

    return (
        <div>
            <h1>{valueType}</h1>
            <form onSubmit={e => onSubmit(e, patientObj, { valueType: valueType, calculatedValue: calculatedValue })}>
                <div>
                    Cardiac Output (L/min): <input name="CO" placeholder="Ex: 4.3 L/min" type="number" value={co} onChange={e => setco(e.target.value)} />
                </div>
                <div>
                    Body Surface Area (m<sup>2</sup>): <input name="BSA" placeholder="Ex: 1.9 m2" type="number" value={bsa} onChange={e => setbsa(e.target.value)} />
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
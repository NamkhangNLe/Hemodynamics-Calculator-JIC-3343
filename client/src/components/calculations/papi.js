import React, { useState, useEffect } from "react";
import { onSubmit } from "../../utils/calculationUtils";
import "../../styles/styles.css";

export default function Papi({ patientObj }) {
    const [pasp, setPasp] = useState("");
    const [padp, setPadp] = useState("");
    const [ra, setRa] = useState("");
    const valueType = "Pulmonary Artery Pulsatility Index";
    const [calculatedValue, setCalculatedValue] = useState("");
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((pasp === "" && padp === "" && ra === "") ? "Enter calculation inputs" : "Missing inputs");

        if (pasp === "" || padp === "" || ra === "") {
            setCalculatedValue("");
            return;
        }

        const result = +((+pasp - +padp) / +ra).toFixed(3);
        setCalculatedValue(result);
    }, [pasp, padp, ra]);

    return (
        <div>
            <h1>{valueType}</h1>
            <form onSubmit={e => onSubmit(e, patientObj, { valueType: valueType, calculatedValue: calculatedValue })}>
                <div>
                    Pulmonary Artery Systolic Pressure (mmHg): <input name="PASP" placeholder="Ex: 21 mmHg" type="number" value={pasp} onChange={e => setPasp(e.target.value)} />
                </div>
                <div>
                    Pulmonary Artery Diastolic Pressure (mmHg): <input name="PADP" placeholder="Ex: 10 mmHg" type="number" value={padp} onChange={e => setPadp(e.target.value)} />
                </div>
                <div>
                    Right Atrial Pressure (mmHg): <input name="RA" type="number" placeholder="Ex: 9 IU/mL" value={ra} onChange={e => setRa(e.target.value)} />
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
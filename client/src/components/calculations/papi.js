import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Papi({ updateCalculatedValue, pasp, padp, ra, setPasp, setPadp, setRa }) {
    const valueType = "Pulmonary Artery Pulsatility Index";
    const valueCode = "PAPI";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((pasp === "" && padp === "" && ra === "") ? "Enter calculation inputs" : "Missing inputs");

        if (pasp === "" || padp === "" || ra === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +((+pasp - +padp) / +ra).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [pasp, padp, ra]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Pulmonary Artery Systolic Pressure (mmHg):</span>
                    <input name="PASP" placeholder="Ex: 21" type="number" value={pasp} onChange={e => setPasp(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Pulmonary Artery Diastolic Pressure (mmHg):</span>
                    <input name="PADP" placeholder="Ex: 10" type="number" value={padp} onChange={e => setPadp(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Right Atrial Pressure (mmHg):</span>
                    <input name="RA" type="number" placeholder="Ex: 9" value={ra} onChange={e => setRa(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Output:</span>
                    <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
                </div>
            </form>
        </div>
    );
}
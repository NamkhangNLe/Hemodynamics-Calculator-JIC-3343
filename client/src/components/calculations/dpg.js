import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Dpg({ updateCalculatedValue, padp, pcwp, setPadp, setPcwp }) {
    const valueType = "Diastolic Pulmonary Gradient";
    const valueCode = "DPG";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((padp === "" && pcwp === "") ? "Enter calculation inputs" : "Missing inputs");

        if (padp === "" || pcwp === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +(+padp - +pcwp).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [padp, pcwp]);

    return (
    <div>
        <form>
            <h2>{valueType}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Diastolic Pulmonary Artery Pressure (mmHg):</span>
                <input name="padp" placeholder="Ex: 12" type="number" value={padp} onChange={e => setPadp(e.target.value)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Pulmonary Capillary Wedge Pressure (mmHg):</span>
                <input name="pcwp" placeholder="Ex: 5" type="number" value={pcwp} onChange={e => setPcwp(e.target.value)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Output:</span>
                <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
            </div>
        </form>
    </div>
);
}
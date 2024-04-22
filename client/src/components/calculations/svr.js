import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Svr({ updateCalculatedValue, map, cvp, co, setMap, setCvp, setCo }) {
    const valueType = "Systemic Vascular Resistance";
    const valueCode = "SVR";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((map === "" && cvp === "" && co === "") ? "Enter calculation inputs" : "Missing inputs");

        if (map === "" || cvp === "" || co === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +((+map - +cvp) / +co).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [map, cvp, co]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Mean Arterial Pressure (mmHg):</span>
                    <input name="MPA" placeholder="Ex: 68" type="number" value={map} onChange={e => setMap(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Central Venous Pressure (mmHg):</span>
                    <input name="CVP" placeholder="Ex: 12" type="number" value={cvp} onChange={e => setCvp(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Cardiac Output (L/min):</span>
                    <input name="CO" placeholder="Ex: 4.3" type="number" value={co} onChange={e => setCo(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Output:</span>
                    <div>
                        <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
                        <span> dynes/seconds/cm<sup>-5</sup></span>
                    </div>
                </div>
            </form>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Tpg({ updateCalculatedValue, map, pcwp, setMap, setPcwp }) {
    const valueType = "Transpulmonary Gradient";
    const valueCode = "TPG";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((map === "" && pcwp === "") ? "Enter calculation inputs" : "Missing inputs");

        if (map === "" || pcwp === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +(+map - +pcwp).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [map, pcwp]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Mean Arterial Pressure (mmHg):</span>
                    <input name="MPA" placeholder="Ex: 72" type="number" value={map} onChange={e => setMap(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Pulmonary Capillary Wedge Pressure (mmHg):</span>
                    <input name="CVP" placeholder="Ex: 8" type="number" value={pcwp} onChange={e => setPcwp(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Output:</span>
                    <div>
                        <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
                        <span> mmHg</span>
                    </div>
                </div>
            </form>
        </div>
    );
}
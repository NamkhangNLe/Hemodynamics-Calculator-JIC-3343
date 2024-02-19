import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function TranspulGradient({ patientObj }) {
    const [map, setMap] = useState("");
    const [pcwp, setPcwp] = useState("");
    const valueType = "Transpulmonary Gradient";
    const [calculatedValue, setCalculatedValue] = useState("");
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((map === "" && pcwp === "") ? "Enter calculation inputs" : "Missing inputs");

        if (map === "" || pcwp === "") {
            setCalculatedValue("");
            return;
        }

        const result = +(+map - +pcwp).toFixed(3);
        setCalculatedValue(result);
    }, [map, pcwp]);

    return (
        <div>
            <h1>{valueType}</h1>
            <form onSubmit={e => onSubmit(e, patientObj, { valueType: valueType, calculatedValue: calculatedValue })}>
                <div>
                    Mean Arterial Pressure (mmHg): <input name="MPA" placeholder="Ex: 72 mmHg" type="number" value={map} onChange={e => setMap(e.target.value)} />
                </div>
                <div>
                    Pulmonary Capillary Wedge Pressure (mmHg): <input name="CVP" placeholder="Ex: 8 mmHg" type="number" value={pcwp} onChange={e => setPcwp(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> mmHg
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}
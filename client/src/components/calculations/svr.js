import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Svr({ updateCalculatedValue }) {
    const [map, setMap] = useState("");
    const [cvp, setCvp] = useState("");
    const [co, setCo] = useState("");

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
                <div>
                    Mean Arterial Pressure (mmHg): <input name="MPA" placeholder="Ex: 68 mmHg" type="number" value={map} onChange={e => setMap(e.target.value)} />
                </div>
                <div>
                    Central Venous Pressure (mmHg): <input name="CVP" placeholder="Ex: 12 mmHg" type="number" value={cvp} onChange={e => setCvp(e.target.value)} />
                </div>
                <div>
                    Cardiac Output (L/min): <input name="CO" placeholder="Ex: 4.3 L/min" type="number" value={co} onChange={e => setCo(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> dynes/seconds/cm<sup>-5</sup>
                </div>
            </form>
        </div>
    );
}
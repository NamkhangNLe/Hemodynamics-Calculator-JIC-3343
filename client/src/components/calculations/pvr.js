import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Pvr({ updateCalculatedValue }) {
    const [pap, setPap] = useState("");
    const [wedge, setWedge] = useState("");
    const [co, setCo] = useState("");

    const valueType = "Pulmonary Vascular Resistance";
    const valueCode = "PVR";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((pap === "" && wedge === "" && co === "") ? "Enter calculation inputs" : "Missing inputs");

        if (pap === "" || wedge === "" || co === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +((+pap - +wedge) / +co).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [pap, wedge, co]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div>
                    Pulmonary Arterial Pressure (mmHg): <input name="PAP" placeholder="Ex: 16" type="number" value={pap} onChange={e => setPap(e.target.value)} />
                </div>
                <div>
                    Wedge: <input name="wedge" placeholder="Ex: 6" type="number" value={wedge} onChange={e => setWedge(e.target.value)} />
                </div>
                <div>
                    Cardiac Output (L/min): <input name="CO" placeholder="Ex: 4.1" type="number" value={co} onChange={e => setCo(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> dynes/seconds/cm<sup>-5</sup>
                </div>
            </form>
        </div>
    );
}
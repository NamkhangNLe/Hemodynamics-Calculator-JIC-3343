import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Dpg({ updateCalculatedValue }) {
    const [padp, setPadp] = useState("");
    const [pcwp, setPcwp] = useState("");

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
                <div>
                    Diastolic Pulmonary Artery Pressure (mmHg): <input name="padp" placeholder="Ex: 12" type="number" value={padp} onChange={e => setPadp(e.target.value)} />

                </div>
                <div>
                    Pulmonary Capillary Wedge Pressure (mmHg): <input name="pcwp" placeholder="Ex: 5" type="number" value={pcwp} onChange={e => setPcwp(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> mmHg
                </div>
            </form>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { onSubmit } from "../../utils/calculationUtils";
import "../../styles/styles.css";

export default function Dpg({ patientObj }) {
    const [padp, setPadp] = useState("");
    const [pcwp, setPcwp] = useState("");
    const valueType = "Diastolic Pulmonary Gradient";
    const [calculatedValue, setCalculatedValue] = useState("");
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((padp === "" && pcwp === "") ? "Enter calculation inputs" : "Missing inputs");

        if (padp === "" || pcwp === "") {
            setCalculatedValue("");
            return;
        }

        const result = +(+padp - +pcwp).toFixed(3);
        setCalculatedValue(result);
    }, [padp, pcwp]);

    return (
        <div>
            <h1>{valueType}</h1>
            <form onSubmit={e => onSubmit(e, patientObj, { valueType: valueType, calculatedValue: calculatedValue })}>
                <div>
                    Diastolic Pulmonary Artery Pressure (mmHg): <input name="padp" type="number" value={padp} onChange={e => setPadp(e.target.value)} />

                </div>
                <div>
                    Pulmonary Capillary Wedge Pressure (mmHg): <input name="pcwp" type="number" value={pcwp} onChange={e => setPcwp(e.target.value)} />
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
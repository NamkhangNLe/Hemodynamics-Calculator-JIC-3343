import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function TranspulGradient({ patientObj }) {
    const [map, setMap] = useState("");
    const [pcwp, setPcwp] = useState("");
    const [form, setForm] = useState({
        valueType: "Transpulmonary Gradient",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((map === "" && pcwp === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({ valueType: "Transpulmonary Gradient", calculatedValue: (map !== "" && pcwp !== "") ? (+map - +pcwp).toFixed(3) : "" });
    }, [map, pcwp]);

    return (
        <div>
            <h1>Transpulmonary Gradient</h1>
            <form onSubmit={e => onSubmit(e, patientObj, form)}>
                <div>
                    Mean Arterial Pressure (mmHg): <input name="MPA" placeholder="Ex: 72 mmHg" type="number" value={map} onChange={e => setMap(e.target.value)} />
                </div>
                <div>
                    Pulmonary Capillary Wedge Pressure (mmHg): <input name="CVP" placeholder="Ex: 8 mmHg"type="number" value={pcwp} onChange={e => setPcwp(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={form.calculatedValue} readOnly /> mmHg
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}
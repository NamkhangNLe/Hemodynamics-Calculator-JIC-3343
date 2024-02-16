import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css";

export default function Dpg({ patientObj }) {
    const [padp, setPadp] = useState("");
    const [pcwp, setPcwp] = useState("");
    const [form, setForm] = useState({
        valueType: "Diastolic Pulmonary Gradient",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((padp === "" && pcwp === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({ valueType: "Transpulmonary Gradient", calculatedValue: (padp !== "" && pcwp !== "") ? (+padp - +pcwp).toFixed(3) : "" });
    }, [padp, pcwp]);

    return (
        <div>
            <h1>Transpulmonary Gradient</h1>
            <form onSubmit={e => onSubmit(e, patientObj, form)}>
                <div>
                    Diastolic Pulmonary Artery Pressure (mmHg): <input name="padp" type="number" value={padp} onChange={e => setPadp(e.target.value)} />
                    
                </div>
                <div>
                    Pulmonary Capillary Wedge Pressure (mmHg): <input name="pcwp" type="number" value={pcwp} onChange={e => setPcwp(e.target.value)} />
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
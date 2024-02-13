import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function CardiacIndex({selectedPatientID}) {
    const [co, setco] = useState("");
    const [bsa, setbsa] = useState("");
    const [form, setForm] = useState({
        valueType: "Cardiac Index",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((co === "" && bsa === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({valueType: "Cardiac Index", calculatedValue: (co !== "" && bsa !== "") ? (+co / +bsa).toFixed(3) : ""});
    }, [co, bsa]);

    return (
        <div>
                <h1>Cardiac Index</h1>
                <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                    <div>
                        CO: <input name="CO" type="number" value={co} onChange={e => setco(e.target.value)}/>
                    </div>
                    <div>
                        BSA: <input name="BSA" type="number" value={bsa} onChange={e => setbsa(e.target.value)}/>
                    </div>
                    <div>
                        Output: <input type="text" placeholder={placeholderText} value={form.calculatedValue} readOnly/>
                    </div>
                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>
        </div>
    );
   }
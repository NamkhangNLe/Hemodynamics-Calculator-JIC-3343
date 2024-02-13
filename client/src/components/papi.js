import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function Papi({selectedPatientID}) {
    const [pasp, setPasp] = useState();
    const [padp, setPadp] = useState();
    const [ra, setRa] = useState();
    const [form, setForm] = useState({
        valueType: "Pulmonary Artery Pulsatility Index",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "Pulmonary Artery Pulsatility Index", calculatedValue: (Number(pasp) - Number(padp)) / Number(ra)});
    }

    return (
        <div>
                <h1>Pulmonary Artery Pulsatility Index</h1>
                <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                    <div>
                        PASP: <input name="PASP" type="number" value={pasp} onChange={e => setPasp(e.target.value)}/>
                    </div>
                    <div>
                        PADP: <input name="PADP" type="number" value={padp} onChange={e => setPadp(e.target.value)}/>
                    </div>
                    <div>
                        RA: <input name="RA" type="number" value={ra} onChange={e => setRa(e.target.value)}/>
                    </div>
                    <div>
                        Output: <input type="text" value={form.calculatedValue} readOnly/>
                    </div>
                    <div>
                        <button onClick={handleClick}>Calculate</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
        </div>
    );
   }
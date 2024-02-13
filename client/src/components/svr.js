import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function Svr({selectedPatientID}) {
    const [map, setMap] = useState();
    const [cvp, setCvp] = useState();
    const [co, setCo] = useState();
    const [form, setForm] = useState({
        valueType: "Systemic Vascular Resistance",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "Systemic Vascular Resistance", calculatedValue: (Number(map) - Number(cvp)) / Number(co)});
    }

    return (
        <div>
                <h1>Systemic Vasuclar Resistance</h1>
                <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                    <div>
                        MAP: <input name="MPA" type="number" value={map} onChange={e => setMap(e.target.value)}/>
                    </div>
                    <div>
                        CVP: <input name="CVP" type="number" value={cvp} onChange={e => setCvp(e.target.value)}/>
                    </div>
                    <div>
                        CO: <input name="CO" type="number" value={co} onChange={e => setCo(e.target.value)}/>
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
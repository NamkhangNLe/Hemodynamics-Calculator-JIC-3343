import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function TranspulGradient({selectedPatientID}) {
    const [map, setMap] = useState();
    const [pcwp, setPcwp] = useState();
    const [form, setForm] = useState({
        valueType: "Transpulmonary Gradient",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "Transpulmonary Gradient", calculatedValue: Number(map) - Number(pcwp)});
    }

    return (
        <div>
                <h1>Transpulmonary Gradient</h1>
                <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                    <div>
                        MAP: <input name="MPA" type="number" value={map} onChange={e => setMap(e.target.value)}/>
                    </div>
                    <div>
                        PCWP: <input name="CVP" type="number" value={pcwp} onChange={e => setPcwp(e.target.value)}/>
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
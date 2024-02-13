import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function Fick({selectedPatientID}) {
    const [vo2, setVo2] = useState();
    const [hb, setHb] = useState();
    const [satA, setSatA] = useState();
    const [satMV, setSatMV] = useState();
    const [form, setForm] = useState({
        valueType: "Fick Cardiac Output",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "Fick Cardiac Output", calculatedValue: Number(vo2) / (Number(hb) * 13.6 * (Number(satA) - Number(satMV)))});
    }

    return (
        <div>
                <h1>Fick Cardiac Output</h1>
                <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                    <div>
                        VO2: <input name="VO2" type="number" value={vo2} onChange={e => setVo2(e.target.value)}/>
                    </div>
                    <div>
                        Hb: <input name="Hb" type="number" value={hb} onChange={e => setHb(e.target.value)}/>
                    </div>
                    <div>
                        Sat A: <input name="Sat A" type="number" value={satA} onChange={e => setSatA(e.target.value)}/>
                    </div>
                    <div>
                        Sat MV: <input name="Sat MV" type="number" value={satMV} onChange={e => setSatMV(e.target.value)}/>
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
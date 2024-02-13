import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function Fick({selectedPatientID}) {
    const [vo2, setVo2] = useState("");
    const [hb, setHb] = useState("");
    const [satA, setSatA] = useState("");
    const [satMV, setSatMV] = useState("");
    const [form, setForm] = useState({
        valueType: "Fick Cardiac Output",
        calculatedValue: ""
    });
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((vo2 === "" && hb === "" && satA === "" && satMV === "") ? "Enter calculation inputs" : "Missing inputs");
        setForm({valueType: "Fick Cardiac Output", calculatedValue: (vo2 !== "" && hb !== "" && satA !== "" && satMV !== "") ? (+vo2 / (+hb * 13.6 * (+satA - +satMV))).toFixed(3) : ""});
    }, [vo2, hb, satA, satMV]);

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
                        Output: <input type="text" placeholder={placeholderText} value={form.calculatedValue} readOnly/>
                    </div>
                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>
        </div>
    );
   }
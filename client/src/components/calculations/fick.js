import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Fick({ updateCalculatedValue, vo2, hb, satA, satMV, setVo2, setHb, setSatA, setSatMV }) {
    const valueType = "Fick Cardiac Output";
    const valueCode = "CO";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((vo2 === "" && hb === "" && satA === "" && satMV === "") ? "Enter calculation inputs" : "Missing inputs");

        if (vo2 === "" || hb === "" || satA === "" || satMV === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +(+vo2 / (+hb * 13.6 * (+satA - +satMV))).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [vo2, hb, satA, satMV]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>VO<sub>2</sub> (ml/min/m<sup>2</sup>):</span>
                    <input name="VO2" placeholder="Ex: 40" type="number" value={vo2} onChange={e => setVo2(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Hemoglobin (g/dl):</span>
                    <input name="Hb" placeholder="Ex: 18" type="number" value={hb} onChange={e => setHb(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Arterial O<sub>2</sub> Saturation (Percent/100):</span>
                    <input name="Sat A" placeholder="Ex: 0.95" type="number" value={satA} onChange={e => setSatA(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Mixed Venous Saturation (Percent/100):</span>
                    <input name="Sat MV" placeholder="Ex: 0.7" type="number" value={satMV} onChange={e => setSatMV(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Output:</span>
                    <div>
                        <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
                        <span> L/min</span>
                    </div>
                </div>
            </form>
        </div>
    );
}
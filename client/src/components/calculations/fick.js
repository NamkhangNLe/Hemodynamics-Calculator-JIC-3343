import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Fick({ updateCalculatedValue }) {
    const [vo2, setVo2] = useState("");
    const [hb, setHb] = useState("");
    const [satA, setSatA] = useState("");
    const [satMV, setSatMV] = useState("");

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
                <div>
                    VO<sub>2</sub> (ml/min/m<sup>2</sup>): <input name="VO2" placeholder="Ex: 40 mL/kg/min" type="number" value={vo2} onChange={e => setVo2(e.target.value)} />
                </div>
                <div>
                    Hemoglobin (g/dl): <input name="Hb" placeholder="Ex: 18 g/dl" type="number" value={hb} onChange={e => setHb(e.target.value)} />
                </div>
                <div>
                    Arterial O<sub>2</sub> Saturation: <input name="Sat A" placeholder="Ex: ?" type="number" value={satA} onChange={e => setSatA(e.target.value)} />
                </div>
                <div>
                    Mixed Venous Saturation: <input name="Sat MV" placeholder="Ex: ?" type="number" value={satMV} onChange={e => setSatMV(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> L/min
                </div>
            </form>
        </div>
    );
}
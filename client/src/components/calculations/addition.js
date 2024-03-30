import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Addition({ updateCalculatedValue }) {
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");

    const valueType = "Addition";
    const valueCode = "ADD";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((val1 === "" && val2 === "") ? "Enter calculation inputs" : "Missing inputs");

        if (val1 === "" || val2 === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +(+val1 + +val2).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [val1, val2]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div>
                    Value 1: <input name="value1" placeholder="Ex: 9.0" type="number" step="1.0" value={val1} onChange={e => setVal1(e.target.value)} />
                </div>
                <div>
                    Value 2: <input name="value2" placeholder="Ex: 10.0" type="number" value={val2} onChange={e => setVal2(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
                </div>
            </form>
        </div>
    );
}
/**
 * Handles the form submission by sending a POST request to the server to create a new calculation.
 * @param {Event} event The form submission event.
 * @param {String} patientObj The patient object containing the patient_id that the calculation should be associated with.
 * @param {Object} form The form data, which contains the valueType and calculatedValue.
 * @returns {void}
 */
export async function submitOne(event, patientObj, form) {
    event.preventDefault();

    const value = form.calculatedValue;

    if (value === "") {
        messageAnimation("Input(s) are missing.\nCalculation not saved.", "lightpink");
        return;
    }

    if (isNaN(value) || value === +Infinity || value === -Infinity) {
        messageAnimation("Bad output: NaN or \u00B1\u221E.\nCalculation not saved.", "lightpink");
        return;
    }

    if (patientObj === undefined) {
        messageAnimation("Patient was not selected.\nCalculation not saved.", "lightpink");
        return;
    }

    // Create a new object with patient_id and the values from the form state using the spread operator.
    const newCalculation = { selectedPatientID: patientObj._id.toString(), ...form };

    // Send a POST request to the server to create a new calculation record.
    fetch("http://localhost:5000/calculation/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCalculation),
    }).then(messageAnimation("Calculation saved!"));
}

/**
 * Handles the form submission by sending a POST request to the server to create a new calculation.
 * @param {Event} event The form submission event.
 * @param {String} patientObj The patient object containing the patient_id that the calculation should be associated with.
 * @param {Object} calculations An object containing the valueType and calculatedValue of all calculations.
 * @returns {void}
 */
export async function submitAll(event, patientObj, calculations) {
    event.preventDefault();

    if (patientObj === undefined) {
        return null;
    }

    const missingInputs = [];
    const badOutputs = [];

    for (const valueCode in calculations) {
        const calculation = calculations[valueCode];
        const value = calculation.calculatedValue;

        if (value === "") {
            missingInputs.push(valueCode);
            continue;
        }

        if (value === +Infinity || value === -Infinity) {
            badOutputs.push(valueCode);
            continue;
        }

        // Create a new object with patient_id and the values from the form state using the spread operator.
        const newCalculation = {
            selectedPatientID: patientObj._id.toString(),
            medications: patientObj.medications,
            hardware: patientObj.hardware,
            ...calculation
        };

        // Send a POST request to the server to create a new calculation record.
        fetch("http://localhost:5000/calculation/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCalculation),
        });
    }

    const numTotalCalculations = Object.keys(calculations).length;
    const numInvalidCalculations = missingInputs.length + badOutputs.length;
    const numValidCalculations = numTotalCalculations - (numInvalidCalculations);

    return {
        numTotalCalculations: numTotalCalculations,
        numInvalidCalculations: numInvalidCalculations,
        numValidCalculations: numValidCalculations,
        missingInputs: missingInputs,
        badOutputs: badOutputs
    }
}

export function arrString(label, arr) {
    if (arr.length === 0) {
        return "";
    }
    let result = label + ((arr.length !== 1) ? "s" : "") + ": ";
    result += arr.join(", ");

    return result + "\n";
}

export function messageAnimation(text, color) {
    // Create a div element with a fading animation
    const divElement = document.createElement('div');
    divElement.className = "fading-div";
    divElement.style = (color === undefined) ? divElement.style : `background-color: ${color}`;
    divElement.style.transition = 'opacity 1s ease-in-out'; // Set animation transition
    const textElement = document.createElement('span');
    textElement.innerText = text;
    divElement.append(textElement);
    document.body.appendChild(divElement); // Append the div to the body

    // Animate the div to fade in and fade out
    divElement.style.opacity = 1; // Fade in
    setTimeout(() => {
        divElement.style.opacity = 0; // Fade out
        setTimeout(() => {
            divElement.parentNode.removeChild(divElement); // Remove the div from the body
        }, 1000); // Delay removal after animation
    }, 2000); // Delay fade out after 2 seconds
}
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function PatientInfoCards({ patientRecord, patientCalculations, showInitials=true, showMedications=true, showHardware=true}) {


    // ---- HELPER FUNCTIONS ----

    function parseMedication() {
        let medications = [];
        if (patientRecord) {
            if (Array.isArray(patientRecord.medications)) {
                medications = patientRecord.medications.map(medication => <ListGroup.Item>{medication}</ListGroup.Item>);
            } else if (typeof patientRecord.medications === 'string') {
                medications = <ListGroup.Item>{patientRecord.medications}</ListGroup.Item>;
            } else if (typeof patientRecord.medications === 'object') {
                medications = <ListGroup.Item>{JSON.stringify(patientRecord.medications)}</ListGroup.Item>;
            }
        }
        return <ListGroup>{medications}</ListGroup>;
    }

    function parseDeviceInfo(device) {
        let deviceInfo = device.deviceName + " (";
        let parameters = Object.entries(device);
        for (let j = 1; j < parameters.length; j++) {
            let parameterName = parameters[j][0];
            parameterName = parameterName.charAt(0).toUpperCase() + parameterName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');
            let parameterValue = parameters[j][1];
            if (parameterValue === "") {
                parameterValue = "-";
            }
            deviceInfo += parameterName + ": " + parameterValue;
            if (j < parameters.length - 1) {
                deviceInfo += ", ";
            }
        }
        deviceInfo += ")";
        return deviceInfo;
    }

    function parseHardware() {
        let hardware = [];
        if (patientRecord.hardware !== undefined && patientRecord.hardware.length > 0) {
            for (let i = 0; i < patientRecord.hardware.length; i++) {
                let device = patientRecord.hardware[i];
                hardware.push(<ListGroup.Item>{parseDeviceInfo(device)}</ListGroup.Item>);
            }
        }
        return <ListGroup>{hardware}</ListGroup>;
    }

    function mostRecentCalc(valueType) {
        let value = null;
        let date = null;
        if (!patientCalculations) return ({value: value, date: date});
        for (let i = 0; i < patientCalculations.length; i++) {
            if (patientCalculations[i].valueType === valueType) {
                let newValue = patientCalculations[i].calculatedValue;
                let newDate = new Date(patientCalculations[i].date);
                if (date === null || newDate.getTime() > date.getTime()) {
                    value = newValue;
                    date = newDate;
                }
            }
        }
        return {
            value: value,
            date: date
        };
    }

    /**
     * Formats a Date object to get its date as a String
     * @param {Date} date the Date object to parse the date out of
     * @returns formatted date string
     */
    function parseDate(date) {
        let month = (date.getMonth() + 1).toString();
        let dotm = date.getDate().toString();
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        return date.getFullYear() + '-' + (month.length === 1 ? '0' + month : month) + '-' + (dotm.length === 1 ? '0' + dotm : dotm) + ' at ' + hours + ':' + (minutes.length == 1 ? '0' + minutes : minutes);
    }

    // ---- CARD COMPONENTS ----

    function initialsCard() {
        if (!showInitials) return null;
        return (
            <Card className="patient-info-card">
                <Card.Body>
                    <Card.Title>Initials</Card.Title>
                    <Card.Text><b>{patientRecord.initials}</b></Card.Text>
                </Card.Body>
            </Card>
        )
    }

    function medicationsCard() {
        if (!showMedications) return null;
        if (!patientRecord.medications) return null;
        return (
            <Card className="patient-info-card">
                <Card.Body>
                    <Card.Title>Medications</Card.Title>
                    {parseMedication()}
                </Card.Body>
            </Card>
        )
    }

    function hardwareCard() {
        if (!showHardware) return null;
        if (!patientRecord.hardware || patientRecord.hardware.length === 0) return null;
        return (
            <Card className="patient-info-card">
                <Card.Body>
                    <Card.Title>Hardware</Card.Title>
                    {parseHardware()}
                </Card.Body>
            </Card>
        )
    }


    function calculationCard(valueType, units="") {
        let {value, date} = mostRecentCalc(valueType);
        if (value === null) return null;
        return (
            <Card className="patient-info-card">
                <Card.Body>
                    <Card.Title>Most Recent {valueType}</Card.Title>
                    <Card.Text>
                        <b>{value} {units}</b> <br/>
                        <i> Calculated on {parseDate(date)}</i>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    function patientNotesCard() {
        if (!patientRecord.notes) return null;
        return (
            <Card className="patient-info-card">
                <Card.Body>
                    <Card.Title>Patient Notes</Card.Title>
                    <Card.Text>{patientRecord.notes}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    return (
        <div style={{paddingBottom: "1%"}}>
            <div style={{display: "flex", flexDirection: "row"}}>
                <h4>Patient Information</h4>
                <Link style={{marginTop: "-4px"}} className="btn btn-link" to={`/edit/${patientRecord._id}`} title="Edit Patient" state={{sourcePath: `/view/${patientRecord._id}`}}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "1%", flexWrap: "wrap"}}>
                {initialsCard()}
                {medicationsCard()}
                {hardwareCard()}
                {calculationCard("Cardiac Index")}
                {calculationCard("Fick Cardiac Output", "L/min")}
                {patientNotesCard()}
            </div>
        </div>
    )
}

export default PatientInfoCards
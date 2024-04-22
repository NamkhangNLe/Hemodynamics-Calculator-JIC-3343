import { Link, useParams } from 'react-router-dom';
import TrendTableEntry from "./trendTableEntry"
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const IndividualTrends = () => {
    const { id } = useParams();

    //Dropdown
    const navigate = useNavigate();
    const [selectedPatient, setSelectedPatient] = useState();
    const [selectedPatientID, setSelectedPatientID] = useState();
    const [records, setRecords] = useState([]);
    const [patientObj, setPatientObj] = useState();
    const [selectedPatientRecord, setSelectedPatientRecord] = useState();

    const [svr, setSvr] = useState(false);
    const [pvr, setPvr] = useState(false);
    const [transpulGradient, setTranspulGradient] = useState(false);
    const [dpg, setDpg] = useState(false);
    const [papi, setPapi] = useState(false);
    const [ci, setCi] = useState(false);
    const [fick, setFick] = useState(false);
    const [weight, setWeight] = useState(false);
    const [bsa, setBsa] = useState(false);
    const [lafarge, setLafarge] = useState(false);

    const defaultStartDate = "2023-01-01";
    const defaultEndDate = getCurrentDate();

    // State variables for start date and end date
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    function getCurrentDate() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        month = (month < 10) ? '0' + (month) : month;
        let date = now.getDate();
        return `${year}-${month}-${date}`;
    }

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            const active_records = records.filter((record) => record.archived === false);
            setRecords(active_records);
        }

        getRecords();
    }, [records.length]);

    useEffect(() => {
        async function getPatientObj() {
            const response = await fetch(`http://localhost:5000/record/${selectedPatientID}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const patient = await response.json();
            setPatientObj(patient);
        }

        if (selectedPatientID !== undefined) {
            getPatientObj();
        }
    }, [selectedPatientID]);

    /**
     * Renders a list of checkboxes so that the user can select which trends to display.
     */
    function trendOptions() {
        return (
            <div>
                <form className="form">
                    <div>
                        <h3>Individual Trends</h3>
                    </div>
                    <div>
                        <label>
                            Start Date:
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </label>
                        <label>
                            End Date:
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={svr}
                            id="svr"
                            name="trends"
                            onChange={(e) => setSvr(!svr)}
                        />
                        <label htmlFor="svr"> Systemic Vasuclar Resistance </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={pvr}
                            id="pvr"
                            name="trends"
                            onChange={(e) => setPvr(!pvr)}
                        />
                        <label htmlFor="pvr"> Pulmonary Vascular Resistance </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={transpulGradient}
                            id="transpulGradient"
                            name="trends"
                            onChange={(e) => setTranspulGradient(!transpulGradient)}
                        />
                        <label htmlFor="transpulGradient"> Transpulmonary Gradient </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={dpg}
                            id="dpg"
                            name="trends"
                            onChange={(e) => setDpg(!dpg)}
                        />
                        <label htmlFor="dpg"> Diastolic Pulmonary Gradient </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={papi}
                            id="papi"
                            name="trends"
                            onChange={(e) => setPapi(!papi)}
                        />
                        <label htmlFor="papi"> Pulmonary Artery Pulsatility Index </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={ci}
                            id="ci"
                            name="trends"
                            onChange={(e) => setCi(!ci)}
                        />
                        <label htmlFor="ci"> Cardiac Index </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={fick}
                            id="fick"
                            name="trends"
                            onChange={(e) => setFick(!fick)}
                        />
                        <label htmlFor="fick"> Fick Cardiac Output </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={weight}
                            id="weight"
                            name="trends"
                            onChange={(e) => setWeight(!weight)}
                        />
                        <label htmlFor="weight"> VO2 by Weight </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={bsa}
                            id="bsa"
                            name="trends"
                            onChange={(e) => setBsa(!bsa)}
                        />
                        <label htmlFor="bsa"> VO2 by BSA </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={lafarge}
                            id="lafarge"
                            name="trends"
                            onChange={(e) => setLafarge(!lafarge)}
                        />
                        <label htmlFor="lafarge"> VO2 by LaFarge Equation </label>
                    </div>
                </form>
            </div>
        );
    }

    const viewLink = `/view/${id}`;

    const handlePrint = () => {
        window.print();
    }

    async function getRecords() {
        const response = await fetch(`http://localhost:5000/calculation/${id}`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        return response.json();
    }

    function getUniqueDates(calculations) {
        const dates = [];

        for (let calc of calculations) {
            const date = new Date(calc.date);

            if (!dates.includes(date.getTime())) {
                dates.push(date.getTime());
            }
        }

        return dates;
    }

    async function mapTimeToCalculations() {
        let calcsFromDb = await getRecords();

        let calculations = {};

        const uniqueDates = getUniqueDates(calcsFromDb);
        for (let date of uniqueDates) {
            calculations[date] = {};
        }

        for (let calc of calcsFromDb) {
            let time = new Date(calc.date).getTime();
            calculations[time][calc.valueType] = calc.calculatedValue;
        }

        return calculations;
    }

    async function convertCalculationsToCSV() {
        const mapping = await mapTimeToCalculations();
        const csvRows = [];

        const codeToName = {
            SVR: "Systemic Vasuclar Resistance",
            PVR: "Pulmonary Vascular Resistance",
            TPG: "Transpulmonary Gradient",
            DPG: "Diastolic Pulmonary Gradient",
            PAPI: "Pulmonary Artery Pulsatility Index",
            CI: "Cardiac Index",
            CO: "Fick Cardiac Output",
            VO2W: "VO2 by Weight",
            BSA: "VO2 by BSA",
            VO2L: "VO2 by LaFarge Equation"
        };

        // const headers = ["Date", "Time", "SVR", "PVR", "TPG", "DPG", "PAPI", "CI", "CI", "VO2W", "BSA", "VO2L"];
        csvRows.push("Date,Time," + Object.keys(codeToName).join(", "));

        for (let time of Object.keys(mapping)) {
            const calculations = mapping[time];

            const date = new Date(+time);
            const year = date.getFullYear();
            let month = date.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            let day = date.getDate();
            day = day < 10 ? '0' + day : day;
            let hours = date.getHours();
            hours = hours < 10 ? '0' + hours : hours;
            let minutes = date.getMinutes();
            minutes = minutes < 10 ? '0' + minutes : minutes;
            let seconds = date.getSeconds();
            seconds = seconds < 10 ? '0' + seconds : seconds;

            const values = [];

            values.push(`${year}-${month}-${day}`); // YYYY-MM-DD
            values.push(`${hours}:${minutes}:${seconds}`); // HH:MM:SS
            for (let code of Object.keys(codeToName)) {
                let value = calculations[codeToName[code]];
                values.push(code + " " + (value === undefined ? "---" : value));
            }

            csvRows.push(values.join(", "));
        }

        return csvRows.join("\n");
    }

    async function exportToCSV() {
        const blob = new Blob([await convertCalculationsToCSV()], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `calculations_${id}.csv`;
        link.click();
    }

    // DropdownOption object; updates selected patient using initials when clicked
    const PatientDropdownOption = (props) => (

        <Dropdown.Item onClick={() => {
            setSelectedPatient(props.record.initials);
            setSelectedPatientID(props.record._id);
            setSelectedPatientRecord(props.record);
            navigate(`/trends/${props.record._id}`);

        }

        }>{props.record.initials}</Dropdown.Item>
    )

    function patientList() {
        return records.map((record) => {
            return <PatientDropdownOption record={record} />
        }
        );
    }


    return (
        <div>
            <h3>Patient Trends</h3>
                <p className="subheading">View patient trends for selected calculations.</p>
            <div style={{ marginBottom: '10px' }}>
                <DropdownButton id="dropdown-basic-button" title={selectedPatient}>{patientList()}</DropdownButton>
            </div>
            <div>
                <Link to={viewLink}> <button> View Patient Profile</button></Link>
                <button onClick={handlePrint}>Save as PDF</button>
                <button onClick={exportToCSV}>Export to CSV</button>
            </div>

            {trendOptions()}
            <hr />
            {svr && <TrendTableEntry id={id} calculation={"Systemic Vasuclar Resistance"} startDate={startDate} endDate={endDate} />}
            {pvr && <TrendTableEntry id={id} calculation={"Pulmonary Vascular Resistance"} startDate={startDate} endDate={endDate} />}
            {transpulGradient && <TrendTableEntry id={id} calculation={"Transpulmonary Gradient"} startDate={startDate} endDate={endDate} />}
            {dpg && <TrendTableEntry id={id} calculation={"Diastolic Pulmonary Gradient"} startDate={startDate} endDate={endDate} />}
            {papi && <TrendTableEntry id={id} calculation={"Pulmonary Artery Pulsatility Index"} startDate={startDate} endDate={endDate} />}
            {ci && <TrendTableEntry id={id} calculation={"Cardiac Index"} startDate={startDate} endDate={endDate} />}
            {fick && <TrendTableEntry id={id} calculation={"Fick Cardiac Output"} startDate={startDate} endDate={endDate} />}
            {weight && <TrendTableEntry id={id} calculation={"VO2 by Weight"} startDate={startDate} endDate={endDate} />}
            {bsa && <TrendTableEntry id={id} calculation={"VO2 by BSA"} startDate={startDate} endDate={endDate} />}
            {lafarge && <TrendTableEntry id={id} calculation={"VO2 by LaFarge Equation"} startDate={startDate} endDate={endDate} />}
        </div>
    )
}

export default IndividualTrends
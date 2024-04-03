import { Link, useParams } from 'react-router-dom';
import TrendTableEntry from "./trendTableEntry"
import React, { useState } from "react";

const IndividualTrends = () => {
    const { id } = useParams();

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

    // Default start date
    const defaultStartDate = "2023-01-01";
    // Default end date (current date)
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
                        <label for="svr"> Systemic Vasuclar Resistance </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={pvr}
                            id="pvr"
                            name="trends"
                            onChange={(e) => setPvr(!pvr)}
                        />
                        <label for="pvr"> Pulmonary Vascular Resistance </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={transpulGradient}
                            id="transpulGradient"
                            name="trends"
                            onChange={(e) => setTranspulGradient(!transpulGradient)}
                        />
                        <label for="transpulGradient"> Transpulmonary Gradient </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={dpg}
                            id="dpg"
                            name="trends"
                            onChange={(e) => setDpg(!dpg)}
                        />
                        <label for="dpg"> Diastolic Pulmonary Gradient </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={papi}
                            id="papi"
                            name="trends"
                            onChange={(e) => setPapi(!papi)}
                        />
                        <label for="papi"> Pulmonary Artery Pulsatility Index </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={ci}
                            id="ci"
                            name="trends"
                            onChange={(e) => setCi(!ci)}
                        />
                        <label for="ci"> Cardiac Index </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={fick}
                            id="fick"
                            name="trends"
                            onChange={(e) => setFick(!fick)}
                        />
                        <label for="fick"> Fick Cardiac Output </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={weight}
                            id="weight"
                            name="trends"
                            onChange={(e) => setWeight(!weight)}
                        />
                        <label for="weight"> VO2 by Weight </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={bsa}
                            id="bsa"
                            name="trends"
                            onChange={(e) => setBsa(!bsa)}
                        />
                        <label for="bsa"> VO2 by BSA </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={lafarge}
                            id="lafarge"
                            name="trends"
                            onChange={(e) => setLafarge(!lafarge)}
                        />
                        <label for="lafarge"> VO2 by LaFarge Equation </label>
                    </div>
                </form>
            </div>
        );
    }

    const viewLink = `/view/${id}`;

    const handlePrint = () => {
        window.print();
    }


    return (
        <div>
            <div>
                <Link to={viewLink}> <button> View Patient Profile</button></Link>
                <Link to="/trends"> <button> View Other Patient Trends </button></Link>
                <button onClick={handlePrint}>Save as PDF</button>
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
import { Link, useParams } from 'react-router-dom';
import TrendTableEntry from "./trendTableEntry"
import React, { useState } from "react";

const IndividualTrends = () => {
    const { id } = useParams();

    const [addition, setAddition] = useState(true);
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
                        <input
                            type="checkbox"
                            value={addition}
                            id="addition"
                            name="trends"
                            onChange={(e) => setAddition(!addition)}
                            checked={addition}
                        />
                        <label for="addition"> Addition </label>
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

    return (
        <div>
            <div>
                <Link to={viewLink}> <button> View Patient Profile</button></Link>
                <Link to="/trends"> <button> View Other Patient Trends </button></Link>
            </div>

            {trendOptions()}
            <hr />
            {addition && <TrendTableEntry id={id} calculation={"Addition"} />}
            {svr && <TrendTableEntry id={id} calculation={"Systemic Vasuclar Resistance"} />}
            {pvr && <TrendTableEntry id={id} calculation={"Pulmonary Vascular Resistance"} />}
            {transpulGradient && <TrendTableEntry id={id} calculation={"Transpulmonary Gradient"} />}
            {dpg && <TrendTableEntry id={id} calculation={"Diastolic Pulmonary Gradient"} />}
            {papi && <TrendTableEntry id={id} calculation={"Pulmonary Artery Pulsatility Index"} />}
            {ci && <TrendTableEntry id={id} calculation={"Cardiac Index"} />}
            {fick && <TrendTableEntry id={id} calculation={"Fick Cardiac Output"} />}
            {weight && <TrendTableEntry id={id} calculation={"VO2 by Weight"} />}
            {bsa && <TrendTableEntry id={id} calculation={"VO2 by BSA"} />}
            {lafarge && <TrendTableEntry id={id} calculation={"VO2 by LaFarge Equation"} />}
        </div>
    )
}

export default IndividualTrends
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {useNavigate} from 'react-router-dom';

export default function View() {

    const params = useParams();
    const navigate = useNavigate();
    const [patientCalculations, setPatientCalculations] = useState([]);

    useEffect(() => {


      /**
       * Fetches all the calculations from the DB, then
       * filters them by patient ID.
       */
      async function fetchPatientCalculation() {
        const id = params.id.toString();
        const response = await fetch('http://localhost:5000/calculation/');

        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        // Parse server response as JSON. Server grabs all calculations in the DB
        const calculations = await response.json();

        if (!calculations) {
            window.alert(`Record with id ${id} not found`);
            navigate("/");
            return;
        }

        //Filter the calculations by patient id.
        const patientCalculations = calculations.filter(calculation => calculation.patient_id === id);
        setPatientCalculations(patientCalculations);

      }

      fetchPatientCalculation();
      return;
    }, [params.id, navigate]);


    // For front-end team: patientCalculations is a JSON. You can parse it however you want to display it.
    return (
    <div>
        <h3>View Patient</h3>
        <div>
          <h4>Calculation History</h4>

          <ul>
            {patientCalculations.map(calculation => (
              <li key={calculation._id}>
                Date: {calculation.date}, Formula: {calculation.valueType}, Calculated Value: {calculation.calculatedValue}
              </li>
            ))}
          </ul>

        </div>
    </div>
    );
  }

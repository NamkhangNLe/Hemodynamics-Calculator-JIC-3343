import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {useNavigate} from 'react-router-dom';

export default function PatientHistoryView() {

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

    /**
     * Formats a Date object to a String
     * @param {Date} date the Date object
     * @returns formatted date string
     */
    function parseDate(date) {
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    }

    /**
     * Formats a Date object to get it's time as a String
     * @param {Date} date
     * @returns formatted time string
     */
    function parseTime(date) {
      let minutes = date.getMinutes().toString();
      if (minutes.length === 1) {
        minutes = "0" + minutes;
      }
      return date.getHours() + ':' + minutes;
    }

    /**
     * Parses calculations into table rows.
     * @returns formatted Table
     */
    function parseCalculations() {
      return patientCalculations.map(calculation => {
        var data = {
          date: parseDate(new Date(calculation.date)),
          time: parseTime(new Date(calculation.date)),
          formula: calculation.valueType,
          value: calculation.calculatedValue
        }
        return (
          <tr>
            <td>{data.date}</td>
            <td>{data.time}</td>
            <td>{data.formula}</td>
            <td>{data.value}</td>
          </tr>
        );
      });
    }

    function calculationsTable() {
      return (
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Formula</th>
              <th>Calculated Value</th>
            </tr>
          </thead>
          <tbody>
            {parseCalculations()}
          </tbody>
        </table>
      );
    }

    // For front-end team: patientCalculations is a JSON. You can parse it however you want to display it.
    return (
    <div>
        <h3>View Patient</h3>
        <div>
          <h4>Calculation History</h4>
          {calculationsTable()}
        </div>
    </div>
    );
  }

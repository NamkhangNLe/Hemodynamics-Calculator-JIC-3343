import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEye } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import NotesModal from "./notesModal";
const Record = (props) => (
    <tr>
        <td>{props.record.initials}</td>
        <td>{props.record.dob}</td>
        <td>{props.record.sex}</td>
        <td>{props.record.height}</td>
        <td>{props.record.weight}</td>
        <td>{props.record.medications}</td>
        <td>
            <Link className="btn btn-link" title="View Calculation History" to={`/view/${props.record._id}`}>
                <FontAwesomeIcon icon={faEye} />
            </Link> |
            <NotesModal id ={props.record._id} /> |
            <Link className="btn btn-link" title="Edit Patient" to={`/edit/${props.record._id}`}>
                <FontAwesomeIcon icon={faPencilAlt} />
            </Link> |
            <button className="btn btn-link" title = "Archive Patient"
                onClick={() => {
                    props.archiveRecord(props.record);
                    // //CHANGE LATER, because deleteRecord is async, must reload the page after a record is deleted, currently waits 500 ms and then reloads the page
                    sleep(500).then(() => { window.location.reload(); });
                }}
            >
                <FontAwesomeIcon icon={faArchive} />
            </button>
        </td>
    </tr>
);

/**
 * Renders a table of records fetched from the database and provides a method to delete a record.
 * @returns {JSX.Element} The JSX element containing the record table.
 */
export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();
    }, [records.length]);

    async function archiveRecord(record) {
        const archivedPerson = {
            ...record,
            archived: true
        };

        fetch(`http://localhost:5000/update/${record._id}`, {
            method: "PATCH",
            body: JSON.stringify(archivedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    /**
     * Maps out the records into a list of Record components.
     * @returns {JSX.Element[]} An array of JSX elements representing the records.
     */
    function recordList() {
        const activePatients = records.filter((record) => !record.archived);
        return activePatients.map((record) => {
            return (
                <Record
                    record={record}
                    archiveRecord={archiveRecord}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>Patient List</h3>
            <p className="subheading">View, edit, or create all saved patient profiles.</p>
            <Link className="btn btn-primary" to="/create">
                <div className="button-icon" style={{width: "170px"}}>
                    <FontAwesomeIcon icon={faAdd} />
                    Create New Patient
                </div>
            </Link>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Initials</th>
                        <th>Date of Birth</th>
                        <th>Sex</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Medications</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
            <div>
            </div>
        </div>
    );
}

/**
   * Waits an amount of time
   * @param {int} ms - Time in milliseconds
   * @returns
   */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
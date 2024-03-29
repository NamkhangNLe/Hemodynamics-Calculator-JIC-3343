import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Record = (props) => (
    <tr>
        <td>{props.record.initials}</td>
        <td>{props.record.dob}</td>
        <td>{props.record.sex}</td>
        <td>{props.record.height}</td>
        <td>{props.record.weight}</td>
        <td>{props.record.medications}</td>
        <td>
        <Link to={`/view/${props.record._id}`} style={{
                backgroundColor: '#4CAF50', /* Green */
                border: 'none',
                color: 'white',
                padding: '15px 32px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
                borderRadius: '12px', /* Rounded corners */
                transition: '0.3s', /* Transition for hover effect */
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#45a049'} /* Darker green when hovered */
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#4CAF50'} /* Original color when not hovered */
            >View</Link>
            <Link to={`/edit/${props.record._id}`} style={{
                backgroundColor: '#0000FF', /* Blue */
                border: 'none',
                color: 'white',
                padding: '15px 32px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
                borderRadius: '12px', /* Rounded corners */
                transition: '0.3s', /* Transition for hover effect */
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#1C86EE'} /* Darker blue when hovered */
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#0000FF'} /* Original color when not hovered */
            >Edit</Link> |
            <button onClick={() => {
                    props.deleteRecord(props.record._id);
                    //CHANGE LATER, because deleteRecord is async, must reload the page after a record is deleted, currently waits 500 ms and then reloads the page
                    sleep(500).then(() => { window.location.reload(); });
                }} style={{
                backgroundColor: '#FF0000', /* Red */
                border: 'none',
                color: 'white',
                padding: '15px 32px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
                orderRadius: '12px', /* Rounded corners */
                transition: '0.3s', /* Transition for hover effect */
            }} 
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#FF6347'} /* Darker red when hovered */
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#FF0000'} /* Original color when not hovered */
            >Delete
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
        return;
    }, [records.length]);

    /**
     * Deletes a record from the database and updates the state of the records.
     * @param {string} id - The ID of the record to be deleted.
     * @returns {Promise<void>} A promise that resolves when the record is deleted.
     */
    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    /**
     * Maps out the records into a list of Record components.
     * @returns {JSX.Element[]} An array of JSX elements representing the records.
     */
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>Patient List</h3>
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
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to="/create" style={{
                        backgroundColor: '#4CAF50', /* Green */
                        border: 'none',
                        color: 'white',
                        padding: '15px 32px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer'
                    }}>Create New Patient</Link>
                    </li>
                </ul>
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
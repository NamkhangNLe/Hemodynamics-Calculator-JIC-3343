import React, { useEffect, useState } from "react";

const ArchiveRecord = (props) => (
    <tr>
        <td>{props.record.initials}</td>
        <td>{props.record.dob}</td>
        <td>{props.record.sex}</td>
    </tr>
);


function Archive() {

    const [records, setRecords] = useState([]);

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
        * Maps out the records into a list of Record components.
        * @returns {JSX.Element[]} An array of JSX elements representing the records.
        */
    function getArchivedRecords() {
        const archived = records.filter((record) => record.archived == true);
        return archived.map((record) => {
            return (
                <ArchiveRecord
                    record={record}
                />
            );
        });
    }



  return (
    <div>
        <h3>Archived Patients</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
                <tr>
                    <th>Initials</th>
                    <th>Date of Birth</th>
                    <th>Sex</th>
                </tr>
            </thead>
            <tbody>{getArchivedRecords()}</tbody>
        </table>
    </div>
  )
}

export default Archive
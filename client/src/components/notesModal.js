import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';


function NotesModal({ id }) {
    const [show, setShow] = useState(false);
    const [notes, setNotes] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /**
           * Deletes a record from the database and updates the state of the records.
           * @param {string} id - The ID of the record to be deleted.
           * @returns {Promise<void>} A promise that resolves when the record is deleted.
           */
    async function getNotes(id) {
        const response = await fetch(`http://localhost:5000/record/${id}`);
        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const patientRecord = await response.json();
        setNotes(patientRecord.notes);
    }

    getNotes(id);

    return (
        <>

            <button className="btn btn-link" title="View Patient Notes" onClick={handleShow}>
                <FontAwesomeIcon icon={faNoteSticky} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Patient Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {notes}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NotesModal;
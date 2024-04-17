import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DeleteModal({ id }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /**
           * Deletes a record from the database and updates the state of the records.
           * @param {string} id - The ID of the record to be deleted.
           * @returns {Promise<void>} A promise that resolves when the record is deleted.
           */
    async function deleteRecord(id) {
        fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });
    }

    return (
        <>
            <button className="btn btn-link" title="Delete Record" onClick={handleShow}>
                <FontAwesomeIcon icon={faTrash} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Record?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure that you want to delete this record?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        deleteRecord(id);
                        sleep(500).then(() => { window.location.reload(); });
                    }}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

    /**
     * Waits an amount of time
     * @param {int} ms - Time in milliseconds
     * @returns
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default DeleteModal;
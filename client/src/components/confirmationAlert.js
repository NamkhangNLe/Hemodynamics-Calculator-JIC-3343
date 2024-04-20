import React from 'react'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert';

function ConfirmationAlert( {message, variant}) {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <Alert variant={variant} onClose={() => setShow(false)} dismissible fade="true">
                {message}
            </Alert>
        );
    }
}

export default ConfirmationAlert
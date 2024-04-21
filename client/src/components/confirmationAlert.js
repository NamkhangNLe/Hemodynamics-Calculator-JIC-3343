import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';

function ConfirmationAlert({ message, variant }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="confirmationAlert" className={`confirmation ${show ? 'fade-in' : 'fade-out'}`}>
            {show && (
                <Alert variant={variant}>
                    {message}
                </Alert>
            )}
        </div>
    );
}


export default ConfirmationAlert
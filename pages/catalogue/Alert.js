import React from 'react';

function Alert({message, onClose}) {
    if (message == null) {
        return null;
    }

    return (
        <div>
            <strong>Error!</strong> {message}
            <button type="button" onClick={()=>onClose()}>
                <span>&times;</span>
            </button>
        </div>
    )
}

export default Alert;
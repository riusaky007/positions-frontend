import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PositionForm from '../components/PositionForm';
import { createPosition } from '../services/api';

function AddPositionPage() {
    const history = useHistory();
    const [error, setError] = useState('');

    const handleSubmit = async (position) => {
        try {
            await createPosition(position);
            history.push('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Add New Position</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <PositionForm onSubmit={handleSubmit} />
        </div>
    );
}

export default AddPositionPage;
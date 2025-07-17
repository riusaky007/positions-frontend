import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PositionList from '../components/PositionList';
import { getPositions, deletePosition } from '../services/api';

function HomePage() {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadPositions = async () => {
        setLoading(true);
        try {
            const data = await getPositions();
            setPositions(data);
            setError('');
        } catch (err) {
            setError('Failed to load positions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPositions();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this position?')) {
            try {
                const success = await deletePosition(id);
                if (success) {
                    await loadPositions(); // Refresh the list
                } else {
                    setError('Failed to delete position');
                }
            } catch (err) {
                setError('Failed to delete position');
            }
        }
    };

    if (loading) return <div>Loading positions...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Job Positions</h1>
            <Link
                to="/add"
                style={{
                    display: 'inline-block',
                    marginBottom: '20px',
                    padding: '10px 15px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px'
                }}
            >
                Add New Position
            </Link>
            <PositionList positions={positions} onDelete={handleDelete} />
        </div>
    );
}

export default HomePage;
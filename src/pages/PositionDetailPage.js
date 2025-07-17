import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getPosition, deletePosition } from '../services/api';

function PositionDetailPage() {
    const { id } = useParams();
    const history = useHistory();
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPosition = async () => {
            try {
                const data = await getPosition(id);
                if (!data) {
                    setError('Position not found');
                } else {
                    setPosition(data);
                }
            } catch (err) {
                setError('Failed to load position');
            } finally {
                setLoading(false);
            }
        };
        loadPosition();
    }, [id]);

    const handleDelete = async () => {
        try {
            const success = await deletePosition(id);
            if (success) {
                history.push('/');
            } else {
                setError('Failed to delete position');
            }
        } catch (err) {
            setError('Failed to delete position');
        }
    };

    if (loading) return <div>Loading position...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!position) return <div>Position not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{position.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-4">
                    <p className="text-gray-700">
                        <span className="font-semibold text-gray-900">Location:</span> {position.location}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold text-gray-900">Status:</span>
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${position.status === 'Open' ? 'bg-green-100 text-green-800' :
                            position.status === 'Closed' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                            {position.status}
                        </span>
                    </p>
                    <p className="text-gray-700">
                        {/* <span className="font-semibold text-gray-900">Budget:</span>
                        <span className="text-blue-600 font-medium">${position.budget.toLocaleString()}</span> */}
                    </p>
                </div>

                <div className="text-gray-700">
                    <p className="font-semibold text-gray-900 mb-1">Description:</p>
                    <p className="text-gray-700 whitespace-pre-line">{position.description}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 border-t pt-4">
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    Delete
                </button>
                <button
                    onClick={() => history.push('/')}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        </div>
    );
}

export default PositionDetailPage;
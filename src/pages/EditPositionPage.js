import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getPosition, updatePosition } from '../services/api';

function EditPositionPage() {
    const { id } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        status: 'draft',
        recruiterId: 0,
        departmentId: 0,
        budget: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPosition = async () => {
            try {
                const data = await getPosition(id);
                if (data) {
                    setFormData({
                        title: data.title || '',
                        description: data.description || '',
                        location: data.location || '',
                        status: data.status || 'draft',
                        recruiterId: data.recruiterId || 0,
                        departmentId: data.departmentId || 0,
                        budget: data.budget || 0
                    });
                } else {
                    setError('Position not found');
                }
            } catch (err) {
                setError('Failed to load position');
            } finally {
                setLoading(false);
            }
        };
        loadPosition();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.endsWith('Id') || name === 'budget'
                ? Number(value) || 0
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updated = await updatePosition(id, formData);
            if (updated) {
                history.push(`/positions/${id}`);
            } else {
                setError('Failed to update position');
            }
        } catch (err) {
            setError('Failed to update position: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading position data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>Edit Position</h2>

            {error && (
                <div style={{
                    color: 'white',
                    backgroundColor: '#ff4444',
                    padding: '10px',
                    marginBottom: '20px',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            minHeight: '100px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Location *
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Status *
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    >
                        <option value="draft">Draft</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>

                    <button
                        type="button"
                        onClick={() => history.goBack()}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#f0f0f0',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditPositionPage;
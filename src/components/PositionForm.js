import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function PositionForm({ position = {}, onSubmit }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        title: position.title || '',
        description: position.description || '',
        location: position.location || '',
        status: position.status || 'draft',
        recruiterId: position.recruiterId || 1,
        departmentId: position.departmentId || 1,
        budget: position.budget || 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'recruiterId' || name === 'departmentId' || name === 'budget'
                ? Number(value)
                : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="space-y-6">
                {/* Title Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Description Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Location Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Status Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="draft">Draft</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Save
                    </button>
                    <button
                        className="w-full ml-4 md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        onClick={() => history.goBack()}
                    >
                        Back
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PositionForm;
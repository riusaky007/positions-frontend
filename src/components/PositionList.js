import React from 'react';
import { Link } from 'react-router-dom';

function PositionList({ positions, onDelete }) {
    return (
        <div className="container mx-auto px-4 py-8">
            {positions.length === 0 ? (
                <p className="text-gray-600 text-center text-lg">No positions found</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {positions.map((position) => (
                        <li
                            key={position.positionId}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{position.title}</h3>
                                <p className="text-gray-600 mb-4">
                                    {position.location} - <span className={`font-medium ${position.status === 'Open' ? 'text-green-600' :
                                        position.status === 'Closed' ? 'text-red-600' :
                                            'text-blue-600'
                                        }`}>
                                        {position.status}
                                    </span>
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        to={`/positions/${position.positionId}`}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        View
                                    </Link>
                                    {/* <Link
                                        to={`/positions/${position.positionId}/edit`}
                                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                                    >
                                        Edit
                                    </Link> */}
                                    <button
                                        onClick={() => onDelete(position.positionId)}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PositionList;
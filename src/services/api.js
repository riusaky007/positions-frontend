// Simulated database
let positions = [
    {
        positionId: 1,
        title: 'Frontend Developer',
        description: 'React experience required',
        location: 'Remote',
        status: 'open',
        recruiterId: 1,
        departmentId: 1,
        budget: 80000
    },
    {
        positionId: 2,
        title: 'Backend Developer',
        description: 'Node.js or .NET experience',
        location: 'New York',
        status: 'open',
        recruiterId: 1,
        departmentId: 2,
        budget: 90000
    }
];

let nextId = 3;

// Helper to simulate async API calls
const simulateApiCall = (data) => new Promise(resolve =>
    setTimeout(() => resolve(data), 300)
);

export const getPositions = () => simulateApiCall([...positions]);

export const getPosition = (id) => {
    const position = positions.find(p => p.positionId === Number(id));
    return simulateApiCall(position ? { ...position } : null);
};

export const createPosition = (position) => {
    const newPosition = { ...position, positionId: nextId++ };
    positions.push(newPosition);
    return simulateApiCall({ ...newPosition });
};

export const updatePosition = (id, position) => {
    const index = positions.findIndex(p => p.positionId === Number(id));
    if (index >= 0) {
        positions[index] = {
            ...positions[index],
            ...position,
            positionId: Number(id)
        };
        return simulateApiCall({ ...positions[index] });
    }
    return simulateApiCall(null);
};

export const deletePosition = (id) => {
    const initialLength = positions.length;
    positions = positions.filter(p => p.positionId !== Number(id));
    return simulateApiCall(initialLength !== positions.length);
};
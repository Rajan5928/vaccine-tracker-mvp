const User = {
    role: String,
    name: String,
    email: String,
    password: String,
    allergies: [String],
    pastVaccinations: [
        {
            vaccineName: String,
            date: Date,
        },
    ],
    medicalHistory: String,
    scheduledVaccinations: [
        {
            vaccineName: String,
            date: Date,
            status: {
                type: String,
                enum: ['scheduled', 'completed', 'overdue'],
                default: 'scheduled',
            },
        },
    ],
    assignedPatients: [String], // Store patient IDs as strings
};

module.exports = User;
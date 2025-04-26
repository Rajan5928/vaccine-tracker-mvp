const { users, vaccinationSubmissions } = require('../config/db'); // Import in-memory data

exports.getDashboard = (req, res) => {
    try {
        const patient = users.find((u) => u._id === req.user.userId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({
            scheduledVaccinations: patient.scheduledVaccinations,
            pastVaccinations: patient.pastVaccinations,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dashboard data', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, allergies, pastVaccinations, medicalHistory } = req.body;
        const patientIndex = users.findIndex((u) => u._id === req.user.userId);
        if (patientIndex === -1) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        users[patientIndex] = {
            ...users[patientIndex],
            name,
            allergies,
            pastVaccinations,
            medicalHistory,
        };
        res.json(users[patientIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};

exports.submitVaccination = async (req, res) => {
    try {
        const { vaccineName } = req.body;
        const newSubmission = {
            _id: String(vaccinationSubmissions.length + 1),
            patient: req.user.userId,
            vaccineName,
            submissionDate: new Date(),
            isVerified: false,
        };
        vaccinationSubmissions.push(newSubmission);
        res.status(201).json({ message: 'Vaccination submission recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit vaccination', error: error.message });
    }
};

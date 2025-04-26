const { users, vaccinationSubmissions } = require('../config/db'); // Import in-memory data

exports.getPatientList = (req, res) => {
    try {
        const patients = users.filter((u) => u.role === 'patient').map(p => {
            const { password, ...patientWithoutPassword } = p; // Remove password
            return patientWithoutPassword;
        });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch patient list', error: error.message });
    }
};

exports.getPatientDetails = (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = users.find((u) => u._id === patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const { password, ...patientWithoutPassword } = patient;  // Remove password
        res.json(patientWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch patient details', error: error.message });
    }
};

exports.scheduleVaccination = async (req, res) => {
    try {
        const patientId = req.params.id;
        const { vaccineName, date } = req.body;
        const patientIndex = users.findIndex((u) => u._id === patientId);
        if (patientIndex === -1) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const newVaccination = {
            vaccineName,
            date,
            status: 'scheduled',
        };
        users[patientIndex].scheduledVaccinations.push(newVaccination);
        res.json(users[patientIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to schedule vaccination', error: error.message });
    }
};

exports.updateVaccinationRecord = (req, res) => {
    try {
        const patientId = req.params.patientId;
        const vaccinationId = req.params.vaccinationId;
        const { status } = req.body;

        const patientIndex = users.findIndex(p => p._id === patientId);
        if (patientIndex === -1) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const vaccinationIndex = users[patientIndex].scheduledVaccinations.findIndex(v => v._id === vaccinationId);
        if (vaccinationIndex === -1) {
            return res.status(404).json({ message: 'Vaccination record not found' });
        }

        users[patientIndex].scheduledVaccinations[vaccinationIndex].status = status;
        res.json(users[patientIndex]);

    } catch (error) {
        res.status(500).json({ message: 'Failed to update vaccination record', error: error.message });
    }
};

exports.verifySubmission = async (req, res) => {
    try {
        const submissionId = req.params.id;
        const submissionIndex = vaccinationSubmissions.findIndex(s => s._id === submissionId);

        if (submissionIndex === -1) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        vaccinationSubmissions[submissionIndex].isVerified = true;

        // Optionally update the patient's pastVaccinations
        const submission = vaccinationSubmissions[submissionIndex];
        const patientId = submission.patient;
        const patientIndex = users.findIndex(p => p._id === patientId);
        if (patientIndex !== -1) {
            users[patientIndex].pastVaccinations.push({
                vaccineName: submission.vaccineName,
                date: new Date()
            });
        }

        res.json({ message: 'Submission verified' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to verify submission', error: error.message });
    }
};

exports.getUnverifiedSubmissions = async (req, res) => {
    try {
        const unverifiedSubmissions = vaccinationSubmissions.filter(s => !s.isVerified);
        //  Include patient name.
        const submissionsWithPatientName = unverifiedSubmissions.map(submission => {
            const patient = users.find(u => u._id === submission.patient);
            return { ...submission, patientName: patient ? patient.name : 'Unknown' };
        });
        res.json(submissionsWithPatientName);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch unverified submissions', error: error.message });
    }
};

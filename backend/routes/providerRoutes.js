const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const {
    authenticate,
    authorize
} = require('../middleware/authMiddleware');

router.use(authenticate);
router.use(authorize(['provider']));

router.get('/patients', providerController.getPatientList);
router.get('/patients/:id', providerController.getPatientDetails);
router.post('/patients/:id/schedule-vaccination', providerController.scheduleVaccination);
router.put('/patients/:patientId/vaccinations/:vaccinationId', providerController.updateVaccinationRecord);
router.put('/submissions/:id/verify', providerController.verifySubmission);
router.get('/submissions/unverified', providerController.getUnverifiedSubmissions);

module.exports = router;
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const {
    authenticate,
    authorize
} = require('../middleware/authMiddleware');

router.use(authenticate);
router.use(authorize(['patient']));

router.get('/dashboard', patientController.getDashboard);
router.put('/profile', patientController.updateProfile);
router.post('/submit-vaccination', patientController.submitVaccination);

module.exports = router;
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const {
    authenticate
} = require('../middleware/authMiddleware');

router.use(authenticate);

router.post('/send', messageController.sendMessage);
router.get('/', messageController.getMessages);

module.exports = router;
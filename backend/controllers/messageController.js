const { messages } = require('../config/db'); // Import in-memory data

exports.sendMessage = (req, res) => {
    try {
        const { recipientId, content } = req.body;
        const senderId = req.user.userId; // Assuming logged-in user is the sender
        const newMessage = {
            _id: String(messages.length + 1), // Add unique ID
            senderId,
            recipientId,
            content,
            timestamp: new Date(),
        };
        messages.push(newMessage);
        res.status(201).json({ message: 'Message sent' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
};

exports.getMessages = (req, res) => {
    try {
        const userId = req.user.userId;
        const userMessages = messages.filter(
            (msg) => msg.senderId === userId || msg.recipientId === userId
        );
        res.json(userMessages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
    }
};

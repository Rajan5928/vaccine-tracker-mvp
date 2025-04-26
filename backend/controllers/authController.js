const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('../config/db'); // Import the in-memory users

const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );
};

exports.register = async (req, res) => {
    try {
        const { role, name, email, password } = req.body;
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            _id: String(users.length + 1), // Simple ID generation
            role,
            name,
            email,
            password: hashedPassword,
        };
        users.push(newUser);
        const token = generateToken(newUser);
        res.status(201).json({ token, userId: newUser._id, role: newUser.role });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find((u) => u.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.json({ token, userId: user._id, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

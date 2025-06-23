const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { failedLoginCounter } = require('../metrics');

exports.register = async (req, res)=>{
    const { username, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "User already exists" });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: {username} });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        failedLoginCounter.inc({ username }); 
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {expiresIn: '1d' });
    res.json({ token });
};
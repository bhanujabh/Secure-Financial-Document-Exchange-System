// routes/admin.js
const router = require('express').Router();
const User = require('../models/User');
const auth = require('../routes/auth');

router.patch('/users/:id/role', auth(['admin']), async (req, res) => {
  const { role } = req.body;

  if (!['admin', 'auditor', 'user'].includes(role))
    return res.status(400).json({ message: 'Invalid role' });

  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = role;
  await user.save();

  res.status(200).json({ message: 'Role updated', user });
});

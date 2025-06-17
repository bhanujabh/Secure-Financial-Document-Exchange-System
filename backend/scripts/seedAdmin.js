// scripts/seedAdmin.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const db = require('../db');

(async () => {
  try {
    await db.sync(); 

    const username = process.env.ADMIN_USERNAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin', 
    });

    console.log('Admin created:', admin.email);
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
})();

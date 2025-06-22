const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const adminRoutes = require('./routes/admin');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/admin', adminRoutes);

try {
    sequelize.sync().then(() => {
        console.log('PostgreSQL database is connected and synced');
    });
    app.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`)
    );
} catch(error){
    console.log('Error encountered while connecting to database', error);
}



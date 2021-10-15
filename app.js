const express = require('express');
const app = express();

const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const connectDatabase = require('./config/database');

// Setup body parser
app.use(express.json());

// Setting up config.env file variables
dotenv.config({ path: './config/config.env' })

// Connecting to databse
connectDatabase();

const projects = require('./routes/projects');

app.use('/api/v1', projects);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
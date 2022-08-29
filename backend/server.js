// const path = require('path');
const express = require("express");
const colors = require('colors');
const routes = require("./routes");
const cors = require("cors")
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const path = require('path');

connectDB();

const server = express();

// server.get("/") //delete if it does not work
server.use(express.json());
// server.use(cors({origin: true}));
server.use(cors());
// const corsOptions = {
//     origin: "http://localhost:3000"
// }

// const corsOptions = {
//     origin: "https://willowy-sunflower-59d1f9.netlify.app"
// }

server.use(express.urlencoded({ extended: true }));
server.use(errorHandler);
server.use(routes);
server.use('/', express.static(path.join(__dirname, '/frontend/build')))
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
server.use('/images', express.static('images'));

module.exports = server;

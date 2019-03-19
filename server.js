const postRoutes = require('./routes/posts');

const express = require('express');

const server = express();

server.use(express.json());

server.use('/api/posts', postRoutes);

server.use('/', (req, res) => res.send('<h2>API up and running!</h2>'));

module.exports = server;

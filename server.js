// server.js
const express = require('express');
const path = require('path');
const app = express();

app.use((request, response, next) => {
	response.set('Access-Control-Allow-Origin', '*');
	response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(express.static(path.join(__dirname, './dist')));

app.use('*', function (request, response) {
	response.sendFile('index.html', { root: path.join(__dirname, './dist') });
});

app.listen(process.env.PORT || 8080);
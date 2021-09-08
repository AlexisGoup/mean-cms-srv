const express = require('express');
const app = express();
const api = require('./api/v1/index');
const cors = require('cors');

const mongoose = require('mongoose');
const connection = mongoose.connection;

app.set('port', (process.env.port || 3000)); // Configuration du Port

app.use(cors());
app.use((req, res, next) => {
	console.log(`Request handled at ${new Date()}`);
	next();
});
app.use('/api/v1', api); // localhost:300/api/v1
app.use((req, res) => {
	const err = new Error('404 - Not Found ');
	err.status = 404;
	res.json({msg : '404 - Not Found', err: err});
});

mongoose.connect('mongodb://localhost:27017/meancms', { useNewUrlParser: true });
connection.on('error', (err) => {
	console.log(`connection to mongoDB failed : ${err}`);
});

connection.once('open', () => {
	console.log('Connected to MongoDB Instance');

	app.listen(app.get('port'), () => {
		console.log(`express server listening on Port ${app.get('port')}`);
	});
});


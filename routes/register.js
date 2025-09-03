
module.exports = app => {
	const router = require('express').Router();
	const controller = require('../controller/auth');

	router.get('/register', controller.getRegister);
	router.post('/register', controller.postRegister);

	router.get('/login', controller.getLogin);
	router.post('/login', controller.postLogin);

	app.use('/', router);
};
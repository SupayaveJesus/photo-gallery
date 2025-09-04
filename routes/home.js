module.exports = app => {
    const router = require('express').Router();
    const controller = require('../controller/home');

    router.get('/', controller.getHome);

    app.use('/', router);
};

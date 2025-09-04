const { checkUser } = require('../middleware/check');

module.exports = app => {
    const router = require('express').Router();
    const controller = require('../controller/home');

    router.get('/' ,checkUser, controller.getHome);

    app.use('/', router);
};

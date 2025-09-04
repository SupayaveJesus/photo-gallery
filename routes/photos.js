
module.exports = app => {
    const router = require('express').Router();
    const photoController = require('../controller/photo');
    const { checkUser } = require('../middleware/check');


    router.get('/upload', checkUser, photoController.getUploadPhoto);
    router.post('/upload', checkUser, photoController.postUploadPhoto);

    app.use('/photos', router);
};
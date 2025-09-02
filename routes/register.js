module.exports = app => {
    const controller = require('../controller/register');

    app.get('/register', controller.getRegister);
    app.post('/register', controller.postRegister);

    app.use()
};
module.exports = app => {
    require('./home')(app);
    require('./register')(app);
    require('./photos')(app);
    require('./album')(app);
};
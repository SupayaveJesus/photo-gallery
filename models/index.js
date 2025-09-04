const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = require('./user')(sequelize);
const Photo = require('./photos')(sequelize);


module.exports = {
  sequelize,
  User,
  Photo
};
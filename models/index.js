const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = require('./user')(sequelize);
const Photo = require('./photos')(sequelize);
const Album = require('./album')(sequelize);

// Asociaciones Sequelize (relaciones)
// Un usuario tiene muchas fotos
User.hasMany(Photo, { foreignKey: 'userId' });
// Una foto pertenece a un usuario
Photo.belongsTo(User, { foreignKey: 'userId' });

// album pertenece a una foto como portada
Album.belongsTo(Photo, {  foreignKey: 'coverId' , as: 'coverPhoto'});

//muchos a muchos entre album y photo
Album.belongsToMany(Photo, {  through: 'AlbumPhoto' , as: 'photos'});
Photo.belongsToMany(Album, {  through: 'AlbumPhoto' , as: 'albums'});

module.exports = {
  sequelize,
  User,
  Photo,
  Album

};
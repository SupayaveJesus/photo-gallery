const albumController = require('../controller/album');

module.exports = (app) => {
    app.get('/albums', albumController.getAlbums);
    app.get('/albums/create', albumController.getCreateAlbum);

    app.post('/albums/create', albumController.postCreateAlbum);

    
};




module.exports = app => {
    const router = require('express').Router();
    const albumController = require('../controller/album');
    const photoController = require('../controller/photo');

    // Rutas para home-album
    router.get('/albums', albumController.getAlbums);
    // Rutas para crear álbum
    router.get('/albums/create', albumController.getCreateAlbum);
    // Ruta para manejar el formulario de creación de álbum
    router.post('/albums/create', albumController.postCreateAlbum);
    // Ruta para ver detalle de álbum
    router.get('/albums/:id', albumController.getAlbumDetails);
    // Ruta para cambiar portada
    router.post('/albums/:id/change-cover', photoController.postChangeCover);
    // Ruta para añadir foto al álbum
    router.post('/albums/:id/add-photo', photoController.addPhotoToAlbum);
    // Ruta para quitar foto del álbum
    router.post('/albums/:id/remove-photo/:photoId', photoController.removePhotoFromAlbum);

    app.use('/', router);
};



module.exports = app => {
    const router = require('express').Router();
    const photoController = require('../controller/photo');
    const { checkUser } = require('../middleware/check');


    router.get('/upload', checkUser, photoController.getUploadPhoto);
    router.post('/upload', checkUser, photoController.postUploadPhoto);

    router.post('/albums/:id/add-photo', checkUser, photoController.addPhotoToAlbum);
    router.post('/albums/:id/remove-photo/:photoId', checkUser, photoController.removePhotoFromAlbum);

    // Vista de detalle de foto
    router.get('/:id', checkUser, photoController.getPhotoDetail);
    // Añadir foto a álbum desde detalle de foto
    router.post('/:id/add-to-album', checkUser, photoController.addPhotoToAlbumFromDetail);
    // Quitar foto de álbum desde detalle de foto
    router.post('/:id/remove-from-album/:albumId', checkUser, photoController.removePhotoFromAlbumFromDetail);
    // Eliminar foto
    router.post('/:id/delete', checkUser, photoController.deletePhoto);

    app.use('/photos', router);
};
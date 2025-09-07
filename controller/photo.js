const path = require('path');
const db = require('../models');

// Vista de detalle de foto
exports.getPhotoDetail = async (req, res) => {
    try {
        const photoId = req.params.id;
        const photo = await db.Photo.findByPk(photoId, {
            include: [{ model: db.Album, as: 'albums' }]
        });
        if (!photo) {
            return res.redirect('/');
        }
        // Obtener todos los álbumes del usuario
        const userAlbums = await db.Album.findAll({ where: { userId: req.session.user.id } });
        res.render('photos/detail', {
            photo,
            albums: photo.albums || [],
            userAlbums,
            userEmail: req.session.user.email,
            userName: req.session.user.name
        });
    } catch (error) {
        console.error('Error al cargar el detalle de la foto:', error);
        res.status(500).send('Error al cargar el detalle de la foto');
    }
};

// Añadir foto a álbum desde detalle de foto
exports.addPhotoToAlbumFromDetail = async (req, res) => {
    try {
        const photoId = req.params.id;
        const albumId = req.body.albumId;
        const photo = await db.Photo.findByPk(photoId);
        if (photo) {
            await photo.addAlbum(albumId);
        }
        res.redirect(`/photos/${photoId}`);
    } catch (error) {
        console.error('Error al añadir foto al álbum:', error);
        res.status(500).send('Error al añadir foto al álbum');
    }
};

// Quitar foto de álbum desde detalle de foto
exports.removePhotoFromAlbumFromDetail = async (req, res) => {
    try {
        const photoId = req.params.id;
        const albumId = req.params.albumId;
        const photo = await db.Photo.findByPk(photoId);
        if (photo) {
            await photo.removeAlbum(albumId);
        }
        res.redirect(`/photos/${photoId}`);
    } catch (error) {
        console.error('Error al quitar foto del álbum:', error);
        res.status(500).send('Error al quitar foto del álbum');
    }
};

// Eliminar foto (y su relación con álbumes)
exports.deletePhoto = async (req, res) => {
    try {
        const photoId = req.params.id;
        const photo = await db.Photo.findByPk(photoId);
        if (photo) {
            await photo.setAlbums([]); // Elimina relaciones
            await photo.destroy();
        }
        res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar la foto:', error);
        res.status(500).send('Error al eliminar la foto');
    }
};



// Subir nueva foto()home.js
exports.getUploadPhoto = (req, res) => {
    res.render('photos/upload', { error: null, userName: req.local.userName, userEmail: req.local.userEmail });
};

exports.postUploadPhoto = async (req, res) => {
    try {
        if (!req.files || !req.files.photo) {
            return res.status(400).send('No se subió ninguna foto');
        }

        const photoFile = req.files.photo;
        const userName = req.session.user.name.replace(/[^a-zA-Z0-9_-]/g, '');
        const extension = path.extname(photoFile.name);
        // Genera un nombre único usando timestamp
        const fileName = `${userName}_${Date.now()}${extension}`;
        const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
        const uploadPath = path.join(uploadsDir, fileName);

        // Verifica y crea la carpeta si no existe
        const fs = require('fs');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        await photoFile.mv(uploadPath);

        await db.Photo.create({
            title: req.body.title,
            fileName: fileName,
            url: '/uploads/' + fileName,
            userId: req.session.user.id
        });

        res.redirect('/');
    } catch (error) {
        console.error('Error al subir la foto:', error);
        res.status(500).send('Error al subir la foto');
    }
};

// Cambiar portada del álbum
exports.postChangeCover = async (req, res) => {
    try {
        const albumId = req.params.id;
        const { coverPhotoId } = req.body;
        await db.Album.update(
            { coverId: coverPhotoId },
            { where: { id: albumId } }
        );
        res.redirect(`/albums/${albumId}`);
    } catch (error) {
        console.error('Error al cambiar la portada:', error);
        res.redirect(`/albums/${req.params.id}`);
    }
};

exports.addPhotoToAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const photoId = req.body.photoId;
        const album = await db.Album.findByPk(albumId);
        if (album) {
            await album.addPhoto(photoId);
        }
        res.redirect(`/albums/${albumId}`);
    } catch (error) {
        console.error('Error al añadir foto al álbum:', error);
        res.status(500).send('Error al añadir foto al álbum');
    }
};
exports.removePhotoFromAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const photoId = req.params.photoId;
    const album = await db.Album.findByPk(albumId);
    if (album) {
      await album.removePhoto(photoId);
    }
    res.redirect(`/albums/${albumId}`);
  } catch (error) {
    console.error('Error al quitar foto del álbum:', error);
    res.status(500).send('Error al quitar foto del álbum');
  }
};

const sha1 = require('sha1');
const db = require('../models');

exports.getLogin = (req, res) => {
    res.render('auth/login', { error: null });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user || user.password_hash !== sha1(password)) {
            res.render('auth/login', { error: 'Email o contraseña incorrectos' });
            return;
        }
        // Guardar usuario en sesión (ajusta según tu sistema de sesiones)
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
};

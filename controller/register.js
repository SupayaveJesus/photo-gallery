const db = require('../models/')
const sha1 = require('sha1');

exports.getRegister = (req, res) => {
    res.render("auth/register", { error: null });
};

exports.postRegister = async (req, res) => {
    const { nombre_completo, email, password } = req.body;
    try {
        const userWithEmail = await db.User.findOne({ where: { email } });
        if (userWithEmail) {
            res.render('auth/register', { error: 'El email ya está en uso' });
            return;
        }
        await db.User.create({
            nombre_completo,
            email,
            password_hash: sha1(password)
        });
        res.redirect("../views/auth/login.ejs");
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error al registrar usuario");
    }
};



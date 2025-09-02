require('dotenv').config()

const express = require('express');
const session = require('express-session');
const db = require('./models');
const bodyParser = require("body-parser");
const registerController = require('./controller/register');

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Bienvenido a la galería de fotos!');
});

app.use(express.urlencoded({ extended: true }));

//configuracion de session
app.use(session({
    secret: 'esta es la clave de encriptación de la sesión y puede ser cualquier texto'
}))

db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});


app.get('/register', registerController.getRegister);
app.post('/register', registerController.postRegister);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
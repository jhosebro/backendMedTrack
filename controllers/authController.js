import db from '../database/connection.js';
const bcrypt = require("bcrypt");
const saltRounds = 10;


const login = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM User WHERE username = ?";

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error al buscar el usuario:", err);
      res.status(500).json({ error: "Error al buscar el usuario" });
      return;
    }

    if (result.length === 0) {
      res.status(401).json({ error: "Usuario no encontrado" });
      return;
    }

    const usuarioEncontrado = result[0];

    bcrypt.compare(password, usuarioEncontrado.password, (error, match) => {
      if (error) {
        console.error("Error al comparar contraseña:", error);
        res.status(500).json({ error: "Error de autenticación" });
        return;
      }

      if (match) {
        res.json({ mensaje: "Inicio de sesión exitoso " });
      } else {
        res.status(401).json({ error: "Contraseña incorrecta" });
      }
    });
  });
};


const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Por favor, completa todos los campos." });
  }

  db.query("SELECT * FROM User WHERE email = ? OR username = ?", [email, username], (err, existingUser) => {
      if(err){
        console.error("Error al buscar el usuario: ", err);
        return res.status({ error: "Error al buscar el usuario"});
      }

      if(existingUser.length > 0){
        return res.status(400).json({
          message: "El correo electrónico o el usuario ya se encuentra registrado"});
      }

      bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
        if(error){
          console.error("Error al generar el hash de la contraseña: ", error);
          return res.status(500).json({ error: "Error al crear el usuario"});
        }

        db.query("INSERT INTO User (username, email, password) VALUES (?, ?, ?)",[username, email, hashedPassword], (insertErr) => {
          if(insertErr){
            console.error("Error al insertar el usuario en la BD", insertErr);
            return res.status(500).json({ error: "Error interno del servidor"});
          }
          return res.status(201).json({ message: "Usuario creado exitosamente" })
      });
    });
  });
}


module.exports = {
  login,
  registerUser,
};

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
/*const corsOptions = {
  origin: "https://localhost:5173"
}*/

app.use(express.json(), cors());


const secretKey = crypto.randomBytes(32).toString("hex");

function authenticationUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado. Inicia Sesión para continuar" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Token invalido. Inicia sesión para continuar" });
    }

    req.user = decoded;
    next();
  });
}

const authController = require("./controllers/authController");

app.post("/api/auth/login", authController.login);
app.post("/api/auth/register", authController.registerUser);


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

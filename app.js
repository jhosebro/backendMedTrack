const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cors = require("cors");
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 3000;

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
const medicamentController = require("./controllers/medicamentController");
const treatmentController = require("./controllers/treatmentController");

app.post("/api/auth/login", authController.login);
app.post("/api/auth/register", authController.registerUser);

app.get("/api/medicaments", medicamentController.getMedicaments);
app.post("/api/medicaments", medicamentController.createMedicament);
app.put("/api/medicaments", medicamentController.updateMedicament);
app.delete("/api/medicaments", medicamentController.deleteMedicament);

app.get("/api/treatments", treatmentController.getTreatment);
app.post("/api/treatments", treatmentController.createTreatment);
app.put("/api/treatments", treatmentController.updateTreatment);
app.delete("/api/treatments", treatmentController.deleteTreatment);

app.get("/", (req, res) => {
  const htmlResponse = `
  <html>
    <body>
      <h1>API REST</h1>
      <h2>MedTrack</h2>
    </body>
  </html>
  `;
  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend-med-track.vercel.app',
      changeOrigin: true,
    })
  );
};
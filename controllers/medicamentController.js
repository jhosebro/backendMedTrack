import db from '../database/connection.js'

const getMedicaments = (req, res) => {
    
    const query = "SELECT * FROM Medicamento";

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error traer los medicamentos", err);
            res.status(500).json({ error: "Error al traer los medicamentos"});
            return;
        }

        if (result.length < 0) {
            res.status(401).json({ error: "No hay medicamentos"});
            return;
        }

        res.json({mensaje: "Medicamentos encontrados"});
    })
}

module.exports = {
    getMedicaments
}
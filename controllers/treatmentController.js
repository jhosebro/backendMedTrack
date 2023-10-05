const db = require('../database/connection.js')

const getTreatment = (req, res) => {
    
    const query = "SELECT * FROM Tratamiento";

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error traer los tratamientos", err);
            res.status(500).json({ error: "Error al traer los tratamientos"});
            return;
        }

        if (result.length < 0) {
            res.status(401).json({ error: "No hay tratamientos"});
            return;
        }

        
        res.json(result)
        
    })
}

const createTreatment = (req, res) => {
    const { idTratamiento, Nombre, fechaIni, fechaFin} = req.body;

    const query = "INSERT INTO Tratamiento (idTratamiento, Nombre, fechaIni, fechaFin) VALUES (?, ?, ?, ?)";
    const values = [idTratamiento, Nombre, fechaIni, fechaFin];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error al crear el tratamiento", err);
            res.status(500).json({ error: "Error al crear el tratamiento" });
            return;
        }
        res.json({ 
            tipo: "success",
            mensaje: "Tratamiento creado exitosamente" });
    });
};

const updateTreatment = (req, res) => {
    const { idTratamiento, Nombre, fechaIni, fechaFin} = req.body;

    const query = "UPDATE Tratamiento SET Nombre = ?, fechaIni = ?, fechaFin = ? WHERE idTratamiento = ?";
    const values = [Nombre, fechaIni, fechaFin, idTratamiento];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error al actualizar el tratamiento", err);
            res.status(500).json({ error: "Error al actualizar el tratamiento" });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "El tratamiento no se encontró" });
            return;
        }

        res.json({ 
            tipo: "success",
            mensaje: "Tratamiento actualizado exitosamente" });
    });
};


const deleteTreatment = (req, res) => {
    const { idTratamiento } = req.body;

    const query = "DELETE FROM Tratamiento WHERE idTratamiento = ?"
    const values = [idTratamiento];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error al eliminar el tratamiento", err);
            res.status(500).json({ error: "Error al eliminar el tratamiento" });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "El tratamiento no se encontró" });
            return;
        }

        res.json({ 
            tipo: "success",
            mensaje: "tratamiento eliminado exitosamente" });
    });
};


module.exports = {
    getTreatment,
    createTreatment,
    updateTreatment,
    deleteTreatment
}
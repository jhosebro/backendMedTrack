const db = require('../database/connection.js')

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

        
        res.json(result)
        
    })
}

const createMedicament = (req, res) => {
    const { idMedicamento, Nombre, Tipo, unidadMedida, Cantidad } = req.body;

    const query = "INSERT INTO Medicamento (idMedicamento, Nombre, Tipo, unidadMedida, Cantidad) VALUES (?, ?, ?, ?, ?)";
    const values = [idMedicamento, Nombre, Tipo, unidadMedida, Cantidad];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error al crear el medicamento", err);
            res.status(500).json({ error: "Error al crear el medicamento" });
            return;
        }
        res.json({ 
            tipo: "success",
            mensaje: "Medicamento creado exitosamente" });
    });
};

const updateMedicament = (req, res) => {
    const { idMedicamento, Nombre, Tipo, unidadMedida, Cantidad } = req.body;

    const query = "UPDATE Medicamento SET Nombre = ?, Tipo = ?, unidadMedida = ?, Cantidad = ? WHERE idMedicamento = ?";
    const values = [Nombre, Tipo, unidadMedida, Cantidad, idMedicamento];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error al actualizar el medicamento", err);
            res.status(500).json({ error: "Error al actualizar el medicamento" });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "El medicamento no se encontró" });
            return;
        }

        res.json({ 
            tipo: "success",
            mensaje: "Medicamento actualizado exitosamente" });
    });
};


const deleteMedicament = (req, res) => {
    const { idMedicamento } = req.params;

    const query = "DELETE FROM Medicamento WHERE idMedicamento = ?"
    const values = [idMedicamento];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error al eliminar el medicamento", err);
            res.status(500).json({ error: "Error al eliminar el medicamento" });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "El medicamento no se encontró" });
            return;
        }

        res.json({ 
            tipo: "success",
            mensaje: "Medicamento eliminado exitosamente" });
    });
};


module.exports = {
    getMedicaments,
    createMedicament,
    updateMedicament,
    deleteMedicament
}
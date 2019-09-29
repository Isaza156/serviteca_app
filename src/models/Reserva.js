const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReservaSchema = new Schema({
    dia: { type: String, required: true },
    mes: { type: String, required: true },
    hora: { type: String, required: true },
    servicio: { type: String, required: true },
    placa: { type: String, required: true },   
    telefono: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
});

module.exports = mongoose.model('Reserva', ReservaSchema)
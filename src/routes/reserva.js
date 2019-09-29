const router = require('express').Router();
const Reserva = require('../models/Reserva');
const { isAuthenticated  } = require('../helpers/auth');

router.get('/reserva/add', isAuthenticated , (req, res) => {
    res.render('reserva/add-reserva');
});

router.post('/reserva/add-reserva', isAuthenticated , async (req, res) => {
    const { dia, mes, hora, servicio, placa, telefono } = req.body;
    const errors = [];
    if (!(dia && mes && hora && servicio && placa && telefono)) {
        errors.push({ text: 'Por favor complete los campos' });
    }
    if (errors.length > 0) {
        res.render('reserva/add-reserva', {
            errors, dia, mes, hora, servicio, placa, telefono
        });
    } else {
        const nuevaReserva = new Reserva({ dia, mes, hora, servicio, placa, telefono })
        nuevaReserva.user = req.user.id;
        await nuevaReserva.save();
        req.flash('success_msg', 'Reserva agregada con éxito');    
        res.redirect('/reserva');
    }
});

router.get('/reserva', isAuthenticated , async (req, res) => {
    const reserva = await Reserva.find({user: req.user.id}).sort({date: 'desc'});
    res.render('reserva/all-reserva', { reserva });
});

router.get('/reserva/edit/:id', isAuthenticated , async (req, res) => {
    const reservas = await Reserva.findById(req.params.id);
    if(reservas.user != req.user.id){
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/reserva');
    }
    res.render('reserva/edit-reserva', { reservas });
});

router.put('/reserva/edit-reserva/:id', isAuthenticated , async (req, res) => {
    const { dia, mes, hora, servicio, placa, telefono } = req.body;
    await Reserva.findByIdAndUpdate(req.params.id, { dia, mes, hora, servicio, placa, telefono });
    req.flash('success_msg', 'Reserva actualizada con éxito');
    res.redirect('/reserva');
});

router.delete('/reserva/delete/:id', isAuthenticated , async (req, res) => {
    await Reserva.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Reserva eliminada con éxito');
    res.redirect('/reserva');
});

module.exports = router;
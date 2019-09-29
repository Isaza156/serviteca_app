const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');


// registrase
router.get('/users/create', (req, res) => {
    res.render('users/create');
});

router.post('/users/create', async (req, res) => {
    let errors = [];
    const { name, email, password, confirm_password } = req.body
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });        
    }
    if(errors.length > 0){
        res.render('users/create', {errors, name, email, password, confirm_password});    
      }  else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'El email ya está en uso');
            res.render('users/create', {errors, name, email, password, confirm_password});
        } else {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Usuario creado con éxito');
            res.redirect('/users/login');
        }
    }
});

// iniciar sesion
router.get('/users/login', (req, res) => {
    res.render('users/login');
});

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/reserva',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Ahora está desconectado');
    res.redirect('/users/login');
});



module.exports = router;
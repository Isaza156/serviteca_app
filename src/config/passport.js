const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
 const user = await User.findOne({email: email});
 if(!user) {
     return done(null, false, { message: 'Usuario no existe' });
 } else {
   const match = await user.matchPassword(password);
     if(match) {
        return done(null, user);
     } else {
         return done (null, false, { message: 'Contraseña Incorrecta'});
     }
 }
}));

//almacenamos en una seccion el usuario en un id para evitar que cada que consulte una pagina le solicite login
passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },    
    date: { type: Date, default: Date.now }
});

// cifrar contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
//comparar contraseña cifrada
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema);
// Conexion a la base de datos  

const mongoose = require('mongoose');

const URL = {
    mongoAtlas: "mongodb+srv://serviteca_app:serviteca123@cluster0-tua9l.mongodb.net/test?retryWrites=true&w=majority"
}

mongoose.connect(URL.mongoAtlas, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

    .then(db => console.log(`DB is connected`))
    .catch(err => console.error(err));
const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
});


module.exports = model('User', UserSchema);
const ctrlHome = {};
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/User');
const User = require('../models/User');

// Devuelve todos los usuarios de la colección
ctrlHome.rutaGet = async (req, res) => {
    const users = await User.find({ activo: true }) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(users);
}

// Controlador que almacena un nuevo usuario
ctrlHome.rutaPost = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const user = new User({titulo, descripcion});
    await user.save() 

    res.json({msg: 'La nota creada correctamente'});
}

// Controlador que actualiza información de los usuarios
ctrlHome.rutaPut = async (req, res) => {
    const { titulo, descripcion, id } = req.body

    const user = await User.findByIdAndUpdate(id, {titulo, descripcion}, { new: true })

    res.json({
        msg: 'Nota actualizada correctamente',
        user
    })
}
// Controlador para eliminar un usuario de la BD físicamente
ctrlHome.rutaDelete = async (req, res) => {
    const { id } = req.body;
    
    try {
        // Ejecución normal del programa
        await User.findByIdAndDelete(id)

        res.json({
            msg: 'Nota eliminada correctamente'
        })
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al eliminar la nota: ', error)
    }
};

// Cambiar el estado activo de un usuario (Eliminación lógica)
ctrlHome.deleteUser = async (req, res) => {
    const { id }  = req.body
    const user = await User.findByIdAndUpdate(id, { activo: false }, { new: true });

    // Respuesta del servidor
    res.json({
        msg: 'Nota Eliminada correctamente',
        user
    });
}




module.exports = ctrlHome;
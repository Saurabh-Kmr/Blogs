const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role: String,
    default: 1
})

export default mongoose.model('Roles',roleSchema)
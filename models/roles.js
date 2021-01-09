/*jshint esversion: 8 */

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role: String
});

export default mongoose.model('Roles',roleSchema);
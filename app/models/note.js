const mongoose = require('mongoose');
const Promise = require('bluebird');

const noteSchema = mongoose.Schema({
    text: String,
    title: String
});

const Note = mongoose.model('Note', noteSchema);
Promise.promisifyAll(Note);

module.exports = {
    Note
};

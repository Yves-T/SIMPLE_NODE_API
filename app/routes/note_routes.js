const express = require('express');
const router = express.Router();
const Note = require('./../models/note').Note;
const logger = require('../../util/logger');
const getNotes = require('./../../util/notesBuilder');

router.post('/reset', (req, res) => {
    Note.remove()
        .then(Note.insertManyAsync(getNotes()))
        .then(() => res.send({ message: 'reset done' }))
        .catch(err => res.send({ 'error': 'An error has occurred' }));
});

router.get('/notes', (req, res) => {
    const id = req.params.id;
    const details = {};
    Note.findAsync().then(items => {
        logger.info('>>>>>>> fetching notes');
        res.send({ items: items });
    })
        .catch(err => res.send({ 'error': 'An error has occurred' }));
});

router.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: id };
    Note.findOneAsync(details)
        .then(item => res.send(item))
        .catch(err => res.send({ 'error': 'An error has occurred' }));
});

router.post('/notes', (req, res) => {
    const note = new Note();
    note.text = req.body.body;
    note.title = req.body.title;

    note.saveAsync()
        .then(result => res.send(result))
        .catch(err => res.send({ 'error': 'An error has occurred' }));
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': id };
    Note.removeAsync({ _id: id })
        .then(() => res.send('Note ' + id + ' deleted!'))
        .catch(err => res.send({ 'error': 'An error has occurred' }));
});

module.exports = router;
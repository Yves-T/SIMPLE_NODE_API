const faker = require('faker');
const getNotes = () => {
    const notes = [];
    let noteCounter = 100;
    while (noteCounter--) {
        notes.push({ title: faker.lorem.sentence(), text: faker.lorem.sentence(20) });
    }
    return notes;
};

module.exports = getNotes;

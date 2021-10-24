const express = require('express');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 3001;


const app = express();

const savedNotes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNewNote(body, notesArray) {
    const createdNotes = body;
    notesArray.push(createdNotes);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return createdNotes;
    //console.log(createdNotes);
}

app.post('/api/notes', (req, res) => {
    const createdNotes = createNewNote(req.body, savedNotes);
    res.json(createdNotes);
})








app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})
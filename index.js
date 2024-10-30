const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

let flashcards = [];
let id = 1;

app.use(cors());
app.use(express.json());

app.post('/flashcards', (req, res) => {
  const { text, color } = req.body;
  const newFlashcard = { id: id++, text, color };
  flashcards.push(newFlashcard);
  res.status(201).json(newFlashcard);
});

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/flashcards', (req, res) => {
  res.json(flashcards);
});

app.get('/flashcards/:id', (req, res) => {
    const id = req.params.id;
    const flashcard = flashcards.find(user => user.id == id);
    res.json(flashcard);
});

app.patch('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { text, color } = req.body;
  const flashcard = flashcards.find((card) => card.id === parseInt(id));
  if (flashcard) {
    flashcard.text = text;
    flashcard.color = color;
    res.json(flashcard);
  } else {
    res.status(404).json({ message: 'Flashcard not found' });
  }
});

app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  flashcards = flashcards.filter((card) => card.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


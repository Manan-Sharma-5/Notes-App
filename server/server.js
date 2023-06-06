const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();

app.use(cors());

app.use(express.json()); 

app.listen(8000, console.log('listening on port 8000'));

const mongoURI = process.env.MONGODBURI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


  const noteSchema = new mongoose.Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: String,
    content: String,
  });

const Note = mongoose.model('Note', noteSchema);

const userScheme = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userScheme);

app.post('/notes', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'Invalid username or password' });
    return;
  }
  
  const { title, content } = req.body;
  const newNote = new Note({ userID: user._id, title, content});
  
  newNote
    .save()
    .then((note) => {
      res.status(201).json(note);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create note' });
    });
});


app.get('/notes', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'Invalid username or password' });
    return;
  }
  
  Note.find({ userID: user._id })
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve notes' });
    });
});


app.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  Note.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error('Error deleting note:', err);
      res.sendStatus(500);
    });
});
 
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username}).exec();
  if(user){
    res.status(500);
    res.json({message: 'User already exists'});
  }
  const newUser = new User({username, password });
  await newUser
    .save()
    .then((user) => {
      res.status(201).json({message: 'User created'});
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create user' });
    });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'Invalid username or password' });
  } else {
    res.json({ message: 'Login successful' });
  }
});

app.patch('/notes/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  Note.findByIdAndUpdate(id, { title, content })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error('Error updating note:', err);
      res.sendStatus(500);
    });
});
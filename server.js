const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors());

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Database connected'))
  .catch((err) => console.log(err));

// User routes
app.use('/api/users', require('./routes/api/User'));
// auth routes
app.use('/api/auth', require('./routes/api/auth'));
// post routes
app.use('/api/posts', require('./routes/api/posts'));
// topic routes
app.use('/api/topics', require('./routes/api/topics'));

// serve static assets
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));

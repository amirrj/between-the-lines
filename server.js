const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
app.use(express.json());

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));

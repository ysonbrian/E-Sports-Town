const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const morgan = requirer('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const masterRouter = require('./routes/masterRouter');
const normalRouter = require('./routes/normalRouter');
const auctionRouter = require('./routes/auctionRouter');
const createNftRouter = require('./routes/createNftRouter');
require('dotenv').config();
const PORT = process.env.PORT || 1234;
// const db = require('./models');

const corsOptions = { origin: 'http://localhost:1234' };

mongoose
  .connect(
    `mongodb+srv://${DB_ID}:${process.env.MONGO_PASSWORD}@cluster0.jo2b1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB connected...'))
  .catch((error) => console.log(error));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// Routes
app.use('/master', masterRouter);
app.use('/normal', normalRouter);
app.use('/auction', auctionRouter);
app.use('/create', createNftRouter);

app.get('/', (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT} `));

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const FileStore = require("session-file-store")(session);

const morgan = require('morgan');
const userRouter = require('./routes/user');
const bucketsRouter = require('./routes/buckets');

// const { urls } = require("./models");

const app = express();
const port = 3001;

app.use(
  session({
    secret: '@halibolisky',
    resave: false,
    saveUninitialized: true,
    // ,store: new FileStore()

    // rebase test용

    // test!!
    // js's test!!
  }),
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

app.use(morgan('dev'));

app.get('/', (req, res) => {
  // test용
  res.status(200).send('Success');
});

app.use('/user', userRouter);
app.use('/buckets', bucketsRouter);

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

module.exports = app;

const express =  require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dbConnection = require('./config/dbConn');
const path = require('path');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middlewares/credentials');
const verifyToken = require('./middlewares/verifyJWT');
require('dotenv/config');
const methodOverride = require('method-override');

//initializing express app;
const app = express();

//database connection
dbConnection(app);


//auth controllers
const publicRoutes = require('./api/public');
const administratorRoutes = require('./api/administrator');

//log streams
const accessLogStream = require('./utilities/accessLogger');
const errorLogStream = require('./utilities/errorLogger');
const customErrorFormartWithMorgan = require('./utilities/customErrorWithMorgan');


//initialising error logger
morgan.token('error', (req, res) => `${req.error} - ${req.error}`);

//default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(cors(corsOptions));
app.use(credentials);

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan(customErrorFormartWithMorgan(), {
  skip: (req, res) => (res.statusCode < 400),
  stream: errorLogStream
}));

//static routes
app.use('/static', express.static(path.join(__dirname, 'public')));

//api routes
app.use('/api/public', publicRoutes);
app.use('/api/administrator', administratorRoutes);

//default route
app.get('*', (req, res) => {
  res.status(404).json({"message": "Not Found!"});
});

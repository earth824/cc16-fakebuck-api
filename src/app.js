require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const limiter = require('./middlewares/rate-limit');
const error = require('./middlewares/error');
const notFound = require('./middlewares/not-found');
const authenticate = require('./middlewares/authenticate');
const authRoute = require('./routes/auth-route');
const userRoute = require('./routes/user-route');
const relationshipRoute = require('./routes/relationship-route.js');
const postRoute = require('./routes/post-route.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(morgan('dev'));
app.use('/public', express.static('public'));

app.use('/auth', authRoute);
app.use('/users', authenticate, userRoute);
app.use('/relationships', authenticate, relationshipRoute);
app.use('/posts', authenticate, postRoute);

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));

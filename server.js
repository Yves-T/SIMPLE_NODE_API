const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./util/logger');
const db = require('./util/db');
const noteRoutes = require('./app/routes/note_routes');
const app = express();
app.use(cors());

const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', noteRoutes);
app.listen(port, () => {
    logger.log('We are live on ' + port);
});

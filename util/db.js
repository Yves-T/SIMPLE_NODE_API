const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const logger = require('../util/logger');

const dbUri = 'mongodb://localhost/myappdatabase';

mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);
mongoose.connect(dbUri, {
    promiseLibrary: require('bluebird'),
    useMongoClient: true,
});

mongoose.connection.on('connected', function () {
    logger.info('Mongoose connected to ' + dbUri);
});

mongoose.connection.on('error', function (err) {
    logger.error(`Mongoose connection error:${err}`);
});

mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose disconnected');
});

const gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        logger.info('info', `Mongoose disconnected through : ${msg}`);
        callback();
    });
};

// used by nodemon
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// emitted on application termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// emitted when heroku shuts down the process
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

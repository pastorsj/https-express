'use strict';

import app from './app';
import http from 'http';
import spdy from 'spdy';
import fs from 'fs';
import yargs from 'yargs';

const argv = yargs.argv;
const type = argv.type;
const portArg = argv.port;

/**
 * Creates a Http server
 * @param {Number} httpPort - The port to listen on
 */
function createHttpServer(httpPort = 3000) {
    const port = normalizePort(process.env.HTTP_PORT || httpPort);
    const server = http.createServer(app);

    app.set('port', port);

    server.listen(port);
    server.on('error', onError.bind(null, port));
    server.on('listening', onListening.bind(null, server));
}

/**
 * Creates a Https/Http2 server
 * @param {Number} httpsPort - The port to listen on
 */
function createHttpsServer(httpsPort = 3001) {
    const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
    const certificate = fs.readFileSync(process.env.CERTIFICATE, 'utf8');
    const credentials = {key: privateKey, cert: certificate};

    const port = normalizePort(process.env.HTTPS_PORT || httpsPort);
    const http2Server = spdy.createServer(credentials, app);

    app.set('httpsPort', port);

    http2Server.listen(port);
    http2Server.on('error', onError.bind(null, port));
    http2Server.on('listening', onListeningHttps.bind(null, http2Server));
}

if (type === 'https') {
    createHttpsServer(portArg);
} else if (type === 'http') {
    createHttpServer(portArg);
} else {
    createHttpServer();
    createHttpsServer();
}

/**
 * Normalize a port into a number, string, or false.
 * @param {String} val - The stringified port
 * @returns {boolean | number} The port or if it does not exist
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 * @param {Object} error - The object containing the error
 * @param {Number} port - The port to listen on
 */
function onError(error, port) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(server) {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Http server listening on ' + bind);
}

function onListeningHttps(httpsServer) {
    var addr = httpsServer.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Https server listening on ' + bind);
}

import * as express from 'express';
import * as fs from 'fs';
import { createServer as createHTTPServer } from 'http';
import { createServer as createHTTPSServer } from 'https';
import * as bodyParser from 'body-parser';
import * as config from 'config';

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(function (_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/', async (_, response) => {
    response.send('Welcome.');
});

// Holds the web server
let server: any;

// Set up the web server with SSL if it exists
const ssl = config?.api?.ssl;
if (ssl) {
    const sslCredentials = {
        key: fs.readFileSync(config.api.ssl.key, 'utf8'),
        cert: fs.readFileSync(config.api.ssl.cert, 'utf8'),
        ca: fs.readFileSync(config.api.ssl.ca, 'utf8')
    };
    server = createHTTPSServer(sslCredentials, app);
} else {
    server = createHTTPServer(app);
}

server.listen(config.port, console.log(`Listening on ${config.port}.`));

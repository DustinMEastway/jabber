import { json } from 'body-parser';
import * as express from 'express';
import { createServer } from 'http';
import * as socketIo from 'socket.io';

import { environment } from 'jabber/environments/environment';
import { getServerRouter } from 'jabber/server/server.router';

const app = express();
const serverPort = (environment.serverPort != null) ? environment.serverPort : 3000;
const appDistDirectory = `${__dirname}/${environment.appDistDirectory}`;
const server = createServer(app);
const io = socketIo(server);

// allow angular app to access the server
const appUrl = `http://${environment.appDomain}` + ((environment.appPort != null) ? `:${environment.appPort}` : '');
if (!environment.production && appUrl) {
	app.use((request, response, next) => {
		response.header('Access-Control-Allow-Origin', appUrl);
		response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

		next();
	});
}

// parse the body of requests as json
app.use(json());

// serve app files
app.use(express.static(appDistDirectory));

// api routes
app.use(getServerRouter(io));

// redirect
app.get('/*', (request, response) => {
	response.sendFile(`${appDistDirectory}/index.html`);
});

server.listen(serverPort, () => {
	// tslint:disable-next-line:no-console
	console.info(`Jabber server is up and running on port ${serverPort}`);
});

import { json } from 'body-parser';
import * as express from 'express';
import { environment } from './environments/environment';
import { serverRouter } from 'jabber/server/server.router';

const app = express();
const serverPort = environment.serverPort ? environment.serverPort : 3000;
const appDistDirectory = environment.appDistDirectory;

// parse the body of requests as json
app.use(json());

// serve app files
app.use(express.static(appDistDirectory));

// api routes
app.use(serverRouter);

// redirect
app.get('/*', (request, response) => {
	response.sendFile(`${appDistDirectory}/index.html`);
});

app.listen(serverPort, () => {
	console.log(`Jabber server is up and running on port ${serverPort}`);
});

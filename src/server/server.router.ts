import { Router } from 'express';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { Server } from 'socket.io';

import { SocketEvents } from 'jabber/entities';

export function getServerRouter(io: Server): Router {
	io.on('connection', socket => {
		socket.on(SocketEvents.ChatMessage, message => {
			io.emit(SocketEvents.ChatMessage, message);
		});
	});

	const serverRouter = Router();
	const apiRouter = Router();

	serverRouter.use('/api', apiRouter);

	return serverRouter;
}

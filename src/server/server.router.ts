import { Router } from 'express';
import { Server } from 'socket.io';

import { ChatMessage, SocketEvents } from 'jabber/entities';

export function getServerRouter(io: Server): Router {
	io.on('connection', socket => {
		socket.on(SocketEvents.ChatMessage, (message: ChatMessage) => {
			io.emit(SocketEvents.ChatMessage, message);
		});
	});

	const serverRouter = Router();
	const apiRouter = Router();

	serverRouter.use('/api', apiRouter);

	return serverRouter;
}

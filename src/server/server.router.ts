import { Router } from 'express';
import { Server } from 'socket.io';

import { SocketEvents } from 'jabber/entities';

interface SocketIoEventSource<T = any> {
	on(eventName: string, handler: (event: T) => void): void;
}

interface SocketIoEventTarget<T = any> {
	emit(eventName: string, event: T): void;
}

function emitOnEvent<T = any>(source: SocketIoEventSource<T>, target: SocketIoEventTarget<T>, eventName: string): void {
	source.on(eventName, event => { target.emit(eventName, event); });
}

export function getServerRouter(io: Server): Router {
	io.on('connection', (socket: SocketIO.Socket) => {
		emitOnEvent(socket, io, SocketEvents.ChatJoin);
		emitOnEvent(socket, io, SocketEvents.ChatLeave);
		emitOnEvent(socket, io, SocketEvents.ChatMessage);
	});

	const serverRouter = Router();
	const apiRouter = Router();

	serverRouter.use('/api', apiRouter);

	return serverRouter;
}

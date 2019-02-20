import { Router } from 'express';
import { Server } from 'socket.io';

import { ChatUser, SocketEvents } from 'jabber/entities';

const roomIds: string[] = [ 'announcements' ];

function sortedInsert<T>(items: T[], newItem: T, config?: { insertDuplicates: boolean }): boolean {
	if (!(items instanceof Array)) {
		return false;
	}

	config = Object.assign({ insertDuplicates: false }, config);

	let insertIndex = items.length;

	for (let i = 0; i < items.length; ++i) {
		const currentItem = items[i];

		if (currentItem === newItem) {
			insertIndex = (config.insertDuplicates) ? i : null;
			break;
		} else if (currentItem > newItem) {
			insertIndex = i;
			break;
		}
	}

	if (insertIndex != null) {
		items.splice(insertIndex, 0, newItem);
		return true;
	} else {
		return false;
	}
}

export function getServerRouter(io: Server): Router {
	io.on('connection', (socket: SocketIO.Socket) => {
		socket.on(SocketEvents.ChatRooms, () => {
			socket.emit(SocketEvents.ChatRooms, roomIds);
		});

		socket.on(SocketEvents.ChatJoin, (event: ChatUser) => {
			const eventRoomId = event.roomId;

			if (eventRoomId) {
				const isNewRoom = sortedInsert(roomIds, eventRoomId);
				if (isNewRoom) {
					io.emit(SocketEvents.ChatRooms, roomIds);
				}

				socket.join(eventRoomId);
				io.to(eventRoomId).emit(SocketEvents.ChatJoin, event);
			}
		});
		socket.on(SocketEvents.ChatLeave, (event: ChatUser) => {
			const eventRoomId = event.roomId;

			if (eventRoomId) {
				socket.leave(eventRoomId);
				io.to(eventRoomId).emit(SocketEvents.ChatLeave, event);
			}
		});
		socket.on(SocketEvents.ChatMessage, event => {
			const eventRoomId = event.roomId;

			if (eventRoomId) {
				io.to(eventRoomId).emit(SocketEvents.ChatMessage, event);
			}
		});
	});

	const serverRouter = Router();
	const apiRouter = Router();

	serverRouter.use('/api', apiRouter);

	return serverRouter;
}

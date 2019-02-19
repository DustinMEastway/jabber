import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatMessage, ChatUser, SocketEvents } from 'jabber/entities';

import { SocketIoService } from './socket-io.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
	get joinChatMessages$(): Observable<ChatMessage> {
		return this._socketIoService.observeEvent(SocketEvents.ChatJoin).pipe(
			map<ChatUser, ChatMessage>(event => ({
				content: `${event.username} joined ${event.roomId}`,
				roomId: event.roomId,
				username: null
			}))
		);
	}

	get leaveChatMessages$(): Observable<ChatMessage> {
		return this._socketIoService.observeEvent(SocketEvents.ChatLeave).pipe(
			map<ChatUser, ChatMessage>(event => ({
				content: `${event.username} left ${event.roomId}`,
				roomId: event.roomId,
				username: null
			}))
		);
	}

	get roomIds$(): Observable<string[]> {
		this._socketIoService.emit(SocketEvents.ChatRooms);
		return this._socketIoService.observeEvent(SocketEvents.ChatRooms);
	}

	constructor(private _socketIoService: SocketIoService, private _userService: UserService) {
		this.leaveChat = this.leaveChat.bind(this);
	}

	getChatMessages$(roomId: string): Observable<ChatMessage> {
		this.joinChat(roomId);

		return this._socketIoService.observeEvent(
			SocketEvents.ChatMessage,
			{ cleanup: () => { this.leaveChat(roomId); }
		});
	}

	sendMessage(roomId: string, message: string): void {
		const chatMessage: ChatMessage = {
			content: message,
			roomId: roomId,
			username: this._userService.username
		};

		this._socketIoService.emit(SocketEvents.ChatMessage, chatMessage);
	}

	private joinChat(roomId: string): void {
		const event: ChatUser = {
			roomId: roomId,
			username: this._userService.username,
		};

		this._socketIoService.emit(SocketEvents.ChatJoin, event);
		window.addEventListener('unload', this.leaveChat.bind(this, roomId));
	}

	private leaveChat(roomId?: string): void {
		const event: ChatUser = {
			roomId: roomId,
			username: (this._userService.user) ? this._userService.username : this._userService.lastUsername,
		};

		this._socketIoService.emit(SocketEvents.ChatLeave, event);
		window.removeEventListener('unload', this.leaveChat.bind(this, roomId));
	}
}
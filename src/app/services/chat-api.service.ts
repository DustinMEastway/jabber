import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatMessage, SocketEvents } from 'jabber/entities';

import { SocketIoService } from './socket-io.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ChatApiService {
	get joinChatMessages$(): Observable<ChatMessage> {
		return this._socketIoService.observeEvent(SocketEvents.ChatJoin).pipe(
			map<string, ChatMessage>(username => ({
				content: `${username} joined the chat`,
				username: null
			}))
		);
	}

	get leaveChatMessages$(): Observable<ChatMessage> {
		return this._socketIoService.observeEvent(SocketEvents.ChatLeave).pipe(
			map<string, ChatMessage>(username => ({
				content: `${username} left the chat`,
				username: null
			}))
		);
	}

	get chatMessages$(): Observable<ChatMessage> {
		this.joinChat();

		return this._socketIoService.observeEvent(SocketEvents.ChatMessage, { cleanup: () => { this.leaveChat(); } });
	}

	constructor(private _socketIoService: SocketIoService, private _userService: UserService) {}

	sendMessage(message: string): void {
		const chatMessage: ChatMessage = {
			content: message,
			username: this._userService.username
		};

		this._socketIoService.emit(SocketEvents.ChatMessage, chatMessage);
	}

	private joinChat(): void {
		this._socketIoService.emit(SocketEvents.ChatJoin, this._userService.username);
	}

	private leaveChat(): void {
		this._socketIoService.emit(
			SocketEvents.ChatLeave,
			(this._userService.user) ? this._userService.username : this._userService.lastUsername
		);
	}
}

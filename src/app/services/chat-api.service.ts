import { Injectable } from '@angular/core';
import { findIndex } from '@tstack/core';
import { Observable, Subscriber } from 'rxjs';

import { ChatMessage, SocketEvents } from 'jabber/entities';

import { SocketIoService } from './socket-io.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ChatApiService {
	private _messageSubscribers: Subscriber<ChatMessage>[] = [];

	get messages$(): Observable<ChatMessage> {
		return new Observable(subscriber => {
			this._addMessageSubscriber(subscriber);

			return () => {
				this._removeMessageSubscriber(subscriber);
			};
		});
	}

	constructor(private _socketIoService: SocketIoService, private _userService: UserService) {
		this._onMessage = this._onMessage.bind(this);
	}

	sendMessage(message: string): void {
		const chatMessage: ChatMessage = {
			content: message,
			username: this._userService.user.username
		};

		this._socketIoService.emit(SocketEvents.ChatMessage, chatMessage);
	}

	private _onMessage(message: ChatMessage): void {
		this._messageSubscribers.forEach(subscriber => {
			subscriber.next(message);
		});
	}

	private _addMessageSubscriber(subscriber: Subscriber<ChatMessage>): void {
		if (!this._messageSubscribers.length) {
			this._socketIoService.socket.on(SocketEvents.ChatMessage, this._onMessage);
		}

		this._messageSubscribers.push(subscriber);
	}

	private _removeMessageSubscriber(subscriber: Subscriber<ChatMessage>): void {
		const index = findIndex(this._messageSubscribers, subscriber);

		if (index >= 0) {
			this._messageSubscribers.splice(index, 1);
		}

		if (!this._messageSubscribers.length) {
			this._socketIoService.socket.off(SocketEvents.ChatMessage, this._onMessage);
		}
	}
}

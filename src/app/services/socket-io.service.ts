import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { connect } from 'socket.io-client';

import { environment } from 'jabber/environments/environment';

interface EventGroup<T = any> {
	handler: (event: T) => void;
	subscribers: Set<Subscriber<T>>;
}

@Injectable({ providedIn: 'root' })
export class SocketIoService {
	private _socket = connect(`http://localhost:${environment.serverPort}`);
	private _eventSubscribers: { [eventName: string]: EventGroup; } = {};

	get socket(): SocketIOClient.Socket {
		return this._socket;
	}

	emit(event: string, ...args: any[]): void {
		this._socket.emit(event, ...args);
	}

	observeEvent<T = any>(eventName: string, config?: { cleanup?: () => void; }): Observable<T> {
		config = Object.assign({}, config);

		return new Observable(subscriber => {
			this._addEventSubscriber(eventName, subscriber);

			return () => {
				this._removeEventSubscriber(eventName, subscriber);
				if (typeof config.cleanup === 'function') {
					config.cleanup();
				}
			};
		});
	}

	private _addEventSubscriber(eventName: string, subscriber: Subscriber<any>): void {
		const eventGroup = this._getEventGroup(eventName);
		if (eventGroup.subscribers.size < 1) {
			this.socket.on(eventName, eventGroup.handler);
		}

		eventGroup.subscribers.add(subscriber);
	}

	private _getEventGroup(eventName: string): EventGroup {
		if (!this._eventSubscribers[eventName]) {
			this._eventSubscribers[eventName] = {
				handler: (event) => {
					this._eventSubscribers[eventName].subscribers.forEach(subscriber => {
						subscriber.next(event);
					});
				},
				subscribers: new Set()
			};
		}

		return this._eventSubscribers[eventName];
	}

	private _removeEventSubscriber(eventName: string, subscriber: Subscriber<any>): void {
		const eventGroup = this._getEventGroup(eventName);
		eventGroup.subscribers.delete(subscriber);

		if (eventGroup.subscribers.size < 1) {
			this.socket.off(eventName, eventGroup.handler);
		}
	}
}

import { Injectable } from '@angular/core';
import { connect } from 'socket.io-client';

import { environment } from 'jabber/environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketIoService {
	private _socket = connect(`http://localhost:${environment.serverPort}`);

	get socket(): SocketIOClient.Socket {
		return this._socket;
	}

	emit(event: string, value: any): void {
		this._socket.emit(event, value);
	}
}

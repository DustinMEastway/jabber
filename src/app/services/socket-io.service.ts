import { Injectable } from '@angular/core';
import { environment } from 'jabber/environments/environment';
import { connect, Socket } from 'socket.io-client';

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

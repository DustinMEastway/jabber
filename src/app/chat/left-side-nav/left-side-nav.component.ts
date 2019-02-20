import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TskDialogService } from '@tstack/client';
import { Observable } from 'rxjs';

import { ChatService } from 'jabber/app/services';

import { NewRoomDialogComponent } from '../new-room-dialog/new-room-dialog.component';

@Component({
	selector: 'app-left-side-nav',
	templateUrl: './left-side-nav.component.html',
	styleUrls: ['./left-side-nav.component.scss']
})
export class LeftSideNavComponent implements OnInit {
	private _roomIds$: Observable<string[]>;

	get roomIds$(): Observable<string[]> {
		return this._roomIds$;
	}

	constructor(private _chatService: ChatService, private _router: Router, private _tskDialogService: TskDialogService) {}

	ngOnInit(): void {
		this._roomIds$ = this._chatService.roomIds$;
	}

	onNewRoom(): void {
		const dialogRef = this._tskDialogService.open({
			actionButtons: [ 'Cancel' ],
			content: NewRoomDialogComponent,
			title: 'New Room',
			type: 'default'
		});

		dialogRef.content.createRoom$.subscribe(roomId => {
			dialogRef.close();
			this._router.navigateByUrl(`/chat/room/${roomId}`);
		});
	}
}

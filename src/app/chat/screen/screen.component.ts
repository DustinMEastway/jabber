import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatApiService } from 'jabber/app/services';
import { ChatMessage } from 'jabber/entities';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
	@ViewChild('messageInput') messageInput: ElementRef<HTMLTextAreaElement>;
	private _roomId$ = new BehaviorSubject<string>(null);
	private _messages: ChatMessage[] = [];

	get messages(): ChatMessage[] {
		return this._messages;
	}

	get roomId(): string {
		return this._roomId$.value;
	}

	constructor(private _activatedRoute: ActivatedRoute, private _chatApiService: ChatApiService) {}

	ngOnInit(): void {
		this._activatedRoute.paramMap.pipe(map(paramMap => paramMap.get('roomId'))).subscribe(roomId => {
			this._roomId$.next(roomId);
			this._messages = [];
		});

		this._chatApiService.messages$.subscribe(message => {
			this._messages.push(message);
		});
	}

	onSendMessage(): void {
		const messageInput = this.messageInput.nativeElement;
		this._chatApiService.sendMessage(messageInput.value);
		messageInput.value = '';
		messageInput.focus();
	}
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

import { ChatService } from 'jabber/app/services';
import { ChatMessage } from 'jabber/entities';

@Component({
	selector: 'app-screen',
	templateUrl: './screen.component.html',
	styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
	@ViewChild('messageInput') messageInput: ElementRef<HTMLTextAreaElement>;
	private _roomId = '';
	private _messages$: Observable<ChatMessage[]>;

	get messages$(): Observable<ChatMessage[]> {
		return this._messages$;
	}

	get roomId(): string {
		return this._roomId;
	}

	constructor(private _activatedRoute: ActivatedRoute, private _chatService: ChatService) {}

	ngOnInit(): void {
		this._activatedRoute.paramMap.subscribe(paramMap => {
			this._roomId = paramMap.get('roomId');

			this._messages$ = merge(
				this._chatService.getChatMessages$(this.roomId),
				this._chatService.joinChatMessages$,
				this._chatService.leaveChatMessages$
			).pipe(
				scan<ChatMessage>((messages, chatMessage) => messages.concat(chatMessage), [])
			);
		});
	}

	onSendMessage(): void {
		const messageInput = this.messageInput.nativeElement;
		this._chatService.sendMessage(this.roomId, messageInput.value);
		messageInput.value = '';
		messageInput.focus();
	}
}

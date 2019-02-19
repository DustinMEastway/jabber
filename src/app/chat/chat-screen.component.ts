import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppComponent } from 'jabber/app/app.component';

import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';

@Component({
	selector: 'app-chat-screen',
	templateUrl: './chat-screen.component.html',
	styleUrls: ['./chat-screen.component.scss']
})
export class ChatScreenComponent implements OnDestroy, OnInit {
	constructor(private _appComponent: AppComponent) {}

	ngOnInit(): void {
		setTimeout(() => {
			this._appComponent.leftSidenavComponentType = LeftSideNavComponent;
		});
	}

	ngOnDestroy(): void {
		this._appComponent.leftSidenavComponentType = null;
	}
}

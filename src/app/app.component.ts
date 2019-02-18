import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserService } from 'jabber/app/services';
import { environment } from 'jabber/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	private _githubLink = 'https://github.com/DustinMEastway/jabber';
	private _title = 'Jabber';

	get githubUrl(): string {
		return this._githubLink;
	}

	get isUserLoggedIn(): boolean {
		return this._userService.user != null;
	}

	get title(): string {
		return this._title;
	}

	constructor(
		private _domSanitizer: DomSanitizer,
		private _matIconRegistry: MatIconRegistry,
		private _router: Router,
		private _userService: UserService
	) {}

	ngOnInit(): void {
		// add the git icon to the icon registry
		this._matIconRegistry.addSvgIcon('github', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/github.svg'));
	}

	onLogout(): void {
		this._userService.logout();
		if (!environment.allowAnonymousUsers) {
			this._router.navigate([ '/login' ]);
		}
	}
}

import { Injectable } from '@angular/core';
import { castString } from '@tstack/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from 'jabber/entities';
import { environment } from 'jabber/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private _user$ = new BehaviorSubject<User>(null);

	get user$(): Observable<User> {
		return this._user$.asObservable();
	}

	get user(): User {
		return this._user$.value;
	}

	constructor() {
		const usernameCookie = castString(
			document.cookie.split(';').find(cookie => cookie.startsWith('username='))
		).substr('username='.length);

		if (usernameCookie.trim() !== '') {
			this._user$.next({ username: usernameCookie });
		}
	}

	login(username: string): void {
		this.setUsernameCookie(username);
		this._user$.next({ username: username });
	}

	logout(): void {
		this.setUsernameCookie('');
		this._user$.next(null);
	}

	private setUsernameCookie(username: string): void {
		document.cookie = `username=${username};domain=${environment.appDomain};path=/;expires=session`;
	}
}

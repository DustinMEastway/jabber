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
	private _lastUsername: string;

	get lastUsername(): string {
		return this._lastUsername;
	}

	get user(): User {
		return this._user$.value;
	}

	get user$(): Observable<User> {
		return this._user$.asObservable();
	}

	get username(): string {
		return (this.user) ? this.user.username : '<anonymous>';
	}

	constructor() {
		const usernameCookie = castString(
			document.cookie.split(';').find(cookie => cookie.startsWith('username='))
		).substr('username='.length);

		if (usernameCookie.trim() !== '') {
			this.setUser({ username: usernameCookie });
		}
	}

	login(username: string): void {
		this.setUsernameCookie(username);
		this.setUser({ username: username });
	}

	logout(): void {
		this.setUsernameCookie('');
		this.setUser(null);
	}

	private setUser(user: User): void {
		this._lastUsername = this.username;
		this._user$.next(user);
	}

	private setUsernameCookie(username: string): void {
		document.cookie = `username=${username};domain=${environment.appDomain};path=/;expires=session`;
	}
}

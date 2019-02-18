import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class LoginRouteGuard implements CanActivate {
	constructor(
		private _router: Router,
		private _userService: UserService
	) {}

	canActivate(): boolean {
		if (this._userService.user == null) {
			this._router.navigate([ 'login' ]);

			return false;
		}

		return true;
	}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { markAs } from '@tstack/client';

import { UserService } from 'jabber/app/services';

@Component({
	selector: 'app-login-screen',
	templateUrl: './login-screen.component.html',
	styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
	private _form: FormGroup;

	get form(): FormGroup {
		return this._form;
	}

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _userService: UserService
	) {}

	ngOnInit(): void {
		this._userService.user$.subscribe(user => {
			if (user) {
				this._router.navigate([ '/' ]);
			}
		});

		this._form = this._formBuilder.group({
			username: [ '',  Validators.required ]
		});
	}

	onLogin(event?: Event): void {
		if (event) {
			event.preventDefault();
		}

		if (this.form.invalid) {
			markAs(this.form, 'touched');
		} else {
			this._userService.login(this.form.get('username').value);
		}
	}
}

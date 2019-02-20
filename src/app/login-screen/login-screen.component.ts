import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { markAs } from '@tstack/client';

import { UserService } from 'jabber/app/services';
import { environment } from 'jabber/environments/environment';

@Component({
	selector: 'app-login-screen',
	templateUrl: './login-screen.component.html',
	styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
	private _form: FormGroup;

	get displayAnonymousHint(): boolean {
		return environment.allowAnonymousUsers;
	}

	get form(): FormGroup {
		return this._form;
	}

	get usernameControl(): AbstractControl {
		return this.form.get('username');
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

		const usernameValidators: ValidatorFn[] = [
			(control: AbstractControl) => /^[\w\d]*$/.test(control.value) ? null : { invalidCharacters: true }
		];

		if (!environment.allowAnonymousUsers) {
			usernameValidators.push(Validators.required);
		}

		this._form = this._formBuilder.group({
			username: [ '', usernameValidators]
		});
	}

	onLogin(event?: Event): void {
		if (event) {
			event.preventDefault();
		}

		if (this.form.invalid) {
			markAs(this.form, 'touched');
		} else {
			const username = this.form.get('username').value.trim();

			if (username !== '') {
				this._userService.login(username);
			}

			this._router.navigate([ '/' ]);
		}
	}
}

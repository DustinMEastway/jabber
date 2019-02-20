import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

@Component({
	selector: 'app-new-room-dialog',
	templateUrl: './new-room-dialog.component.html',
	styleUrls: ['./new-room-dialog.component.scss']
})
export class NewRoomDialogComponent implements OnInit {
	private _form: FormGroup;
	private _createRoom$ = new EventEmitter<string>();

	get createRoom$(): EventEmitter<string> {
		return this._createRoom$;
	}

	get form(): FormGroup {
		return this._form;
	}

	get roomIdControl(): AbstractControl {
		return this._form.get('roomId');
	}

	constructor(private _formBuilder: FormBuilder) { }

	ngOnInit(): void {
		const roomIdValidators: ValidatorFn[] = [
			(control: AbstractControl) => /^[\w\d]*$/.test(control.value) ? null : { invalidCharacters: true },
			Validators.required,
			Validators.maxLength(25)
		];
		this._form = this._formBuilder.group({
			roomId: [ '', roomIdValidators ]
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			this._createRoom$.emit(this.roomIdControl.value);
		}
	}
}

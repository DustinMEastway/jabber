import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	private _title = 'Jabber';
	private _githubLink = 'https://github.com/DustinMEastway/jabber';

	get title(): string {
		return this._title;
	}

	get githubUrl(): string {
		return this._githubLink;
	}

	constructor(
		private _domSanitizer: DomSanitizer,
		private _matIconRegistry: MatIconRegistry
	) {}

	ngOnInit(): void {
		// add the git icon to the icon registry
		this._matIconRegistry.addSvgIcon('github', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/github.svg'));
	}
}

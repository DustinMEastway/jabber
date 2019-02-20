import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TskDialogModule, TskDynamicContentModule } from '@tstack/client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftSideNavComponent as ChatLeftSideNavComponent } from './chat/left-side-nav/left-side-nav.component';
import { NewRoomDialogComponent } from './chat/new-room-dialog/new-room-dialog.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

@NgModule({
	declarations: [
		AppComponent,
		ChatLeftSideNavComponent,
		LoginScreenComponent,
		NewRoomDialogComponent
	],
	entryComponents: [
		ChatLeftSideNavComponent,
		NewRoomDialogComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FlexLayoutModule,
		HttpClientModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatSidenavModule,
		MatToolbarModule,
		ReactiveFormsModule,
		TskDialogModule,
		TskDynamicContentModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }

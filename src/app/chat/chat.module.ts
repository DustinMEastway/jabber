import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatScreenComponent } from './chat-screen.component';
import { ScreenComponent } from './screen/screen.component';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatToolbarModule,
		ChatRoutingModule
	],
	declarations: [
		ChatScreenComponent,
		ScreenComponent
	]
})
export class ChatModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatScreenComponent } from './chat-screen.component';
import { ScreenComponent } from './screen/screen.component';

@NgModule({
	imports: [
		CommonModule,
		ChatRoutingModule
	],
	declarations: [ChatScreenComponent, ScreenComponent]
})
export class ChatModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatScreenComponent } from './chat-screen.component';
import { ScreenComponent } from './screen/screen.component';

const routes: Routes = [
	{
		path: '',
		component: ChatScreenComponent,
		children: [
			{ path: 'room/:roomId', component: ScreenComponent },
			{ path: '**', redirectTo: 'room/announcements' },
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChatRoutingModule { }

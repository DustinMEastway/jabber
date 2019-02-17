import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRouteGuard } from 'jabber/app/services';

import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
	{ path: 'chat', canActivate: [ LoginRouteGuard ], loadChildren: './chat/chat.module#ChatModule' },
	{ path: 'login', component: LoginScreenComponent },
	{ path: '**', redirectTo: 'chat' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }

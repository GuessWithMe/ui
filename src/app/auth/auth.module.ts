import { MaterialImportsModule } from './../material-imports.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    MaterialImportsModule,
    RouterModule,
  ],
  providers: [

  ],
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from "../utils/shared.modules";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthRoutingModule } from "./auth-routing.module";
import { ForgetpwdComponent } from './login/forgetpwd/forgetpwd.component';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
        ForgetpwdComponent
    ],
    imports: [
        SharedModule,
        AngularFireAuthModule,
        AuthRoutingModule
    ],
    exports: []
})
export class AuthModule {}
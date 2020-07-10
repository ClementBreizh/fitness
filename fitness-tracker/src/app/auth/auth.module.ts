import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from "../utils/shared.modules";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        AngularFireAuthModule,
        AuthRoutingModule
    ],
    exports: []
})
export class AuthModule {}
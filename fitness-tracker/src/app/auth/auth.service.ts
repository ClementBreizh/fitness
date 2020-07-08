import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();

    constructor(private router: Router) {}


    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() *10000).toString()
        };
        this.authSuccess();
    }    

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() *10000).toString()
        };
        this.authSuccess();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return { ...this.user };
        // permet de retourner un "nouvel" user sans manipuler
        // celui du service mais ayant les mêmes attributs
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccess() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
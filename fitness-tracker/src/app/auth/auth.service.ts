import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExerciseService } from '../training/exercise.service';

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private afAuth: AngularFireAuth, private exerciseService: ExerciseService) { }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email.trim(),
            authData.password
        ).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
    }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.exerciseService.cancelSubscription();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }


    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email.trim(),
            authData.password
        ).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
    }

    logout() {
        this.afAuth.auth.signOut();

    }



    isAuth() {
        return this.isAuthenticated;
    }
}
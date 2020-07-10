import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExerciseService } from '../training/exercise.service';;
import { uiService } from '../utils/utils-ui-service';
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../utils/utils-ui.actions'

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router,
        private afAuth: AngularFireAuth,
        private exerciseService: ExerciseService,
        private uiService: uiService,
        private store: Store<fromRoot.State>) {}

    registerUser(authData: AuthData) {
        // this.uiService.loadingSpinner.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email.trim(),
            authData.password
        ).then(result => {
            // this.uiService.loadingSpinner.next(false);
            this.store.dispatch(new UI.StopLoading());
        }).catch(error => {
            // this.uiService.loadingSpinner.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Cette adresse est déjà liée à un compte existant',
                null,
                5000
            );
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
        // this.uiService.loadingSpinner.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email.trim(),
            authData.password
        ).then(result => {
            // this.uiService.loadingSpinner.next(false);
            this.store.dispatch(new UI.StopLoading());
        }).catch(error => {
            // this.uiService.loadingSpinner.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Email ou mot de passe invalide',
                null,
                5000
            );
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}
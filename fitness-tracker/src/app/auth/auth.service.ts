import { AuthData } from "./auth-data.model";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExerciseService } from '../training/exercise.service';;
import { uiService } from '../utils/utils-ui-service';
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../utils/utils-ui.actions'
import * as Auth from '../auth/auth.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    private fdSubs: Subscription[] = [];

    constructor(private router: Router,
        private afAuth: AngularFireAuth,
        private exerciseService: ExerciseService,
        private uiService: uiService,
        private db: AngularFirestore,
        private store: Store<fromRoot.State>) { }

    registerUser(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email.trim(),
            authData.password
        ).then(result => {
            this.store.dispatch(new UI.StopLoading());
        }).catch(error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                'Cette adresse est déjà liée à un compte existant',
                null,
                5000
            );
        });
    }

    resetPassword(email: string) {
        this.afAuth.auth.sendPasswordResetEmail(
            email
            ).catch(error => {
                this.uiService.showSnackbar(
                    'Cet email ne correspond pas à un compte existant', null, 5000);
            });
    }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch(new Auth.SetAuth());
                this.router.navigate(['/training']);
            } else {
                this.exerciseService.cancelSubscription();
                this.store.dispatch(new Auth.SetUnAuth());
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email.trim(),
            authData.password
        ).then(result => {
            this.store.dispatch(new UI.StopLoading());
        }).catch(error => {
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

}
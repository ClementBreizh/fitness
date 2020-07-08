import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { AppComponent } from './app.component';
import { MaterialModule } from "./material.module";
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutinModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from "./training/current-training/stop-training.components";
import { AuthService } from "./auth/auth.service"
import { ExerciseService } from "./training/exercise.service";
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlFr } from "./utils/utils-paginator";

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutinModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [AuthService, ExerciseService, 
    {provide: LOCALE_ID, useValue: "fr-FR" },
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlFr}
  ],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }

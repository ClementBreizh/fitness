import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AppComponent } from './app.component';
import { MaterialModule } from "./material.module";
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
import { AngularFireDatabase } from 'angularfire2/database';
import { uiService } from "./utils/utils-ui-service";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./app.reducer";


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutinModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, ExerciseService,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlFr },
    AngularFireDatabase,
    uiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';
import { uiService } from 'src/app/utils/utils-ui-service';
import { Subscription, Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import * as fromRoot from 'src/app/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate;
  isLoading$: Observable<boolean>;
  private loadingSubs = new Subscription;

  constructor(
    private authService: AuthService,
    private uiService: uiService,
    private store: Store
    ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}

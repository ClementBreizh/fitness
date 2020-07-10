import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import { uiService } from 'src/app/utils/utils-ui-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs = new Subscription;


  constructor(private authService: AuthService, private uiService: uiService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingSpinner.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)]
      })
    })
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }

  }
}
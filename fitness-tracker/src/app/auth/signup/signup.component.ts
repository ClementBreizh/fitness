import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';
import { uiService } from 'src/app/utils/utils-ui-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate;
  isLoading = false;
  private loadingSubs = new Subscription;

  constructor(private authService: AuthService, private uiService: uiService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingSpinner.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
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

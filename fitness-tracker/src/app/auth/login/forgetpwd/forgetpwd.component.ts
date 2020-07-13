import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import * as fromRoot from 'src/app/app.reducer';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.css']
})
export class ForgetpwdComponent implements OnInit {

  isLoading$: Observable<boolean>;


  constructor(
    private authService: AuthService,
      private store: Store<fromRoot.State>,
      private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    
  }

  onSubmit(form: NgForm) {
    let email = form.value.email.toString();
    this.authService.resetPassword(
      email
    );
    
  }

}


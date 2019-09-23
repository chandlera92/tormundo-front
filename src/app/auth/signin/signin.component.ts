import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import {ValidationService} from '../../validation/validation.service';
import {MatDialog} from '@angular/material';
import {ForgotPasswordComponent} from '../../validation/forgot-password/forgot-password.component';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../shared/form_window.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;
  public expired: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              public validationService: ValidationService,
              public dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  activateForgotPasswordDialog() {
    /* TODO: This should be a route, temp for now. */
    this.dialog.open(ForgotPasswordComponent, {
      width: '500px'
    });
  }

  onSignin() {
    const authInfo = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };

    // TODO: Automatically set user state from return information.
    this.store.dispatch(new AuthActions.TrySignin(authInfo));

  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('chandlera092@gmail.com', [Validators.required, this.validationService.emailValidator]),
      password: new FormControl('test123', [Validators.required, this.validationService.passwordValidator])
    });


    this.expired = this.route.queryParams.subscribe(params => {
      if (params.expired) {
        setTimeout(() => {
          this.dialog.open(ForgotPasswordComponent, {
            width: '500px',
            data: {
              error: true,
              message: 'Password reset link expired, please try again.'
            }
          });
        });
      }
    });


  }

}

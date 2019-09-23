import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as CoreActions from '../../core/store/core.actions';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import {ValidationService} from '../../validation/validation.service';
import {MatDialog} from '@angular/material';
import {VerifyAccountComponent} from '../../validation/verify-account/verify-account.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../shared/form_window.scss', './signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewInit {

  public signupForm: FormGroup;

  public localeSubscription: Subscription;
  public countries;
  public languages;

  constructor(private fb: FormBuilder,
              private store: Store<fromApp.AppState>,
              public validationService: ValidationService,
              public dialog: MatDialog) {
  }

  onSignup() {
    const authInfo = {
      email: this.signupForm.value.emails.email,
      password: this.signupForm.value.passwords.password,
      user_name: this.signupForm.value.user_name,
      country_id: this.signupForm.value.country_id,
      language_id: this.signupForm.value.language_id
    };

    this.store.dispatch(new AuthActions.TrySignUp(authInfo));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dialog.open(VerifyAccountComponent, {
        width: '550px'
      });
    }, 50);
  }

  ngOnInit() {

    this.store.dispatch(new CoreActions.TryGetLocales());

    this.localeSubscription = this.store.select('core')
      .subscribe(data => {
        this.countries = data.countries;
        this.languages = data.languages;
      });

    this.signupForm = new FormGroup({
      user_name: new FormControl(null, Validators.required),
      emails: this.fb.group({
        email: ['test@test123.com', [Validators.required, this.validationService.emailValidator]],
        repeat: ['test@test123.com', [Validators.required, this.validationService.emailValidator]]
      }, {validator: this.validationService.areEqual}),
      passwords: this.fb.group({
        password: ['test123', [Validators.required, this.validationService.passwordValidator]],
        repeat: ['test123', [Validators.required]]
      }, {validator: this.validationService.areEqual}),
      country_id: new FormControl(null, Validators.required),
      language_id: new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
  }

}

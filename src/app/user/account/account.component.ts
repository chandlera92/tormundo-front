import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as fromApp from '../../store/app.reducers';
import {Subscription} from 'rxjs';
import * as CoreActions from '../../core/store/core.actions';
import {User} from '../../core/models/user';
import {ValidationService} from '../../validation/validation.service';
import {MatDialog} from '@angular/material';
import {VerifyAccountComponent} from '../../validation/verify-account/verify-account.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  public modifySettingsForm: FormGroup;
  public changePassword = false;

  public localeSubscription: Subscription;
  public userSubscription: Subscription;
  public user: User;
  public countries;
  public languages;

  constructor(private fb: FormBuilder,
              private store: Store<fromApp.AppState>,
              public validationService: ValidationService,
              public dialog: MatDialog) {
  }

  onModify() {
  }

  activateVerificationDialog() {
    this.dialog.open(VerifyAccountComponent, {
      width: '550px'
    });
  }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .subscribe(data => {
        this.user = data.user;
      });

    this.store.dispatch(new CoreActions.TryGetLocales());

    this.localeSubscription = this.store.select('core')
      .subscribe(data => {
        this.countries = data.countries;
        this.languages = data.languages;
      });


    this.modifySettingsForm = new FormGroup({
      user_name: new FormControl(this.user.user_name, null),
      email: new FormControl(this.user.email),
      currentPassword: new FormControl('test123', Validators.required),
      passwords: this.fb.group({
        password: [''],
        repeat: ['']
      }),
      country_id: new FormControl(this.user.country_id, null),
      language_id: new FormControl(this.user.language_id, null)
    });
  }

  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
  }

}

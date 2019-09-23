import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../globals';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as UserActions from '../../user/store/user.actions';
import {Actions} from '@ngrx/effects';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/internal/operators';


@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit, OnDestroy {

  /* TODO: Loading graphic when making api call. */
  /* TODO: Make it more obvious that a new code has been sent. */
  /* TODO: Make a success message. */

  private destroyed$ = new Subject<boolean>();
  public error: boolean;
  public message: string;
  public codeForm: FormGroup;

  public alphaNumericRegex = new RegExp('^[a-zA-Z0-9]+$');

  constructor(public dialogRef: MatDialogRef<VerifyAccountComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
              private globals: Globals,
              private store: Store<fromApp.AppState>,
              private updates$: Actions) {
  }

  testKey(e) {
    console.log(e);
    console.log(this.alphaNumericRegex.test(e.key));
  }

  verifyAccount() {
    const code = {code: Object.values(this.codeForm.value).join('')};

    this.store.dispatch(new UserActions.VerifyUser(code));
  }

  sendNewCode() {
    this.http.get<any>(this.globals.generateVerificationCode).subscribe();
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  ngOnInit() {
    this.codeForm = new FormGroup({
      character__1: new FormControl('e', Validators.required),
      character__2: new FormControl('e', Validators.required),
      character__3: new FormControl('e', Validators.required),
      character__4: new FormControl('e', Validators.required),
      character__5: new FormControl('1', Validators.required),
      character__6: new FormControl('1', Validators.required)
    });

    this.updates$
      .ofType(UserActions.VERIFY_USER_SUCCESS)
      .pipe(
        takeUntil(this.destroyed$),
        tap((res) => {
          console.log(res);
          console.log('anoooooooother way!!!');
        })
      ).subscribe();

    this.updates$
      .ofType(UserActions.VERIFY_USER_ERROR)
      .pipe(
        takeUntil(this.destroyed$),
        tap((res: any) => {
          this.error = true;
          this.message = res.error;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../globals';
import {ValidationService} from '../validation.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public forgotPasswordReqSent = false;
  public error: boolean;
  public message: string;

  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
              private globals: Globals,
              public validationService: ValidationService) {
  }

  onCloseConfirm() {
    this.forgotPasswordReqSent = true;

    const email = {email: this.forgotPasswordForm.value.email};
    this.http.post<any>(this.globals.forgotPassword, email).subscribe();
    // this.dialogRef.close('Confirm');
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  sendNewCode(){

  }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('chandlera092@gmail.com', [Validators.required, this.validationService.emailValidator]),
    });

    if(this.data){
      this.error = this.data.error;
      this.message = this.data.message;
    }
  }

}

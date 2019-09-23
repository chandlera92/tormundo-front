import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidationService} from './validation.service';
import { DialogComponent } from './dialog/dialog.component';
import { ErrorComponent } from './error/error.component';
import {MatButtonModule, MatDialogModule, MatInputModule} from '@angular/material';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [DialogComponent, ErrorComponent, FileUploadComponent, VerifyAccountComponent, ForgotPasswordComponent],
  providers: [ValidationService],
  exports: [DialogComponent, ErrorComponent],
  entryComponents: [DialogComponent, FileUploadComponent, VerifyAccountComponent, ForgotPasswordComponent]
})
export class ValidationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';

import {
  MatInputModule,
  MatButtonModule, MatSelectModule, MatDialogModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import {AppRoutingModule} from '../app-routing.module';
import {ValidationModule} from '../validation/validation.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ResetPasswordGuard} from './reset-password.guard';

@NgModule({
  imports: [
    CommonModule,
    ValidationModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [SigninComponent, SignupComponent, ResetPasswordComponent],
  providers: [ResetPasswordGuard]
})
export class AuthModule { }

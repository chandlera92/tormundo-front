import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './account/account.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {UserComponent} from './user.component';
import {UserRoutingModule} from './user-routing.module';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AccountGuard} from './account/account.guard';
import {EditProfileGuard} from './edit-profile/edit-profile.guard';
import {UserGuard} from './user.guard';
import {QuillModule} from 'ngx-quill';
import {ValidationModule} from '../validation/validation.module';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    QuillModule.forRoot(),
    ValidationModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    ClickOutsideModule
  ],
  declarations: [AccountComponent, UserComponent, EditProfileComponent],
  providers: [AccountGuard, EditProfileGuard, UserGuard]
})
export class UserModule {
}

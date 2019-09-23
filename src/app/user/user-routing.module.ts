import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {AccountComponent} from './account/account.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {AccountGuard} from './account/account.guard';
import {EditProfileGuard} from './edit-profile/edit-profile.guard';
import {UserGuard} from './user.guard';

const userRoutes: Routes = [
  {
    path: '', canActivate: [UserGuard], component: UserComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'account'},
      {path: 'account', component: AccountComponent},
      {path: 'profile', component: EditProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AccountComponent} from './user/account/account.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {ResetPasswordGuard} from './auth/reset-password.guard';
import {CreateOrganizationComponent} from './core/create-organization/create-organization.component';
import {LocalesResolver} from './shared/locales.resolver';

const routes: Routes = [
  {path: '', resolve: {locales: LocalesResolver}, component: HomeComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'create-organization', resolve: {locales: LocalesResolver}, component: CreateOrganizationComponent},
  {path: 'reset-password/:token', canActivate: [ResetPasswordGuard], component: ResetPasswordComponent},
  {path: 'settings', loadChildren: './user/user.module#UserModule'},
  {path: 'admin', resolve: {locales: LocalesResolver}, loadChildren: './admin/admin.module#AdminModule'},
  {path: 'explore', loadChildren: './explore/explore.module#ExploreModule'},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

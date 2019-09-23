import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminGuard} from './admin.guard';
import {DashboardComponent} from './organization/dashboard/dashboard.component';
import {SettingsComponent} from './organization/settings/settings.component';
import {MembersComponent} from './organization/members/members.component';
import {ProfilesComponent} from './organization/profiles/profiles.component';
import {AccountsComponent} from './organization/accounts/accounts.component';
import {MembersGuard} from './organization/members/members.guard';
import {LocalesResolver} from '../shared/locales.resolver';
import {AdminOrganizationDisplayCardsComponent} from './organization/display-cards/display-cards.component';
import {BasicComponent} from './organization/basic/basic.component';
import {CanDeactivateGuard} from '../shared/guards/can-deactivate';
import {DisplayCardsResolver} from './organization/display-cards/display-cards.resolver';

/*  */

const adminRoutes: Routes = [
  /* TODO: Should automatically redirect to :organizationName/dashboard */

  {
    path: ':organizationName', canActivate: [AdminGuard], component: AdminComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'basic', component: BasicComponent},
      {
        path: 'display-cards',
        resolve: {locales: LocalesResolver, displayCards: DisplayCardsResolver},
        canDeactivate: [CanDeactivateGuard],
        component: AdminOrganizationDisplayCardsComponent
      },
      {path: 'profiles', resolve: {locales: LocalesResolver}, component: ProfilesComponent},
      {path: 'members', loadChildren: './organization/members/members.module#MembersModule'},
      {path: 'accounts', component: AccountsComponent},
      {path: 'settings', component: SettingsComponent}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}

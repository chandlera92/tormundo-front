import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MembersGuard} from './members.guard';
import {AdminMembersEditComponent} from './edit/edit.component';
import {MembersComponent} from './members.component';

/*  */

const adminMembersRoutes: Routes = [
  {
    path: '', pathMatch: 'prefix', canActivate: [MembersGuard], component: MembersComponent, children: [
      {
        path: ':id',
        component: AdminMembersEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminMembersRoutes)],
  exports: [RouterModule]
})

export class AdminMembersRoutingModule {
}

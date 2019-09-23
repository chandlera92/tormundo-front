import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MembersComponent} from './members.component';
import {MemberDialogComponent} from './member-dialog/member-dialog.component';
import {AdminMembersEditComponent} from './edit/edit.component';
import {MembersGuard} from './members.guard';
import {MatButtonModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {AdminMembersRoutingModule} from './members-routing.module';
import {DateToDaysPipe} from '../../../shared/date-to-days.pipe';

@NgModule({
  imports: [
    CommonModule,
    AdminMembersRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    MembersComponent,
    MemberDialogComponent,
    AdminMembersEditComponent,
    DateToDaysPipe
  ],
  providers: [MembersGuard],
  entryComponents: [MemberDialogComponent]
})
export class MembersModule { }

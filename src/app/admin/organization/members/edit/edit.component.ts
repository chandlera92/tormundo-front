import {Component, Inject, OnInit} from '@angular/core';
import {MemberDialogComponent} from '../member-dialog/member-dialog.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-admin-members-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class AdminMembersEditComponent implements OnInit {
  dialogRef: MatDialogRef<MemberDialogComponent>;

  config: MatDialogConfig = {
    width: '40%',
    height: '40%',
    data: {
      message: 'Jazzy jazz jazz'
    }
  };

  constructor(public dialog: MatDialog,
              @Inject(DOCUMENT) private doc: any,
              private router: Router,
              private route: ActivatedRoute) {
    /*
        dialog.afterOpen.subscribe(() => {
          if (!doc.body.classList.contains('no-scroll')) {
            doc.body.classList.add('no-scroll');
          }
        });
    */

    this.openModal();
  }

  ngOnInit() {
  }

  openModal() {
    this.dialogRef = this.dialog.open(MemberDialogComponent, this.config);

    this.dialogRef.afterClosed().subscribe((result: string) => {
      this.dialogRef = null;

      // TODO: Fix this some how? There should be an easier way to navigate to the parent route. (Or in this case, the route that the component is assigned to.)
      // TODO: Maybe move this up into the dialog component? there is a gap in time, I don't like this at all.
      let currentUrl = this.router.url.split('/');
      currentUrl.splice(-1, 1);
      this.router.navigate([currentUrl.join('/')]);
    });
  }

}

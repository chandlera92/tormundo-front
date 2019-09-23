import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent {

  constructor(public dialogRef: MatDialogRef<MemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
             ) {
  }

  onClose() {
    this.dialogRef.close();
  }

}

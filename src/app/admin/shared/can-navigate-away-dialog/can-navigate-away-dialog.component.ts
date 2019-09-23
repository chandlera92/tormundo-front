import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {DialogComponent} from '../../../validation/dialog/dialog.component';


@Component({
  selector: 'app-can-navigate-away-dialog',
  templateUrl: './can-navigate-away-dialog.component.html',
  styleUrls: ['./can-navigate-away-dialog.component.scss']
})
export class CanNavigateAwayDialogComponent implements OnInit, OnDestroy {

  public createNewItem: boolean;
  public subscriptionAlive = true;


  constructor(public dialogRef: MatDialogRef<CanNavigateAwayDialogComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private store: Store<fromApp.AppState>,
              private updates$: Actions) {
  }

  onSubmit() {
    this.store.dispatch(this.data.dispatchEvent);
  }

  onClose() {
    this.dialogRef.close({
      close: false
    });
  }

  onSubmitNewItem() {
    this.createNewItemDispatch();

    this.dialogRef.close({
      item: this.data.item,
      new: true
    });
  }

  ngOnInit() {

    // Assumes that component can never be called without two options
    if (this.data.item_equal) {
      this.createNewItem = true;
    }
    else {
      this.createNewItem = false;
    }

/*    this.updates$
      .ofType(AdminActions.AdminActionTypes.ADMIN_LANGUAGE_ITEM_REQUEST_ERROR)
      .takeWhile(() => this.subscriptionAlive)
      .do((res: any) => {
        this.dialogRef.close({
          error: true,
          item: this.data.editedItem
        });
        this.dialog.open(DialogComponent, {
          width: '500px',
          data: {message: res.payload.error.message}
        });
      })
      .subscribe();*/


  }

  createNewItemDispatch() {
    const type = this.data.type;
    switch (type) {
      case 'card':
      //  return this.store.dispatch(new AdminActions.CreateNewOrganizationDisplayCard(this.data.item));
      default:
        return false;
    }
  }

  ngOnDestroy() {
    this.subscriptionAlive = false;
  }

}

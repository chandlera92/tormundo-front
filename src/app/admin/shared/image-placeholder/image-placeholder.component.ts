import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdminFileUploadComponent} from '../file-upload/file-upload.component';

import {AppFile} from '../../../core/models/appfile';
import {map, take, takeUntil, tap} from 'rxjs/internal/operators';
import {FileActionTypes} from '../file-upload/store/files.actions';
import {Subject} from 'rxjs/index';
import {Actions} from '@ngrx/effects';

@Component({
  selector: 'app-admin-image-placeholder',
  templateUrl: './image-placeholder.component.html',
  styleUrls: ['./image-placeholder.component.scss']
})
export class ImagePlaceholderComponent implements OnDestroy {

  @Input() set currentFile(currentFile: AppFile) {
    if (currentFile) {
      this.file = currentFile;
    }
    else {
      this.file = null;
    }
  }

  @Output() imageChanged = new EventEmitter<any>();

  public destroyed$ = new Subject<boolean>();
  public file: AppFile;

  constructor(public dialog: MatDialog, private updates$: Actions) {
    this.updates$
      .ofType(FileActionTypes.ADD_FILE_SUCCESS)
      .pipe(
        takeUntil(this.destroyed$),
        tap((result: any) => {
          this.imageChanged.emit(result.file);
        })
      )
      .subscribe();
  }

  // TODO: What happens if person wants to remove all images? Not possible at the moment.

  openModal($event, newFile) {
    this.dialog.open(AdminFileUploadComponent, {
      width: '80vw',
      data: {
        uploadNewFile: newFile
      },
    })
      .afterClosed()
      .pipe(
        take(1),
        map(result => {
          if (!result.imgCreated && result.file !== null) {
            this.file = result.file;
            this.imageChanged.emit(result.file);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

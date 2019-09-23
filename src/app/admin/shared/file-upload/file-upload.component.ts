import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FileUploadComponent} from '../../../validation/file-upload/file-upload.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageUploadService} from '../../../shared/image-upload.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import {Organization} from '../../models/organization';
import {AppFile} from '../../../core/models/appfile';
import {MatTabChangeEvent} from '@angular/material';
import {getFilesState} from './store/files.selectors';
import * as fileActions from './store/files.actions';
import {takeWhile} from 'rxjs/internal/operators';

@Component({
  selector: 'app-admin-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class AdminFileUploadComponent implements OnInit, AfterViewInit, OnDestroy {

  public subscriptionAlive = true;
  public uploadNewFile: boolean;
  public imgSelected = false;
  public uploadImageForm: FormGroup;
  public file: File;
  public loc: string;
  public organization: Organization;
  public ready = false;

  public displayedColumns = ['file', 'id', 'name', 'description', 'type', 'actions'];
  public fileTableDataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<FileUploadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private store: Store<fromApp.AppState>,
              public imgUploadService: ImageUploadService) {
  }

  cancelUpload() {
    this.imgSelected = false;
    this.loc = '';
    this.file = null;
    this.uploadImageForm.patchValue({
      type: ''
    });
  }

  activateUploadNewFile(event: MatTabChangeEvent) {
    const bool = event.index === 0 ? true : false;
    this.uploadNewFile = bool;
  }

  ngOnInit() {
    this.uploadNewFile = this.data.uploadNewFile;

    this.store.select(getFilesState)
      .pipe(
        takeWhile(() => this.subscriptionAlive)
      )
      .subscribe(res => {
        this.fileTableDataSource = new MatTableDataSource(res);
        this.ready = true;
      });

    this.uploadImageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      type: new FormControl({value: '', disabled: true}, Validators.required)
    });

    /* The Service here interacts with the Image upload directive. This is so this can be reused for any image upload component. */

    this.imgUploadService.getFile()
      .pipe(
        takeWhile(() => this.subscriptionAlive)
      )
      .subscribe((file: any) => {
        this.imgSelected = file.imgSelected;
        this.loc = file.loc;
        if (file.file) {
          this.file = file.file;
          this.uploadImageForm.patchValue({
            type: file.file.type
          });
        }
        else {
          this.file = null;
          this.uploadImageForm.patchValue({
            type: ''
          });
        }
      });

  }


  ngOnDestroy() {
    this.subscriptionAlive = false;
  }

  ngAfterViewInit() {
    this.fileTableDataSource.paginator = this.paginator;
    this.fileTableDataSource.sort = this.sort;
  }

  onCloseCancel() {
    this.dialogRef.close({
      imgCreated: false,
      file: null
    });
  }

  onCloseSucceed(res) {
    this.dialogRef.close(res);
  }

  onSelect(file) {
    this.onCloseSucceed({file: file, imgCreated: false});
  }

  onSubmit() {
    const values = this.uploadImageForm.value;
    const formData: FormData = new FormData();

    for (const key of (Object.keys(values))) {
      formData.append(key, values[key]);
    }

    formData.append('file', this.file);

    this.store.dispatch(new fileActions.TryAddFile(formData));

    this.onCloseSucceed({imgCreated: true, file: this.file});
  }
}

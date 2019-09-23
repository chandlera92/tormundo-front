import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ValidationService} from '../../validation/validation.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {UserProfile} from '../../core/models/user-profile';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FileUploadComponent} from '../../validation/file-upload/file-upload.component';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../globals';
import {HttpEndSnackbarComponent} from '../../shared/http-end-snackbar.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public modifyProfileForm: FormGroup;

  public userSubscription: Subscription;
  public profile: UserProfile;
  public imageUpload: File;

  public activeImage: string;

  public activateChangePictureMenu = true;

  constructor(private store: Store<fromApp.AppState>,
              public validationService: ValidationService,
              public dialog: MatDialog,
              private http: HttpClient,
              private globals: Globals,
              private snackBar: MatSnackBar) {
  }

  closePictureMenuOutsideClick(e) {
    if (this.activateChangePictureMenu && e.target['id'] !== 'change-picture') {
      this.activateChangePictureMenu = false;
    }
  }

  revertToGravatar() {
    this.modifyProfileForm.patchValue({
      gravatar_active: true
    });
    this.activateChangePictureMenu = false;
    // this.profile.gravatar_active = true;
  }

  revertToUploadImage() {
    this.modifyProfileForm.patchValue({
      gravatar_active: false
    });
    this.activateChangePictureMenu = false;

    // this.profile.gravatar_active = false;
  }

  changeImage() {
    this.activateChangePictureMenu = false;
    const dialog = this.dialog.open(FileUploadComponent, {
      width: '800px'
    });
    dialog.afterClosed().subscribe(res => {
      if (res.img) {
        this.imageUpload = res.file;
        this.modifyProfileForm.patchValue({
          gravatar_active: false,
          profile_image: res.img
        });
        this.activeImage = this.modifyProfileForm.value.profile_image;

      }
    });
  }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .subscribe(data => {
        this.profile = data.userProfile;
        this.activeImage = data.userProfile.gravatar_active === true
          ? data.userProfile.gravatar + '&s=328'
          : data.userProfile.profile_image;
      });

    this.modifyProfileForm = new FormGroup({
      first_name: new FormControl(this.profile.first_name),
      last_name: new FormControl(this.profile.last_name),
      description: new FormControl(this.profile.description),
      gravatar_active: new FormControl(this.profile.gravatar_active),
      profile_image: new FormControl(this.profile.profile_image)
    });

    this.modifyProfileForm.controls['gravatar_active'].valueChanges.subscribe((val) => {
      if (val) {
        this.activeImage = this.profile.gravatar + '&s=328';
      }
      else {
        this.activeImage = this.modifyProfileForm.value.profile_image;
      }
    });
    /*
        this.dialog.open(FileUploadComponent, {
          width: '800px'
        });
    */

  }

  submitForm() {
    const values = this.modifyProfileForm.value;

    const formData: FormData = new FormData();

    for (const key of (Object.keys(values))) {
      if (key !== 'profile_image') {
        formData.append(key, values[key]);
      }
    }

    if (this.imageUpload) {
      formData.append('profile_picture', this.imageUpload);
    }

    this.http.patch<any>(this.globals.patchUser, formData).subscribe(
      res => {
        this.snackBar.openFromComponent(HttpEndSnackbarComponent, {
          duration: 800,
          data: {message: 'Successfully Updated User!'},
          horizontalPosition: 'end',
          panelClass: 'http-end-snackbar'
        });
      }
    );

    /*   */
  }

}

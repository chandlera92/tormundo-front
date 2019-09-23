import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('uploadContainer') uploadContainer: ElementRef;

  public imgSelected = false;
  public img: string;
  public file: File;

  constructor(public dialogRef: MatDialogRef<FileUploadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public renderer: Renderer2) {
  }

  onCloseCancel() {
    this.dialogRef.close(null);
  }

  dragOver(cont, ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!this.imgSelected) {
      this.renderer.addClass(cont, 'upload-container-over');
    }
  }

  dragOut(cont, ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!this.imgSelected) {
      this.renderer.removeClass(cont, 'upload-container-over');
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  readURL($event) {
    const target = $event.target;
    if (target.files && target.files[0]) {

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.file = target.files[0];
        this.img = e.target.result;
        this.imgSelected = !this.imgSelected;
        if (this.uploadContainer.nativeElement.classList.contains('upload-container-over')) {
          this.renderer.removeClass(this.uploadContainer.nativeElement, 'upload-container-over');
        }


      };

      reader.readAsDataURL(target.files[0]);

      console.log(this.imgSelected)

      /*  this.img = e.target.result;
              this.imgSelected = !this.imgSelected;*/
    }
  }

  cancelUpload() {
    this.imgSelected = !this.imgSelected;
    this.img = '';
    this.file = null;
  }

  submitUpload() {
    this.dialogRef.close({
      file: this.file,
      img: this.img
    });
  }

  ngOnInit() {
    const uploadContainer = this.uploadContainer.nativeElement;
    this.renderer.listen(uploadContainer, 'dragover', ((ev: any) => this.dragOver(uploadContainer, ev)));
    this.renderer.listen(uploadContainer, 'dragleave', ((ev: any) => this.dragOut(uploadContainer, ev)));

  }

}

import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {ImageUploadService} from './image-upload.service';

@Directive({
  selector: '[appUploadImage]'
})
export class UploadImageDirective implements OnInit {

  @Input('imgSelected') imgSelected: boolean;
  @Input('uploadInput') uploadInputEl: ElementRef;

  public uploadContainer: ElementRef;
  public img: string;
  public file: File;

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private imgUploadService: ImageUploadService) {
    this.uploadContainer = el;
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

  readURL($event) {
    console.log($event);
    const target = $event.target;
    if (target.files && target.files[0]) {

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.file = target.files[0];
        this.img = e.target.result;
        this.imgSelected = !this.imgSelected;

        this.imgUploadService.setFile({
          file: target.files[0],
          loc: e.target.result,
          imgSelected: true
        });

        if (this.uploadContainer.nativeElement.parentElement.classList.contains('upload-container-over')) {
          this.renderer.removeClass(this.uploadContainer.nativeElement.parentElement, 'upload-container-over');
        }
      };

      reader.readAsDataURL(target.files[0]);


      /*  this.img = e.target.result;
              this.imgSelected = !this.imgSelected;*/
    }
  }

  ngOnInit() {
    const uploadContainer = this.uploadContainer.nativeElement.parentElement;
    this.renderer.listen(uploadContainer, 'dragover', ((ev: any) => this.dragOver(uploadContainer, ev)));
    this.renderer.listen(uploadContainer, 'dragleave', ((ev: any) => this.dragOut(uploadContainer, ev)));
    this.renderer.listen(this.uploadInputEl, 'change', ((ev: any) => this.readURL(ev)));
  }


}

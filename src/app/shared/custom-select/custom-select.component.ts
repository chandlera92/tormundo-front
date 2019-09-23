import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

/* TODO: Add key controls for blind people. */

@Component({
  selector: 'app-custom-type-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {


  @ViewChild('customSelectList') customSelectList: ElementRef;
  @ViewChild('customSelectMenu') customSelectMenu: ElementRef;

  @Input() data;
  @Input() form;
  @Input() controlName;
  @Input() header;
  @Input() search = false;

  public selectActivated = false;
  public enableSelectMenuHeaderBackground = true;
  public selectHoverState = false;
  public activeText: string = this.header;
  public dynamicData;
  public activeOption = 0;


  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    this.activeText = this.header;
    this.dynamicData = this.data;

    this.renderer.listen('document', 'click', event => this.documentClick(event));
  }

  filterData(ev) {
/*    this.data.filter(item => {
      console.log(item)
      console.log(item.includes('united'))
    });*/
    this.dynamicData = this.data.filter(item => item.toLowerCase().includes(ev.target.value.toLowerCase()));
  }

  documentClick(event) {
    if (this.selectActivated) {
      if (event.target.classList.contains('select__search_container') ||
        event.target.parentElement.classList.contains('select__search_container')) {
        return false;
      }
      else {
        let target = event.target;
        while (this.renderer.parentNode(target) !== this.el.nativeElement || this.el.nativeElement !== target) {
          if (this.renderer.parentNode(target) === this.el.nativeElement || this.el.nativeElement === target) {
            return false;
          }
          else {
            parent = this.renderer.parentNode(target);
            if (parent == null) {
              this.selectActivated = false;
              return false;
            }
            target = parent;
          }
        }
      }
    }
  }


  /* showError(control: any, group: boolean) {
     if (!control.touched) {
       return false;
     }
     else if (group == true) {
       if (control.parent.errors || control.errors) {
         return true;
       }
       else {
         return false;
       }
     }
     else if (control.errors) {
       return true;
     }
     else {
       return false;
     }
   }*/

  selectItem(num: number) {
    this.activeText = this.data[num];
    this.activeOption = num;
    this.selectActivated = !this.selectActivated;
    this.form.patchValue({
      [this.controlName]: num + 1
    });
  }

  toggleMenu() {
    this.selectActivated = !this.selectActivated;
    this.form.controls[this.controlName].markAsTouched();
  }


}

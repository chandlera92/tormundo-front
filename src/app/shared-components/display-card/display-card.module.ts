import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DisplayCardComponent} from './display-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DisplayCardComponent],
  exports: [DisplayCardComponent]
})
export class DisplayCardModule { }

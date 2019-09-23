import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomSelectComponent} from './custom-select.component';
import {ValidationModule} from '../../validation/validation.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ValidationModule,
    ReactiveFormsModule
  ],
  declarations: [CustomSelectComponent],
  exports: [CustomSelectComponent]
})
export class CustomSelectModule {
}

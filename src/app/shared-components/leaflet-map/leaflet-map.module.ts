import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LeafletMapComponent],
  exports: [LeafletMapComponent]
})
export class LeafletMapModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import {ExploreRoutingModule} from './explore-routing.module';
import {AgmCoreModule} from '@agm/core';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import {MatButtonModule} from '@angular/material';
import {ExploreResolver} from './explore.resolver';

@NgModule({
  imports: [
    CommonModule,
    ExploreRoutingModule,
    AgmCoreModule,
    MatButtonModule
  ],
  declarations: [ExploreComponent,
    ListComponent,
    MapComponent,
    HeaderComponent],
  providers: [ExploreResolver]
})
export class ExploreModule { }

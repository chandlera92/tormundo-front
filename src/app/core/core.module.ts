import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {AppRoutingModule} from '../app-routing.module';
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule,
  MatStepperModule
} from '@angular/material';
import {ClickOutsideModule} from 'ng-click-outside';
import {AgmCoreModule} from '@agm/core';
import {CreateOrganizationComponent} from './create-organization/create-organization.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LeafletMapModule} from '../shared-components/leaflet-map/leaflet-map.module';
import {SearchBarModule} from '../shared-components/search-bar/search-bar.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    ClickOutsideModule,
    MatStepperModule,
    AgmCoreModule,
    LeafletMapModule,
    SearchBarModule
  ],
  declarations: [HeaderComponent, HomeComponent, FooterComponent, CreateOrganizationComponent],
  exports: [HeaderComponent, FooterComponent],
  providers: [],

})
export class CoreModule {
}

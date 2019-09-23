import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminGuard} from './admin.guard';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';

import {DashboardComponent} from './organization/dashboard/dashboard.component';
import {SettingsComponent} from './organization/settings/settings.component';
import {ProfilesComponent} from './organization/profiles/profiles.component';
import {AccountsComponent} from './organization/accounts/accounts.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImagePlaceholderComponent} from './shared/image-placeholder/image-placeholder.component';
import {AdminFileUploadComponent} from './shared/file-upload/file-upload.component';
import {UploadImageDirective} from '../shared/upload-image.directive';
import {DisplayCardModule} from '../shared-components/display-card/display-card.module';
import {AdminOrganizationDisplayCardsComponent} from './organization/display-cards/display-cards.component';
import {BasicComponent} from './organization/basic/basic.component';
import {CanNavigateAwayDialogComponent} from './shared/can-navigate-away-dialog/can-navigate-away-dialog.component';
import {HandleLanguageNavigationService} from './shared/handle-language-navigation.service';
import {QuillModule} from 'ngx-quill';

import {StoreModule} from '@ngrx/store';


import {EffectsModule} from '@ngrx/effects';
/*
import {adminReducers} from './store/admin.reducers';
*/


import {AdminEffects} from './store/admin.effects';
import {DisplayCardsResolver} from './organization/display-cards/display-cards.resolver';
import {reducerProvider, reducerToken} from './store/admin.reducers';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DisplayCardModule,
    QuillModule,
    // StoreModule.forFeature('organizationAdminState', adminOrganizationReducers),
    StoreModule.forFeature('admin', reducerToken),
    EffectsModule.forFeature(AdminEffects)
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    SettingsComponent,
    ProfilesComponent,
    AccountsComponent,
    AdminOrganizationDisplayCardsComponent,
    ImagePlaceholderComponent,
    AdminFileUploadComponent,
    UploadImageDirective,
    BasicComponent,
    CanNavigateAwayDialogComponent
  ],
  providers: [AdminGuard, HandleLanguageNavigationService, DisplayCardsResolver, reducerProvider],
  entryComponents: [AdminFileUploadComponent, CanNavigateAwayDialogComponent]
})
export class AdminModule {
}

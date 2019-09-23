import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import {Globals} from './globals';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {ValidationModule} from './validation/validation.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomSelectModule} from './shared/custom-select/custom-select.module';
import {CoreModule} from './core/core.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserModule} from './user/user.module';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';

import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {reducers} from './store/app.reducers';
import {AuthModule} from './auth/auth.module';
import {UserEffects} from './user/store/user.effects';
import {CoreEffects} from './core/store/core.effects';
import * as fromAuth from './auth/store/auth.actions';
import {HttpEndSnackbarComponent} from './shared/http-end-snackbar.component';
import {MatProgressBarModule, MatSnackBarModule} from '@angular/material';


export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {

    switch (action.type) {
      case fromAuth.LOGOUT:
        state = null;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

import {HTTPListener, HTTPStatus} from './shared/interceptors/http-loading.service';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {ExploreEffects} from './explore/store/explore.effects';
import {LocalesResolver} from './shared/locales.resolver';
import {ImageUploadService} from './shared/image-upload.service';
import {CanDeactivateGuard} from './shared/guards/can-deactivate';
import {ErrorInterceptorService} from './shared/interceptors/error-interceptor.service';

const RxJS_Services = [HTTPListener, HTTPStatus];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HttpEndSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:4200', 'localhost:1337']
      }
    }),
    ValidationModule,
    FormsModule,
    ReactiveFormsModule,
    CustomSelectModule,
    CoreModule,
    UserModule,
    AuthModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AuthEffects, UserEffects, CoreEffects, ExploreEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [Globals,
    ...RxJS_Services,
    GoogleMapsAPIWrapper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    LocalesResolver,
    ImageUploadService,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent],
  exports: [
    MatSnackBarModule
  ],
  entryComponents: [HttpEndSnackbarComponent]
})
export class AppModule {
}

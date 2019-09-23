import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as CoreActions from '../core/store/core.actions';
import {filter, map, take} from 'rxjs/internal/operators';


@Injectable()
export class LocalesResolver implements Resolve<any> {

  constructor(private store: Store<fromApp.AppState>) {
  }

  resolve(): Observable<any> {
    this.initLocaleData();
    return this.waitForLocalesToLoad();
  }

  waitForLocalesToLoad(): Observable<any> {
    return this.store.select('core')
      .pipe(
        map(store => {
          return {
            countries: store.countries,
            languages: store.languages
          };
        }),
        filter(locales => !!locales.languages || !!locales.countries),
        take(1)
      );
  }

  initLocaleData(): void {
    this.store
      .pipe(
        take(1)
      ).subscribe(store => {
      if (!store.core.countries || !store.core.languages) {
        this.store.dispatch(new CoreActions.TryGetLocales());
      }
    });
  }

  /* getLocales(): Observable<any> {
     this.localeSubscription = this.store.select('core')
       .subscribe((data: any) => {
         this.localeData = data;
       });

     if (!this.localeData.countries || !this.localeData.languages) {
       this.store.dispatch(new CoreActions.TryGetLocales());
       this.updates$
         .ofType(CoreActions.GET_LOCALES)
         .takeUntil(this.destroyed$)
         .do((res: any) => {
           console.log(res)
           console.log(this.localeData)
           return this.localeData;
         })
         .subscribe();
     }
     else {
       return Observable.of(false);
     }*/

  //return this.localeData;
  /*.select('core')
  .do((data: any) => {
    if (!data.countries || !data.languages) {
      this.store.dispatch(new CoreActions.TryGetLocales());
    }
  })
  .filter((data) => {
    console.log(data);
    return data;
  })
  .take(1);*/
}

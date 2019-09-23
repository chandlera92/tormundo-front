import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {Globals} from '../globals';
import {catchError, map} from 'rxjs/internal/operators';

@Injectable()
export class LocalesService {

  constructor(public globals: Globals, public http: HttpClient) {
  }

  getCountriesAndLanguages() {
    return this.http.get<any>(this.globals.getCountriesAndLanguage, {observe: 'body', responseType: 'json'})
      .pipe(
        map(response => response),
        catchError(err => err)
      );
  }

}

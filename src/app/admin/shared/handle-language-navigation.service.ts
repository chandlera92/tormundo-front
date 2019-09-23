import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {Actions} from '@ngrx/effects';
import {MatDialog} from '@angular/material';
import {combineLatest, Observable, ReplaySubject} from 'rxjs';
import {take} from 'rxjs/internal/operators';


import {CanNavigateAwayDialogComponent} from './can-navigate-away-dialog/can-navigate-away-dialog.component';

import {isEqual, cloneDeep} from 'lodash';
import {Language} from '../../core/models/locales';

@Injectable()
export class HandleLanguageNavigationService {

  private updatedItem: ReplaySubject<any> = new ReplaySubject<any>(1);
  private languagesInUse$: ReplaySubject<[number]> = new ReplaySubject<[number]>(1);

  private languages: Language[];
  private languagesInUse: [any];
  private items: [any];

  private currentItem: any;
  private emptyItem: any;
  private organization: any;
  private editedItem: any;
  private nextItem: any;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private updates$: Actions,
              private location: Location,
              public dialog: MatDialog) {
  }

  getUpdatedItem(): Observable<any> {
    return this.updatedItem.asObservable();
  }

  getLanguagesInUse(): Observable<any> {
    return this.languagesInUse$.asObservable();
  }

  addLanguageInUse(int: number) {
    this.languagesInUse.push(int);
    this.languagesInUse$.next(this.languagesInUse);
  }

  setInitialState(languages, items, organization, empty) {
    this.languages = languages;

    this.languagesInUse = items.map(item => item.language_id);
    this.languagesInUse$.next(this.languagesInUse);
    this.items = items;
    this.organization = organization;
    this.emptyItem = cloneDeep(empty);

    let initialLanguage;

    const urlParams = combineLatest(
      this.route.params,
      this.route.queryParams,
      (params, queryParams) => ({...params, ...queryParams})
    );

    urlParams
      .pipe(
        take(1)
      )
      .subscribe(params => {
        initialLanguage = params.lang;
      });

    if (initialLanguage) {
      const getInitialLangId = this.languages.find(lang => initialLanguage === lang.code).id;
      const getInitialItem = items.find(item => item.language_id === getInitialLangId);

      if (getInitialItem) {
        this.currentItem = cloneDeep(getInitialItem);
        this.updatedItem.next({item: getInitialItem, items: items});
      }
      else {
        const getOrganizationDefaultLang = languages.find(lang => lang.id === organization.language_id);
        const getDefaultItem = items.find(item => item.language_id === getOrganizationDefaultLang.id);
        this.currentItem = cloneDeep(getDefaultItem);
        this.setNewLangUrl();
        this.updatedItem.next({item: getDefaultItem, items: items});
      }
    }
    else {
      const getOrganizationDefaultLang = languages.find(lang => lang.id === organization.language_id);
      const getDefaultItem = items.find(item => item.language_id === getOrganizationDefaultLang.id);
      this.currentItem = cloneDeep(getDefaultItem);
      this.setNewLangUrl();
      this.updatedItem.next({item: getDefaultItem, items: items});
    }
  }

  setNewLangUrl() {
    const getLang = this.languages.find(lang => this.currentItem.language_id === lang.id);
    this.location.replaceState(this.router.createUrlTree([this.router.url.split('?')[0]], {queryParams: {lang: getLang.code}}).toString());
  }

  triggerDialog(data) {
    return this.dialog.open(CanNavigateAwayDialogComponent, {
      width: '800px',
      data: data,
      id: 'languageNavigateDialog'
    })
      .afterClosed()
      .pipe(
        take(1)
      )
      .subscribe(res => {
        // todo: change res.new to better var name?
        if (res.error) {
          this.updatedItem.next({item: cloneDeep(this.currentItem)});
        }
        else {
          if (res.new) {
            this.addLanguageInUse(this.nextItem.language_id);
          }
          this.currentItem = cloneDeep(this.nextItem);
          this.setNewLangUrl();
          this.updatedItem.next({item: cloneDeep(this.currentItem)});
        }
      });
  }

  updateItems(editedItem, updatedLanguage, dialogData) {
    const findNewCard = this.items.find(item => item.language_id === updatedLanguage);
    const checkEqual = isEqual(this.currentItem, editedItem);

    dialogData.item_equal = checkEqual;

    if (findNewCard) {
      this.nextItem = findNewCard;
      if (checkEqual) {
        this.currentItem = cloneDeep(findNewCard);
        this.setNewLangUrl();
        this.updatedItem.next({item: findNewCard});
      }
      else {
        dialogData.item = findNewCard;
        dialogData.editedItem = editedItem;
        this.triggerDialog(dialogData);
      }
    }
    else if (!findNewCard) {
      this.nextItem = cloneDeep(this.emptyItem);
      const checkLanguageExists = this.languages.find(lang => lang.id === updatedLanguage);
      if (checkLanguageExists) {
        dialogData.insertNew = true;
        dialogData.item = cloneDeep(this.emptyItem);
        dialogData.item.language_id = updatedLanguage;
        this.triggerDialog(dialogData);
      }
      else {
        // TODO: Warn user language is not available. (THIS IS AN EDGE CASE SCENARIO, VERY UNLIKELY TO HAPPEN)
      }
    }
    else {
      // TODO: Warn user language is not available. (THIS IS AN EDGE CASE SCENARIO, VERY UNLIKELY TO HAPPEN)
    }
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Organization, OrganizationCard} from '../../models/organization';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Actions} from '@ngrx/effects';
/*
import * as AdminActions from '../../store/admin.actions';
*/
import * as AdminDisplayCardActions from './store/display-cards.actions';
import {OrganizationDisplayCard} from '../../../core/models/organization-display-card';
import * as DisplayCardActions from './store/display-cards.actions';


import {MatDialog} from '@angular/material';
import {CanNavigateAwayDialogComponent} from '../../shared/can-navigate-away-dialog/can-navigate-away-dialog.component';

import {isEqual, isEmpty, cloneDeep} from 'lodash';
import {HandleLanguageNavigationService} from '../../shared/handle-language-navigation.service';
import * as TestSelectors from './store/display-cards.selectors';
import * as organizationSelectors from '../store/organization.selectors';
import * as displayCardSelectors from './store/display-cards.selectors';
import {takeWhile} from 'rxjs/internal/operators';

@Component({
  selector: 'app-admin-organization-display-cards',
  templateUrl: './display-cards.component.html',
  styleUrls: ['./display-cards.component.scss']
})
export class AdminOrganizationDisplayCardsComponent implements OnInit, OnDestroy {

  public subscriptionAlive = true;
  public organization: Organization;
  public languages;
  public cards: OrganizationDisplayCard[];
  public activeCard: OrganizationDisplayCard;

  public cardForm: FormGroup;
  public languagesInUse = [];

  private canDeactivateDialog;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private updates$: Actions,
              public dialog: MatDialog,
              private languageNavigation: HandleLanguageNavigationService) {
  }

  /*
    canDeactivate(): Observable<boolean> | boolean {
      this.canDeactivateDialog = this.dialog.open(CanNavigateAwayDialogComponent);
      return this.canDeactivateDialog.afterClosed()
        .map(result => {
          return result.close;
        })
        .first();
    }
  */

  changeDisplayCardImage(file) {
    this.activeCard.file = file;
  }

  ngOnInit() {
    const routeData = this.route.snapshot.data;

    this.languages = routeData.locales.languages;
    this.cards = routeData.displayCards.cards;
    this.organization = routeData.displayCards.organization;

    const emptyCard = new OrganizationDisplayCard(null, this.organization.name, '', null, false, null, this.organization.location);

    this.cardForm = new FormGroup({
      description: new FormControl('', Validators.required),
      language_id: new FormControl('')
    });

    /*
        this.updates$
          .ofType(AdminActions.SET_ACTIVE_FILE)
          .takeWhile(() => this.subscriptionAlive)
          .do((res: any) => {
            this.activeCard.file = res.payload;

            this.store.dispatch(new AdminDisplayCardActions.SetOrganizationDisplayCardPreview(this.activeCard));
            this.store.dispatch(new DisplayCardActions.SetOrganizationDisplayCard(this.activeCard));
          })
          .subscribe();*/

    this.languageNavigation.getUpdatedItem()
      .pipe(
        takeWhile(() => this.subscriptionAlive)
      )
      .subscribe(res => {
        if (res) {
          // this.updateToNewCard(res);
          this.activeCard = res.item;

          // this.store.dispatch(new AdminDisplayCardActions.SetOrganizationDisplayCardPreview(this.activeCard));
          // this.store.dispatch(new DisplayCardActions.SetOrganizationDisplayCard(this.activeCard));

          this.cardForm.patchValue({
            description: this.activeCard.description,
            language_id: this.activeCard.language_id
          });
          //   this.store.dispatch(new AdminActions.SetOrganizationDisplayCard(cloneDeep(this.activeCard)));

        }
      });

    this.languageNavigation.getLanguagesInUse()
      .pipe(
        takeWhile(() => this.subscriptionAlive)
      )
      .subscribe(languages => {
        this.languagesInUse = languages;
      });

    /*   this.store.select(displayCardSelectors.getDisplayCards)
         .take(1)
         .subscribe(res => {
           //console.log(res)
           this.organization = res;
           // this.cards = res.organization.cards;
           // this.languageNavigation.setInitialState(this.languages, res.organization.cards, res.organization, emptyCard);
         });
   */

    this.languageNavigation.setInitialState(this.languages, this.cards, this.organization, emptyCard);

    console.log(this.activeCard);

  }

  updateDescription(ev) {
    const updatedValue = ev.target.value;
    this.activeCard.description = updatedValue;
  }

  updateToNewCard(card) {
    if (card.items) {
      // this.cards = card.items;
      // this.languagesInUse.push(card.item.language_id);
    }

    this.activeCard = card.item;
    // this.unEditedActiveCard = cloneDeep(card.item);
    //  this.activeCard = card.item;

    this.cardForm.patchValue({
      description: this.activeCard.description,
      language_id: this.activeCard.language_id
    });

    // this.store.dispatch(new AdminActions.SetOrganizationDisplayCardEdit(this.activeCard));
    // this.store.dispatch(new AdminActions.SetOrganizationDisplayCard(cloneDeep(this.unEditedActiveCard)));
  }


  updateRouteParams(ev) {
    this.cardForm.patchValue({
      language_id: this.activeCard.language_id
    });

    const dispatchEvent = new DisplayCardActions.UpdateOrganizationDisplayCard({orgName: this.organization.name, data: this.activeCard});

    const dialogData = {
      dispatchEvent: dispatchEvent,
      type: 'card'
    };

    this.languageNavigation.updateItems(this.activeCard, ev.value, dialogData);

  }


  ngOnDestroy() {
    this.subscriptionAlive = false;
  }

}

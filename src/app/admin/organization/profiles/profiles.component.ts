import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';

import {Organization, OrganizationProfile} from '../../models/organization';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs';

import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy {

  public subscriptionAlive = true;
  public organization: Organization;
  public profiles: OrganizationProfile[];
  public activeProfile: OrganizationProfile;
  public activeLanguages = [];
  public routeParams;
  public languages;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    /*this.languages = this.route.snapshot.data.locales.languages;
    const urlParams = Observable.combineLatest(
      this.route.params,
      this.route.queryParams,
      (params, queryParams) => ({...params, ...queryParams})
    );

    // Subscribe to the single observable, giving us both
    urlParams
      .takeWhile(() => this.subscriptionAlive)
      .subscribe(routeParams => {
        // routeParams containing both the query and route params
        this.routeParams = routeParams;
      });

    this.store.select('admin')
      .takeWhile(() => this.subscriptionAlive)
      .subscribe(res => {
        this.organization = res.organization;
        this.profiles = res.organization.profiles;

        const activeLanguages = [];

        for (const profile of res.organization.profiles) {
          activeLanguages.push(this.languages.find(lang => lang.id === profile.language_id));
        }

        this.activeLanguages = activeLanguages;

        if (this.routeParams.lang) {
          const getRequestedProfile = res.organization.profiles.find(pro => pro.language_id === this.languages.find(lang => this.routeParams.lang === lang.code).id);
          if (getRequestedProfile) {
            this.activeProfile = getRequestedProfile;
          }
          else {
            this.activeProfile = res.organization.profiles.find(pro => pro.language_id === this.organization.language_id);
          }
        }
        else {
          this.activeProfile = res.organization.profiles.find(pro => pro.language_id === this.organization.language_id);
        }

      });*/

  }

  ngOnDestroy() {
    this.subscriptionAlive = false;
  }

}

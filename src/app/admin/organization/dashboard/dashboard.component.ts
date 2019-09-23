import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import {Subscription, Observable} from 'rxjs';
import {Organization} from '../../../core/models/organization';

import * as organizationSelectors from '../store/organization.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  organization$: Observable<Organization>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.organization$ = this.store.select(organizationSelectors.getOrganizationState);
  }

}

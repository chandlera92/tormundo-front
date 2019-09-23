import {Component, OnInit} from '@angular/core';
import {Organization} from '../core/models/organization';
import {Store} from '@ngrx/store';
import * as organizationSelectors from './organization/store/organization.selectors';
import * as fromApp from '../store/app.reducers';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  organization$: Observable<Organization>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.organization$ = this.store.select(organizationSelectors.getOrganizationState);
  }

}

/* TODO: Click checkboxes from anywhere inside div */
/* TODO: Center content correctly (don't force with margin -top, should be dynamic) */
/* TODO: Fix stepper header, should not be able to click next stage if first form not filled out. */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatStepper} from '@angular/material';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import * as CoreActions from '../store/core.actions';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {

  public detailsForm: FormGroup;
  public eligibilityForm: FormGroup;

  public countries;
  public languages;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  stepBack(stepper: MatStepper) {
    stepper.previous();
  }

  createOrganization() {
    const details = this.detailsForm.value;
    const eligibility = this.eligibilityForm.value;
    const orgInfo = {
      name: details.name,
      description: details.description,
      country_id: eligibility.country_id,
      language_id: eligibility.language_id
    };

    this.store.dispatch(new CoreActions.TryAddOrganization(orgInfo));
  }

  ngOnInit() {
    const locales = this.route.snapshot.data.locales;

    this.countries = locales.countries;
    this.languages = locales.languages;

    this.detailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.eligibilityForm = this.formBuilder.group({
      country_id: ['', Validators.required],
      language_id: ['', Validators.required],
      check1: ['', Validators.required],
      check2: ['', Validators.required],
      check3: ['', Validators.required]
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public mapSearchForm: FormGroup;
  public localeSubscription: Subscription;


  public countries;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.localeSubscription = this.store.select('core')
      .subscribe(data => {
        this.countries = data.countries;
      });


    this.mapSearchForm = this.formBuilder.group({
      country_id: ['', Validators.required]
    });
  }

}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrganizationDisplayCard} from '../../core/models/organization-display-card';

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrls: ['./display-card.component.scss']
})
export class DisplayCardComponent implements OnInit, OnDestroy {

  @Input() displayCard: OrganizationDisplayCard;
  public subscriptionAlive = true;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionAlive = false;
  }

}

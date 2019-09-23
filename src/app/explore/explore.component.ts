import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public initData: any;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.initData = data.data;
    });
  }

}

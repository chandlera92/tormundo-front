import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-explore-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() initData: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.initData);
  }

}

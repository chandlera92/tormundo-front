import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public navLinks = [
    {
      label: 'Account',
      path: 'account'
    },
    {
      label: 'Edit profile',
      path: 'profile'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}

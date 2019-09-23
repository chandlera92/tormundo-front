import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-http-end-snackbar',
  template: `<p>{{data.message}}</p>`,
  styles: [`::ng-deep .http-end-snackbar {
    background: white;
    box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
    color: #39a712;
    text-align:center;
  }

  `],
})
export class HttpEndSnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data);
  }
}

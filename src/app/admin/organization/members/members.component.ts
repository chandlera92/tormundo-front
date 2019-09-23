import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import {Subscription} from 'rxjs';
import {Members} from '../../models/members';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['id', 'User', 'Created by', 'Member for', 'blank'];
  public membersSubscription: Subscription;
  public dataSource: MatTableDataSource<Members>;
  public ready = false;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
   /* this.membersSubscription = this.store.select('admin')
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data.members);
        this.ready = true;
      });*/
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

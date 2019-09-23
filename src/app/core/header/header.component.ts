import {Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import {NavigationStart, Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {


  @ViewChild('exploreSearch') exploreSearch: ElementRef;

  public authSubscription: Subscription;
  public activateNavMenu = false;
  public activateSearchNav = false;

  public authInfo: {
    gravatar: string,
    authenticated: boolean,
    token: string,
    user_name: string,
    organizations: [{ id: number, name: string }]
  };

  public authenticated: boolean;

  public settingsUrl = [
    {
      name: 'Account',
      url: 'settings/account'
    },
    {
      name: 'Edit profile',
      url: 'settings/profile'
    }
  ];

  constructor(private store: Store<fromApp.AppState>,
              public router: Router) {
  }

  onClickedOutside(e: Event) {
    if (this.activateNavMenu && e.target['id'] !== 'nav-profileImg') {
      this.activateNavMenu = false;
    }
  }


  ngOnInit() {

    this.store.dispatch(new AuthActions.InitAuth());
    this.authSubscription = this.store.select('auth')
      .subscribe(data => {
        this.authInfo = data;
      });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.activateNavMenu = false;
        this.activateSearchNav = false;
      }
    });
  }

  onLogout() {
    this.activateNavMenu = false;
    this.authenticated = false;
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}



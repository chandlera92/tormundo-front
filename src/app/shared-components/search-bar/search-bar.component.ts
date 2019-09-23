import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @ViewChild('exploreSearch') exploreSearch: ElementRef;

  public activateNavMenu = false;
  public activateSearchNav = false;
  public activeSearchListHover: number;


  public places: any = [];
  public showPlaces = false;


  constructor(private renderer: Renderer2, private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.renderer.listen('window', 'keydown', (e => {
      if (this.showPlaces) {
        switch (e.keyCode) {
          case 40:
            if (this.activeSearchListHover === (this.places.length - 1)) {
              this.activeSearchListHover = 0;
            }
            else {
              this.activeSearchListHover += 1;
            }
            break;
          case 38:
            if (this.activeSearchListHover === 0) {
              this.activeSearchListHover = (this.places.length - 1);
            }
            else {
              this.activeSearchListHover -= 1;
            }
            break;
          case 13:
            console.log('enter?');
            break;
        }
      }
    }));
  }

  onClickedOutside(e: Event) {
    if (this.activateNavMenu && e.target['id'] !== 'nav-profileImg') {
      this.activateNavMenu = false;
    }
  }

  onSearchClickedOutside(e: Event) {
    this.activateSearchNav = false;

  }

  onSearchListItemHover(e: Event) {
    e.preventDefault();
    const el = (<HTMLElement>e.target);
    const index = parseInt(el.getAttribute('index'), 8);

    if (index !== this.activeSearchListHover) {
      if (!el.classList.contains('search-list-item')) {
        let getParent = el;
        while (!getParent.classList.contains('search-list-item')) {
          getParent = getParent.parentElement;
        }
        const parentIndex = parseInt(getParent.getAttribute('index'), 8);
        this.activeSearchListHover = parentIndex;
      }
      else {
        this.activeSearchListHover = index;
      }
    }
  }

  onSearchInput(e) {
   console.log('input..');
  }
}


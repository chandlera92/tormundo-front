import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HTTPStatus} from './shared/interceptors/http-loading.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  public showFooter = true;

  // @ViewChild('footer') footer: ElementRef;
  @ViewChild('header') header: ElementRef;
  @ViewChild('mainContent') mainContent: ElementRef;

  HTTPActivity: boolean;

  constructor(private httpStatus: HTTPStatus, private renderer: Renderer2, public router: Router) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.HTTPActivity = status;
    });
  }

  ngAfterViewInit() {
    /*    console.log(this.renderer.selectRootElement(this.footer['nativeElement']));
        console.log(this.footer.nativeElement);*/
    const header = this.renderer.selectRootElement(this.header).nativeElement;
    // const footer = this.renderer.selectRootElement(this.footer).nativeElement;
    const main = this.renderer.selectRootElement(this.mainContent).nativeElement;

    const deductHeight = header.clientHeight;

    // + footer.clientHeight;

    this.renderer.setStyle(main, 'min-height', 'calc(100% - ' + deductHeight + 'px)');

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('explore') || val.url.includes('admin')) {
          if (this.showFooter === true) {
            this.showFooter = false;
            this.renderer.setStyle(main, 'min-height', 'calc(100% - ' + header.clientHeight + 'px)');
          }
        }
        else if (this.showFooter === false) {
          this.showFooter = true;
          this.renderer.setStyle(main, 'min-height', 'calc(100% - ' + deductHeight + 'px)');
        }
      }

    });
  }

  ngOnInit() {


  }


}

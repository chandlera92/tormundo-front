import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanNavigateAwayDialogComponent } from './can-navigate-away-dialog.component';

describe('CanNavigateAwayDialogComponent', () => {
  let component: CanNavigateAwayDialogComponent;
  let fixture: ComponentFixture<CanNavigateAwayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanNavigateAwayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanNavigateAwayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

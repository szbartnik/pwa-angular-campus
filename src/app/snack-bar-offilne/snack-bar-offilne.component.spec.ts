import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarOffilneComponent } from './snack-bar-offilne.component';

describe('SnackBarOffilneComponent', () => {
  let component: SnackBarOffilneComponent;
  let fixture: ComponentFixture<SnackBarOffilneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarOffilneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarOffilneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

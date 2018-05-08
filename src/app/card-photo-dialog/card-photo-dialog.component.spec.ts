import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPhotoDialogComponent } from './card-photo-dialog.component';

describe('CardPhotoDialogComponent', () => {
  let component: CardPhotoDialogComponent;
  let fixture: ComponentFixture<CardPhotoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPhotoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

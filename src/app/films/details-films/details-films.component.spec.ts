import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFilmsComponent } from './details-films.component';

describe('DetailsFilmsComponent', () => {
  let component: DetailsFilmsComponent;
  let fixture: ComponentFixture<DetailsFilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

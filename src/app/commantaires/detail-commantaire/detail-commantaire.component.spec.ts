import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCommantaireComponent } from './detail-commantaire.component';

describe('DetailCommantaireComponent', () => {
  let component: DetailCommantaireComponent;
  let fixture: ComponentFixture<DetailCommantaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCommantaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCommantaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

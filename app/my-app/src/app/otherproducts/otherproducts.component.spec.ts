import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherproductsComponent } from './otherproducts.component';

describe('OtherproductsComponent', () => {
  let component: OtherproductsComponent;
  let fixture: ComponentFixture<OtherproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

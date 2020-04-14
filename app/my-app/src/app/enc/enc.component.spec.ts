import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncComponent } from './enc.component';

describe('EncComponent', () => {
  let component: EncComponent;
  let fixture: ComponentFixture<EncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

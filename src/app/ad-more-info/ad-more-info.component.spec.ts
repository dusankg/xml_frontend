import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdMoreInfoComponent } from './ad-more-info.component';

describe('AdMoreInfoComponent', () => {
  let component: AdMoreInfoComponent;
  let fixture: ComponentFixture<AdMoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdMoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

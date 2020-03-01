import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduseradmComponent } from './adduseradm.component';

describe('AdduseradmComponent', () => {
  let component: AdduseradmComponent;
  let fixture: ComponentFixture<AdduseradmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduseradmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduseradmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

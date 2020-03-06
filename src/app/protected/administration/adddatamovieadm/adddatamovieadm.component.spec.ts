import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddatamovieadmComponent } from './adddatamovieadm.component';

describe('AdddatamovieadmComponent', () => {
  let component: AdddatamovieadmComponent;
  let fixture: ComponentFixture<AdddatamovieadmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddatamovieadmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddatamovieadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

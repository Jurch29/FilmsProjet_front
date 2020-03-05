import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamovieadmComponent } from './datamovieadm.component';

describe('DatamovieadmComponent', () => {
  let component: DatamovieadmComponent;
  let fixture: ComponentFixture<DatamovieadmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatamovieadmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatamovieadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

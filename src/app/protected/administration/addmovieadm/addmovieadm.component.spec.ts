import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmovieadmComponent } from './addmovieadm.component';

describe('AddmovieadmComponent', () => {
  let component: AddmovieadmComponent;
  let fixture: ComponentFixture<AddmovieadmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmovieadmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmovieadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

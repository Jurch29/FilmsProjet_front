import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordadmComponent } from './changepasswordadm.component';

describe('ChangepasswordadmComponent', () => {
  let component: ChangepasswordadmComponent;
  let fixture: ComponentFixture<ChangepasswordadmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepasswordadmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepasswordadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

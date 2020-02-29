import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersadmComponent } from './usersadm.component';

describe('UsersadmComponent', () => {
  let component: UsersadmComponent;
  let fixture: ComponentFixture<UsersadmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersadmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

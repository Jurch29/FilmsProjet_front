import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartHistoryComponent } from './user-cart-history.component';

describe('UserCartHistoryComponent', () => {
  let component: UserCartHistoryComponent;
  let fixture: ComponentFixture<UserCartHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartHistoryPurchaseComponent } from './user-cart-history-purchase.component';

describe('UserCartHistoryPurchaseComponent', () => {
  let component: UserCartHistoryPurchaseComponent;
  let fixture: ComponentFixture<UserCartHistoryPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartHistoryPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartHistoryPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

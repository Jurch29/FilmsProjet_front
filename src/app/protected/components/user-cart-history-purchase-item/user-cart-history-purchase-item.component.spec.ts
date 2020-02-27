import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartHistoryPurchaseItemComponent } from './user-cart-history-purchase-item.component';

describe('UserCartHistoryPurchaseItemComponent', () => {
  let component: UserCartHistoryPurchaseItemComponent;
  let fixture: ComponentFixture<UserCartHistoryPurchaseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartHistoryPurchaseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartHistoryPurchaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentHistoryComponent } from './user-comment-history.component';

describe('UserCommentHistoryComponent', () => {
  let component: UserCommentHistoryComponent;
  let fixture: ComponentFixture<UserCommentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCommentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

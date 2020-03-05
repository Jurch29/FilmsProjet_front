import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentHistoryCommentComponent } from './user-comment-history-comment.component';

describe('UserCommentHistoryCommentComponent', () => {
  let component: UserCommentHistoryCommentComponent;
  let fixture: ComponentFixture<UserCommentHistoryCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCommentHistoryCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommentHistoryCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

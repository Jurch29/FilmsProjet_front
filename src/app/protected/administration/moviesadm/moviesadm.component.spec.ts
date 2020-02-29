import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesadmComponent } from './moviesadm.component';

describe('MoviesadmComponent', () => {
  let component: MoviesadmComponent;
  let fixture: ComponentFixture<MoviesadmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesadmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

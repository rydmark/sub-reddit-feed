import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryCommentComponent } from './entry-comment.component';

describe('EntryCommentComponent', () => {
  let component: EntryCommentComponent;
  let fixture: ComponentFixture<EntryCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, Input } from '@angular/core';
import { EntryComment } from '../entry-comment';

@Component({
  selector: 'app-entry-comment',
  templateUrl: './entry-comment.component.html',
  styleUrls: ['./entry-comment.component.css']
})
export class EntryCommentComponent implements OnInit {
  @Input() entryComment: EntryComment;

  constructor() { }

  ngOnInit() {
  }

}

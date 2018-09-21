import { Component, OnInit } from '@angular/core';
import { SubRedditService } from '../sub-reddit.service';
import { Entry } from '../entry';
@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  entries: Entry[];
  entriesObject: Object;
  entryToShow: string;
  constructor(private subRedditService: SubRedditService) { }

  getEntries(): void {
    this.subRedditService.getEntries()
      .subscribe(entries => this.entries = entries);
  }

  ngOnInit() {
    this.getEntries();
  }

}

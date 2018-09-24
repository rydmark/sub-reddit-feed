import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SubRedditService } from '../sub-reddit.service';
import { EntryDetails } from '../entry-details';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.css']
})
export class EntryDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private subRedditService: SubRedditService,
    private location: Location
  ) {}

  entryDetails: EntryDetails;

  ngOnInit() {
    this.getEntryDetails();
  }

  getEntryDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const subreddit = this.route.snapshot.paramMap.get('subreddit');
    this.subRedditService.getEntryDetails(subreddit, id)
      .subscribe(entryDetails => this.entryDetails = entryDetails);
  }
}

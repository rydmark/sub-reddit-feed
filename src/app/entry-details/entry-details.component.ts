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

  tjohej: EntryDetails;

  ngOnInit() {
    this.getEntryDetails();
  }

  getEntryDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.subRedditService.getEntryDetails(id)
      .subscribe(entryDetails => this.tjohej = entryDetails);
  }
}

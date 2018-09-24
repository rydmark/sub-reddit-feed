import { Component, OnInit } from '@angular/core';
import { SubRedditService } from '../sub-reddit.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntryPage } from '../entry-page';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  entryPage: EntryPage;
  subreddit: string;
  before: string;
  after: string;
  count: number;

  defaultLimit = 10;
  selectedLimit: number;
  limits = [5, 10, 25]

  constructor(
    private route: ActivatedRoute,
    private subRedditService: SubRedditService,
    private location: Location,
    private router: Router
  ) {}

  getEntries(): void {  
    this.subreddit = this.route.snapshot.paramMap.get('subreddit');
    this.route.queryParamMap
    .subscribe(response => {
      console.log(response);
      var params = response['params'];
      this.after = params.after;
      this.before = params.before;
      this.count = params.count;
      
      this.subRedditService.getEntries(this.subreddit, this.selectedLimit, this.before, this.after, this.count)
      .subscribe(entryPage => this.entryPage = entryPage);
    });
    
    
  }

  goToPreviousPage(): void {
    if(this.count)    
      if(this.after)
        this.count = +this.count +1;
      else
        this.count = this.count - this.entryPage.entries.length;

    if(this.count)
    {
      this.router.navigate(['/r/'+ this.subreddit], { queryParams: { before: this.entryPage.before, count: this.count } });
    }
    else{ 
        this.router.navigate(['/r/'+ this.subreddit], { queryParams: { before: this.entryPage.before } });
    }    
    window.scroll(0,0);
  }

  goToNextPage(): void {
    if(this.count)
    {
      if(this.before)
      this.count = +this.count -1;
    else
      this.count = +this.count + this.entryPage.entries.length;
    }    
    else
      this.count = this.entryPage.entries.length;

    this.router.navigate(['/r/'+ this.subreddit], { queryParams: { after: this.entryPage.after, count: this.count } });
    window.scroll(0,0);
  }

  limitChanged(value): void {
    this.selectedLimit = value;
    if(this.location.path() == '/r/'+ this.subreddit){
      this.getEntries();
    }
    else
    {
      this.router.navigate(['/r/'+ this.subreddit]);
    }
  }

  ngOnInit() {
    this.selectedLimit = this.defaultLimit;
    this.getEntries();
  }

}

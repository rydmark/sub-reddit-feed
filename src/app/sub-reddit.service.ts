import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Entry } from './entry';
import { EntryDetails } from './entry-details';
import { catchError, map, tap } from 'rxjs/operators';
//import { pipe } from '@angular/core/src/render3/pipe';
const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})


export class SubRedditService {

  private baseUrl = "https://www.reddit.com/r/"
  private defaultSubreddit = "sweden";

  constructor(private http: HttpClient) { }

  getEntries(): Observable<Entry[]> {
    var requestUrl = this.baseUrl + this.defaultSubreddit + ".json?limit=10";
    return this.http.jsonp(requestUrl, 'jsonp').pipe(
      tap(response => console.log('response: ' + response)),
      map(response => response['data']['children']),
      map(list =>  {
        var entries = [];
        list.forEach(element => {
          var entry = this.getEntryFromRawJson(element['data']);
          entries.push(entry);
        });
        return entries;
      }));
  }

  getEntryDetails(id: string) : Observable<EntryDetails> {
    var requestUrl = this.baseUrl + this.defaultSubreddit + "/comments/" + id + ".json";
    return this.http.jsonp(requestUrl, 'jsonp').pipe(
      tap(response => console.log('response: ' + response)),
      map(response =>  {
        var entryDetails = new EntryDetails();
        var rawEntry = response[0]['data']['children'][0];
        var entry = this.getEntryFromRawJson(rawEntry['data']);
         entryDetails.entry = entry;
        
        var rawRootComments = response[1]['data']['children'];
        var numberOfRootComments = 0;
        rawRootComments.forEach(rawRootComments => {
          numberOfRootComments++;
        });
        entryDetails.num_root_comments = numberOfRootComments;
        return entryDetails;
      }));
  }

  private getEntryFromRawJson(rawEntry) : Entry
  {
    var entry = new Entry();
    entry.title = rawEntry['title'];
    entry.author = rawEntry['author'];
    entry.created = new Date(rawEntry['created_utc']*1000);
    entry.id = rawEntry['id'];
    entry.num_comments = rawEntry['num_comments'];
    entry.permalink = rawEntry['permalink'];
    entry.score = rawEntry['score'];
    entry.thumbnail = rawEntry['thumbnail'];
    entry.selftext = rawEntry['selftext'];
    return entry;
  }
}

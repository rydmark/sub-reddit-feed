import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from './entry';
import { EntryDetails } from './entry-details';
import { catchError, map, tap } from 'rxjs/operators';
import { EntryPage } from './entry-page';
import { EntryComment } from './entry-comment';


@Injectable({
  providedIn: 'root'
})

export class SubRedditService {

  private baseUrl = "https://www.reddit.com/r/"

  constructor(private http: HttpClient) { }

  getEntries(subreddit: string, limit:number, before:string, after:string, count: number): Observable<EntryPage> {
    var query = '?limit=' + (limit != null ? limit : '10');
    if(before != null)
    {
      query += "&before=" + before;
    }
    else if(after != null)
    {
      query += "&after=" + after;
    }
    if(count != null)
    {
      query += "&count=" + count;
    }
    var requestUrl = this.baseUrl + subreddit + '.json' + query;
    return this.http.jsonp(requestUrl, 'jsonp').pipe(
      map(response =>  {
        var entryPage = new EntryPage();
        var data = response['data'];
        entryPage.before = data['before'];
        entryPage.after = data['after'];
        var entries = [];
        var list = response['data']['children'];
        list.forEach(element => {
          var entry = this.getEntryFromRawJson(element['data']);
          entries.push(entry);
        });
        entryPage.entries = entries;
        return entryPage;
      }),catchError(this.handleError('getEntries', null))
        
      );
  }

  getEntryDetails(subbreddit: string, id: string) : Observable<EntryDetails> {
    var requestUrl = this.baseUrl + subbreddit + "/comments/" + id + ".json";
    return this.http.jsonp(requestUrl, 'jsonp').pipe(
      map(response =>  {
        var entryDetails = new EntryDetails();
        var rawEntry = response[0]['data']['children'][0];
        var entry = this.getEntryFromRawJson(rawEntry['data']);
        entryDetails.entry = entry;
        entryDetails.entryComments = this.getReplies(response[1]['data']['children']);
        return entryDetails;
      }),catchError(this.handleError('getEntryDetails', null)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('error when requesting ' + operation);
      console.log(error);
      return of(result as T);
    };
  }

  private getReplies(children) : EntryComment[]
  {
    var entryComments = [];
    if(children)
    {
      children.forEach(child => {
          var entryComment = new EntryComment();
          var data = child['data'];
          entryComment.author = data['author'];
          entryComment.body = data['body'];
          entryComment.score = data['score'];
          var replies = data['replies'];
          if(replies)
            entryComment.replies = this.getReplies(replies['data']['children']);
          entryComments.push(entryComment);
      })
    }
    return entryComments;
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

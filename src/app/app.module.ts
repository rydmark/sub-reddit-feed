import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from'@angular/common/http';
import { AppComponent } from './app.component';
import { EntriesComponent } from './entries/entries.component';
import { AppRoutingModule } from './app-routing.module';
import { EntryDetailsComponent } from './entry-details/entry-details.component';
import { EntryCommentComponent } from './entry-comment/entry-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    EntryDetailsComponent,
    EntryCommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

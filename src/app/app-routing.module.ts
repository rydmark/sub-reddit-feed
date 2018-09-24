import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesComponent } from './entries/entries.component';
import { EntryDetailsComponent} from './entry-details/entry-details.component';

const fallbackSubReddit = 'todayilearned';

const routes: Routes = [
  { path: '', redirectTo: `/r/${fallbackSubReddit}`, pathMatch:'full'},
  { path: 'r/:subreddit', component: EntriesComponent, runGuardsAndResolvers: 'always'},
  { path: 'r/:subreddit/comments/:id', component: EntryDetailsComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

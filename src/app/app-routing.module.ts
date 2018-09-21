import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesComponent } from './entries/entries.component';
import { EntryDetailsComponent} from './entry-details/entry-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/sweden', pathMatch:'full'},
  { path: 'sweden', component: EntriesComponent},
  { path: 'entry/:id', component: EntryDetailsComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

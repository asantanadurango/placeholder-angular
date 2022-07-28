import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './users/users.component';
import { RecordsComponent } from './records/records.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'records',
    component: RecordsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DinamicComponent } from './dinamic/dinamic.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { SearchComponent } from './search/search.component';
import { RecordsComponent } from './records/records.component';
import { AppRoutingModule } from './app.routing.module';

import { PlaceholderService } from './services/placeholder.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DinamicComponent,
    UsersComponent,
    PostsComponent,
    SearchComponent,
    RecordsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [PlaceholderService],
  bootstrap: [AppComponent],
})
export class AppModule {}

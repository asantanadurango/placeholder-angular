import { Component } from '@angular/core';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  private _posts: Post[] = [];

  constructor() {
    this.callPosts();
  }

  get posts() {
    return [...this._posts];
  }

  callPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => (this._posts = json));
  }
}

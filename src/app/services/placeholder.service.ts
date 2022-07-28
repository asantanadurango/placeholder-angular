import { Injectable } from '@angular/core';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Record {
  name: string;
  posts: Post[];
  method: string;
  calendar: string;
}

@Injectable()
export class PlaceholderService {
  constructor() {
    console.log('Placeholder-service');
  }
  async callRecord<T>(id: string) {
    let record: Record = {
      name: '',
      posts: [],
      method: 'GET',
      calendar: '',
    };
    const userReq = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const userRes: User = await userReq.json();
    const postsReq = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const postsRes: Post[] = await postsReq.json();
    const posts = postsRes.filter((p) => String(p.userId) === id);

    record.name = userRes.name;
    record.posts = posts;
    return record;
  }

  async callAllRecords() {
    const res = await fetch('http://localhost:9000/records');
    const data = res.json();
    return data;
  }
}

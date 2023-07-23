import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Record {
  user: User
  posts: Post[];
}

@Injectable()
export class RecordsService {
  readonly RECORD_TAG = 'records'
  constructor() {}

  private arrayRecords():Array<Record> | null{
    try {
      return JSON.parse(localStorage.getItem(this.RECORD_TAG) ?? '')
    } catch (_) {
      return null
    }
  }

  async saveOne(record:Record){
    const parse = this.arrayRecords() ?? []
    const userFound = parse?.find(r=>r.user.id === record.user.id)
    console.log(parse)
    if(userFound){
      throw new Error('User Exist')
    }

    parse.push(record)
    localStorage.setItem(this.RECORD_TAG, JSON.stringify(parse))
    return parse

  }

  async getOne(id: number) {
    const record: Record = {
      user: {id:0, name:'', },
      posts: []
    };
    const userReq = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const userRes: User = await userReq.json();
      const postsReq = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const postsRes: Post[] = await postsReq.json();
      const posts = postsRes.filter((p) => p.userId === id);
      record.user = userRes;
      record.posts = posts;
      return record;
  }

  async getAll() {
    return this.arrayRecords()
  }

  async updateOne(id:number, name:string){
    const parse = this.arrayRecords()
    const newRecords = parse?.map(r=>{
      if(r.user.id === id){
        r.user.name = name
      }
      return r
    })
    localStorage.setItem(this.RECORD_TAG, JSON.stringify(newRecords))
    
  }

  async deleteOne(id:number) {
    const parse = this.arrayRecords()
    localStorage.setItem(this.RECORD_TAG, JSON.stringify(parse?.filter(r=>r.user.id!==id)));
    this.arrayRecords()?.length === 0 && (this.deleteAll())
    return parse?.find(r=>r.user.id===id)
  }

  async deleteAll() {
    localStorage.removeItem(this.RECORD_TAG)
  }
}
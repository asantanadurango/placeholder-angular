import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { PlaceholderService } from '../services/placeholder.service';

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

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private _record: Record = {
    name: '',
    posts: [],
    method: 'GET',
    calendar: '',
  };

  get str(): any {
    return JSON.stringify({ ...this._record });
  }

  get record(): any {
    return { ...this._record };
  }

  getCalendar(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  constructor(private _place: PlaceholderService) {}
  async searchRecord(id: string) {
    this._place.callRecord(id).then((res) => {
      this._record.name = res.name;
      this._record.posts = res.posts;
      this._record.calendar = this.getCalendar();
    });
  }
}

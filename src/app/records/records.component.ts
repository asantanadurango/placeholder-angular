import { Component } from '@angular/core';
import { PlaceholderService } from '../services/placeholder.service';

interface Record {
  name: string;
  posts: Post[];
  method: string;
  calendar: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent {
  private _records: Record[] = [];

  constructor(private _place: PlaceholderService) {
    this.getRecords();
  }

  get records(): any {
    return [...this._records];
  }

  dateForStr(date: string): string {
    return date.slice(0, 10);
  }

  get rescordsStr() {
    return JSON.stringify([...this._records]);
  }

  getRecords() {
    this._place.callAllRecords().then((res) => {
      try {
        let result: Record[] = [];
        res.forEach((r: any) => {
          const postsParse = JSON.parse(r.posts);
          const recordParsed: any = { ...r };
          recordParsed.posts = postsParse;
          result.push(recordParsed);
        });
        this._records = result;
      } catch (error) {
        this._records = [];
        console.error(error);
      }
    });
  }

  updateRecord(calendar: string, method: string, id: string) {
    const reqOpts: RequestInit = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ calendar, method, id }),
    };

    fetch('http://localhost:9000/update', reqOpts).then((res) =>
      this.getRecords()
    );
  }

  deleteRecord(id: string) {
    // if (this._records.length === 1) return;

    const reqOpts: RequestInit = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    };

    fetch('http://localhost:9000/delete', reqOpts).then((res) => {
      this.getRecords();
    });
  }
}

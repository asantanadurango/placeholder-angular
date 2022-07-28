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
    this._getRecords();
  }

  get records(): any {
    const x = this._getRecords() || [];
    return x;
  }

  get rescordsStr() {
    const x = this._getRecords() || [];
    return JSON.stringify(x);
  }

  private async _getRecords() {
    const res = await this._place.callAllRecords();
    let result: any = [];
    res.forEach((r: any) => {
      const dataParse = JSON.parse(r.data);
      const recordParsed: any = { ...r };
      recordParsed.data = dataParse;
      result.push(recordParsed);
    });
    console.log(result);
    this._records = result;
    console.log(this._records);
  }
}

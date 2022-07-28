import { JsonPipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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

  messageError: string = 'Not Info';

  get str(): any {
    return JSON.stringify({ ...this._record });
  }

  get record(): any {
    return { ...this._record };
  }

  saveRecord() {
    const reqOpts: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.record),
    };

    fetch('http://localhost:9000/add', reqOpts).then((res) => {
      this._record = {
        name: '',
        posts: [],
        method: 'GET',
        calendar: '',
      };
    });
  }

  getCalendar(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  constructor(private _place: PlaceholderService) {}

  @ViewChild('txtMessage') txtMessage!: ElementRef<HTMLInputElement>;
  async searchRecord(id: string) {
    if (isNaN(Number(id)) || Number(id) > 10 || Number(id) < 1) {
      this.txtMessage.nativeElement.innerText = 'Enter a avaliable number';
      return;
    }
    this._place.callRecord(id).then((res) => {
      this._record.name = res.name;
      this._record.posts = res.posts;
      this._record.calendar = this.getCalendar();
    });
  }
}

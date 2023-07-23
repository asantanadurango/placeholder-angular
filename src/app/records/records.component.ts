import { Component } from '@angular/core';
import {
  RecordsService,
  type Record,
} from '../services/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent {
  private _records: Record[] | null = [];
  private readonly initialRecord: Record = {
    user: { id: 0, name: '' },
    posts: [],
  };
  selectedRecord = this.initialRecord;

  constructor(private _place: RecordsService) {
    this.getRecords();
  }
  
  selectRecord(record: Record) {
    this.selectedRecord = structuredClone(record);
  }

  get records() {
    if(this._records)    return [...this._records];
    return null
    
  }

  getRecords() {
    this._place.getAll().then((res) => {
      try {
        this._records = res;
      } catch (error) {
        this._records = [];
        console.error(error);
      }
    });
  }

  updateRecord(id: number, name: string) {
    this._place.updateOne(id, name).then((_) => this.getRecords());
  }

  deleteRecord(id: number) {
    this._place
      .deleteOne(id)
      .then((r) => console.log('deleted', r?.user.name))
      .then((_) => this.getRecords());
  }

  deleteAll(){
    this._place.deleteAll()
    .then((_) => this.getRecords())
  }
}

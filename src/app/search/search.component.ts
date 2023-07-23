import { Component, ViewChild } from '@angular/core';
import { RecordsService,  type Record } from '../services/records.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  private readonly initialRecord:Record = {
    user:{id:0, name:''},
    posts:[]
  };
  readonly InitialmessageError : string = 'Search User';
  constructor(private _place: RecordsService) {}

  private _record: Record = this.initialRecord
  messageError = this.InitialmessageError

  get record(): Record {
    return { ...this._record };
  }

  saveRecord(inpSearch:HTMLInputElement) {
    inpSearch.value=''
    inpSearch.focus()
    this._place.saveOne(this.record)
    .then(_=>{
      this._record=this.initialRecord
      this.messageError = this.InitialmessageError
    })
    .catch(e=>{
      if(e instanceof Error){
        console.log(e.message)
        this.messageError = e.message
        this._record=this.initialRecord
      }
    })
  }

  @ViewChild('txtMessage') txtMessage!:HTMLParagraphElement;
  async searchRecord(id: string) {
    if (isNaN(Number(id)) || Number(id) > 10 || Number(id) < 1) {
      this.txtMessage.textContent = 'Enter a avaliable number';
      return;
    }
    this._place.getOne(Number(id)).then((res) => {
      this._record = res
    });
  }
}

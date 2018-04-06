import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

const uri = 'http://localhost:3000/api/hotel/new';
@Component({
  selector: 'app-newhotel',
  templateUrl: './newhotel.component.html',
  styleUrls: ['./newhotel.component.css']
})
export class NewhotelComponent implements OnInit {

  uploader: FileUploader = new FileUploader({url: uri});
  attachmentList: any = [];
  constructor() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
    };
  }
  ngOnInit() {
  }

}

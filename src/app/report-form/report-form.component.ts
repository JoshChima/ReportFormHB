import { Component, OnInit } from '@angular/core';
import { ReportLog } from '../report-log';
// import { webSocket } from 'rxjs/webSocket';
// import { authconnect } from '../../assets/js/sheets.js';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  title = 'ReportFormHB';

  // model = new ReportLog('Parker Green', this.date(), 'Advancement', '354-xxxx', 'pg@adv.com', 'test', 'test', 'test', 'test');

  model = new ReportLog('Parker Green', this.date(), 'Advancement', '354-xxxx', 'pg@adv.com', 'test', 'test', 'test', 'test');
  // subject = webSocket('ws://localhost:8800');

  submitted = false;

  onSubmit() {
    this.submitted = true;
    // authconnect(this.model);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  constructor() { }

  ngOnInit() {
    // this.subject.subscribe();

  }
  // sendToServer($event) {
  //   // this.subject.next(this.model);
  //   // this.subject.complete();
  // }

  date() {
    const today = new Date();
    return today.getMonth() + '/' + today.getDay() + '/' + today.getFullYear(); }

  newReport() {
    this.model = new ReportLog('', this.date(), '', '', '', '', '', '', '');

  }

}

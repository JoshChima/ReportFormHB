// import { ReportLog } from 'src/app/report-log';
import * as google from '/googleapis';
import keys from '../keys.json'

// import { GoogleApis } from 'googleapis';
// import * as keys from '../keys.json';

// const {
  //   google
  // } = require('googleapis');
  // const keys = require('../keys.json');

// https://console.developers.google.com/apis/dashboard?project=reportformhb-1572031335245&authuser=0&pli=1

const today = new Date();
const date = today.getMonth() + '/' + today.getDay() + '/' + today.getFullYear();

// https://developers.google.com/identity/protocols/googlescopes



export function authconnect(submission) {
  console.log('Sent');
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  client.authorize((err, tokens) => {
    if (err) {
      console.log(err);
      return; // get out of function
    } else {
      console.log('Connected!');
      gsrun(client, submission);
      // console.log(keys)
    }
  });
}


async function gsrun(cl, sub) {
  const gsapi = google.sheets({ version: 'v4', auth: cl });

  // find the spreadsheetif from url between the last slash sequence
  const opt = {
    spreadsheetId: '16hXudcRqYpWUpMANcTiFse3Az02MWxU35sl--FgmWBQ',
    range: 'A1:I10',
  };

  const data = await gsapi.spreadsheets.values.get(opt);
  const dataArray = data.data.values;
  // const inputs = [sub.name, sub.date, sub.department, sub.phone, sub.email, sub.reportTitle, sub.reportType, sub.reportInfo, sub.signature];
  // const inputs = sub
  const inputs = ['Parker Green', date, 'Advancement', '354-xxxx', 'pg@adv.com', 'test', 'test', 'test', 'test'];
  dataArray.push(inputs);
  console.log(dataArray);

  const updateOptions = {
    spreadsheetId: '16hXudcRqYpWUpMANcTiFse3Az02MWxU35sl--FgmWBQ',
    range: 'A1',
    valueInputOption: 'USER_ENTERED',
    resource: { values: dataArray }
  };

  const res = await gsapi.spreadsheets.values.update(updateOptions);

  console.log(res);
}
// to test if its working run $node sheets.js
const test = ['1', '2', '3'];
// authconnect(test);


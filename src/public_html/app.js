

// const io = socketio(server);

// io.on('connection', (socket) => {
//     socket.on('submission', authconnect)
// })

//################# Google Sheets ###################

// import { google } from 'googleapis';
// import { client_email, private_key } from './assets/keys.json';

const {
  google
} = require('googleapis');
keys = require('../assets/keys.json');
// https://console.developers.google.com/apis/dashboard?project=reportformhb-1572031335245&authuser=0&pli=1


// https://developers.google.com/identity/protocols/googlescopes



function authconnect() {
  const today = new Date();
  const date = today.getMonth() + '/' + today.getDay() + '/' + today.getFullYear();
  const submission = [document.getElementById("name").value, 
  date, 
  document.getElementById("department").value, 
  document.getElementById("phone").value, 
  document.getElementById("email").value, 
  document.getElementById("title").value, 
  document.getElementById("type").value, 
  document.getElementById("info").value, 
  document.getElementById("signature").value];
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
  //const inputs = [sub.name, sub.date, sub.department, sub.phone, sub.email, sub.reportTitle, sub.reportType, sub.reportInfo, sub.signature];
  // const inputs = sub
//   const inputs = ['Parker Green', date, 'Advancement', '354-xxxx', 'pg@adv.com', 'test', 'test', 'test', 'test'];
  dataArray.push(sub);
  // console.log(dataArray);

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

// var el = document.getElementById("submit");
// if (el.addEventListener)
//     el.addEventListener("click", authconnect(), false);
// else if (el.attachEvent)
//     el.attachEvent('onclick', authconnect());
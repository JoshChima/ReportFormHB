const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.Server(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('./public_html'))

// app.use(morgan())



// app.get('/submit', (req, res) => {
//     // var options = {
//     //     root: path.join(__dirname, 'dist/ReportFormHB')
//     // }

//     // return res.sendFile('index.html', options);

// });
var isSubmitted = false
class ReportData {
  constructor() {
  this.name;
  this.date;
  this.department;
  this.phone;
  this.email;
  this.title;
  this.type;
  this.info;
  this.signature;
  }

  input(submission) {
    this.name = submission[0];
    this.date = submission[1];
    this.department = submission[2];
    this.phone = submission[3];
    this.email = submission[4];
    this.title = submission[5];
    this.type = submission[6];
    this.info = submission[7];
    this.signature = submission[8];
  }

}
var reportData = new ReportData;
app.post('/submit', function (req, res) {
  const today = new Date();
  const date = today.getMonth() + '/' + today.getDay() + '/' + today.getFullYear();
  // const submission = [document.getElementById("name").value, 
  // date, 
  // document.getElementById("department").value, 
  // document.getElementById("phone").value, 
  // document.getElementById("email").value, 
  // document.getElementById("title").value, 
  // document.getElementById("type").value, 
  // document.getElementById("info").value, 
  // document.getElementById("signature").value];
  let submission = [req.body.name, date, req.body.department, req.body.phone, req.body.email, req.body.title, req.body.type, req.body.info, req.body.signature]
  
  reportData.input(submission)
  
  //console.log(submission)

  authconnect(submission)
  // res.send(req.body.name);
  isSubmitted = true
  res.sendFile(path.join(__dirname + '/public_html/submitted.html'))
  // res.end()
});

server.listen(process.env.PORT || 8800, () => {
  var port = server.address().port;
  console.log(`Express app now running on port ${port}!`);
});

const {
  google
} = require('googleapis');
const keys = require('./assets/keys.json');
// https://console.developers.google.com/apis/dashboard?project=reportformhb-1572031335245&authuser=0&pli=1


// https://developers.google.com/identity/protocols/googlescopes



function authconnect(sub) {
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
      gsrun(client, sub);
      // console.log(keys)
    }
  });
}


async function gsrun(cl, sub) {
  const gsapi = google.sheets({
    version: 'v4',
    auth: cl
  });

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
    resource: {
      values: dataArray
    }
  };

  const res = await gsapi.spreadsheets.values.update(updateOptions);

  console.log(res);
}
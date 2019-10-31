const express = require('express')
const app = express();
const path = require('path');
const http = require('http')
const socketio = require('socket.io')
const server = http.Server(app);

app.use(express.static('public_html'))



app.get('/', (req, res) => {
    // var options = {
    //     root: path.join(__dirname, 'dist/ReportFormHB')
    // }

    // return res.sendFile('index.html', options);
    res.sendFile(path.join(__dirname + 'index.html'))

});

server.listen(process.env.PORT || 8800, () => {
  var port = server.address().port;
  console.log(`Express app now running on port ${port}!`);
});
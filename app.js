// import { authconnect } from "./src/assets/js/sheets";

const express = require('express')
const app = express()
const port = process.envPort || 8800;
const path = require('path');

app.use(express.static('dist/angularapp'))

app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname, 'dist/angularapp')
    }

    return res.sendFile('index.html', options);

});

app.listen(port, () => console.log(`Express app 
listining on port ${port}!`));
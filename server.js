/*
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/equilibre'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/equilibre/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
*/
const express = require('express');

const app = express();

app.use(express.static('./dist/Equilibre'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/Equilibre' }
  );
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)
// Global object
const bio = {};

const express = require('express')
const app = express()

const sendmail = require('sendmail')();
 
sendmail({
    from: 'mail@filipnest.com',
    to: 'mail@filipnest.com',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000);

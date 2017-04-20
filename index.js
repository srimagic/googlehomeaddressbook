var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    phoneBook = require('./phonebook')
;

//add necessary middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//routes - general
app.get('/', function(req, res){
    res.send('Welcome to phonebook api!!!');
});

//routes - phone book
app.post('/phonebook/add', phoneBook.add);
app.post('/phonebook/del', phoneBook.del);
app.post('/phonebook/update', phoneBook.update);
app.post('/phonebook/find', phoneBook.find);
app.post('/phonebook/findall', phoneBook.findall);
app.post('/phonebook/total', phoneBook.total);


//start listening for requests
app.listen(port, function () {
  console.log('phonebook listening on port ' + process.env.port);
});


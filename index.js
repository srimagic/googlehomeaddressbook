var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 5000,
    PhoneBookList = {},
    phoneBook = require('./phonebook')
;

//set global phone book list
phoneBook.setPhoneBookList(PhoneBookList);

//add necessary middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//routes - general
app.get('/', function(req, res){
    res.send('Welcome to phonebook api!!!');
});

//routes - phone book
app.post('/phonebook', phoneBook.process);


//start listening for requests
app.listen(port, function () {
  console.log('phonebook listening on port ' + port);
});


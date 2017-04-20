/*
	desc: web hook api to support google actions api
	author: srimagic
	date: April 20th 2017
	purpose: webhook for google actions api
	todos - 
		duplicate names logic
*/
(function(){
	var //google response
		response = {
			"speech":"",
			"displayText":"",
			"data":{},
			"contextOut":[],
			"source":"Sri's phonebook"
		},
		PhoneBookList = {},
		setPhoneBookList = function(_PhoneBookList){
			//store reference to master phone book list locally
			PhoneBookList = _PhoneBookList;
		},
		getParams = function(req){
			console.log('req');
			console.log(req.body);

			if (req.body && req.body.result && req.body.result.parameters){
				return req.body.result.parameters; 
			}
			return {};
		},
		process = function(req, res){
			var action = '';

			//determine Google action
			if (req.body && req.body.result && req.body.result.action){
				action =  req.body.result.action;
			}
			console.log({'action':action});

			//routing logic
			switch (action){
				case 'add':
					return add(req, res);
					break;

				case 'remove':
					return remove(req, res);
					break;

				case 'update':
					return update(req, res);
					break;

				case 'find':
					return find(req, res);
					break;

				case 'findall':
					return findall(req, res);
					break;

				case 'total':
					return total(req, res);
					break;

				default:
					response["speech"] = response["displayText"] = "sorry, bad action. please try again!!!";
					return res.json(response);
			}
		},
		add = function(req, res){
			
			console.log('method - add');

			var person = getParams(req);
			response["speech"] = response["displayText"] = "sorry, bad parameters. please try again!!!";

			if (person && person.name) {
				PhoneBookList[person.name] = person;
				response["speech"] = response["displayText"] = "Sure. " + person.name + " has been added to your address book";
			}
			
			return res.json(response);
		},
		remove = function(req, res){
			console.log('method - remove');

			var person = getParams(req);
			response["speech"] = response["displayText"] = "sorry, bad parameters. couldn't delete. please try again!!!";

			if (person && person.name) {
				delete PhoneBookList[person.name];
				response["speech"] = response["displayText"] = person.name + " has been removed";
			}

			return res.json(response);
		},
		update = function(req, res){
			console.log('method - update');

			var person = getParams(req);
			response["speech"] = response["displayText"] = "sorry, bad parameters. couldn't update. please try again!!!";

			if (person && person.name) {
				PhoneBookList[person.name] = person;
				response["speech"] = response["displayText"] = person.name + " has been updated";

			}
			return res.json(response);
		},
		find = function(req, res){
			console.log('method - find');

			var person = getParams(req);
			response["speech"] = response["displayText"] = "Sorry, no entry found with that name";

			if (person && person.name && PhoneBookList[person.name]) {
				response["speech"] = response["displayText"] = PhoneBookList[person.name];
			}
			return res.json(response);
		},
		findall = function(req, res){
			console.log('method - find all');

			response["speech"] = response["displayText"] = "Sorry, no entries found in your address book";

			if (Object.keys(PhoneBookList).length >0){
				response["speech"] = response["displayText"] = PhoneBookList;
			}
			
			return res.json(response);
		},
		total = function(req, res){
			response["speech"] = response["displayText"] = "Your address book has a total of " + Object.keys(PhoneBookList).length + " names";
			return res.json(response);
		},
		debug = function(){
			for (var name in PhoneBookList) {
				console.log(name);
				console.log(PhoneBookList[name]);
			}
		}
	;

	//exposed
	exports.process = process;
	exports.setPhoneBookList = setPhoneBookList;
	
})();
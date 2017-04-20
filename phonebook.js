/*
	desc: web hook api to support google actions api
	author: srimagic
	date: April 20th 2017
	purpose: webhook for google actions api
	todos - 
		duplicate names logic
*/
(function(){
	var PhoneBook = {},
		//google response
		response = {
			"speech":"",
			"displayText":"",
			"data":{},
			"contextOut":[],
			"source":"Sri's phonebook"
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

			var person = getParams(req);
			response["speech"] = response["displayText"] = "sorry, bad parameters. please try again!!!";

			if (person && person.name) {
				PhoneBook[person.name] = person;
				response["speech"] = response["displayText"] = "Sure. " + person.name + " has been added to your address book";
			}
			
			return res.json(response);
		},
		remove = function(req, res){
			var person = getParams(req);
			response["speech"] = response["displayText"] = "sorry, bad parameters. couldn't delete. please try again!!!";

			if (person && person.name) {
				delete PhoneBook[person.name];
				response["speech"] = response["displayText"] = person.name + " has been removed";
			}

			return res.json(response);
		},
		update = function(req, res){
			var person = getParams(req);
			response["speech"] = response["displayText"] = "sorry, bad parameters. couldn't update. please try again!!!";

			if (person && person.name) {
				PhoneBook[person.name] = person;
				response["speech"] = response["displayText"] = person.name + " has been updated";

			}
			return res.json(response);
		},
		find = function(req, res){
			var person = getParams(req);
			response["speech"] = response["displayText"] = "Sorry, no entry found with that name";

			if (person && person.name) {
				response["speech"] = response["displayText"] = PhoneBook[person.name];
			}
			return res.json(response);
		},
		findall = function(req, res){
			response["speech"] = response["displayText"] = "Sorry, no entries found in your address book";

			if (Object.keys(PhoneBook).length >0){
				response["speech"] = response["displayText"] = PhoneBook;
			}
			
			return res.json(response);
		},
		total = function(req, res){
			response["speech"] = response["displayText"] = "Your address book has a total of " + Object.keys(PhoneBook).length + " names";
			return res.json(response);
		},
		debug = function(){
			for (var name in PhoneBook) {
				console.log(name);
				console.log(PhoneBook[name]);
			}
		}
	;

	//exposed
	exports.process = process;
	
})();
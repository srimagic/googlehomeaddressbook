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
		response = {
			"speech":"",
			"displayText":"",
			"data":{},
			"contextOut":[],
			"source":"Sri's phonebook"
		},
		getPerson = function(req){
			console.log('req');
			console.log(req.body);

			if (req.body && req.body.result && req.body.result.parameters){
				return req.body.result.parameters; 
			}
			return {};
		},
		add = function(req, res){

			var person = getPerson(req);
			response["speech"] = response["displayText"] = "";

			if (person && person.name) {
				PhoneBook[person.name] = person;
				response["speech"] = response["displayText"] = "Sure. " + person.name + " has been added to your address book";
			}
			response["speech"] = response["displayText"] = "sorry, bad parameters. please try again!!!";

			return res.json(response);
		},
		remove = function(req, res){
			var person = getPerson(req);
			response["speech"] = response["displayText"] = "sorry, bad parameters. couldn't delete. please try again!!!";

			if (person && person.name) {
				delete PhoneBook[person.name];
				response["speech"] = response["displayText"] = person.name + " has been removed";
			}

			return res.json(response);
		},
		update = function(req, res){
			var person = getPerson(req);
			response["speech"] = response["displayText"] = "sorry, bad parameters. couldn't update. please try again!!!";

			if (person && person.name) {
				PhoneBook[person.name] = person;
				response["speech"] = response["displayText"] = person.name + " has been updated";

			}
			return res.json(response);
		},
		find = function(req, res){
			var person = getPerson(req);
			response["speech"] = response["displayText"] = "Sorry, no entry found with that name";

			if (person && person.name) {
				response["speech"] = response["displayText"] = JSON.stringify(PhoneBook[person.name]);
			}
			return res.json(response);
		},
		findall = function(req, res){
			response["speech"] = response["displayText"] = "Sorry, no entries found in your address book";

			if (Object.keys(PhoneBook).length >0){
				response["speech"] = response["displayText"] = JSON.stringify(PhoneBook);
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

	//exposed api
	exports.add = add;
	exports.del = remove;
	exports.update = update;
	exports.find = find;
	exports.findall = findall;
	exports.total = total;
	
})();
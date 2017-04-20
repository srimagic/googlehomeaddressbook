/*
	desc: web api to support address book
	author: srimagic
	date: April 20th 2017
	purpose: webhook for google actions api
	todos - 
		duplicate names logic
*/
(function(){
	var PhoneBook = {},
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

			if (person && person.name) {
				PhoneBook[person.name] = person;
				return res.sendStatus(201);
			}
			res.sendStatus(400);
		},
		remove = function(req, res){
			var person = getPerson(req);

			if (person && person.name) {
				delete PhoneBook[person.name];
				return res.sendStatus(200);
			}
			res.sendStatus(400);
		},
		update = function(req, res){
			var person = getPerson(req);

			if (person && person.name) {
				PhoneBook[person.name] = person;
				return res.sendStatus(200);
			}
			res.sendStatus(400);
		},
		find = function(req, res){
			var person = getPerson(req);

			if (person && person.name) {
				return res.json(PhoneBook[person.name]);
			}
			res.sendStatus(400);
		},
		findall = function(req, res){
			res.json(PhoneBook);
		},
		total = function(req, res){
			res.json({'total':Object.keys(PhoneBook).length});
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
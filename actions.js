const request = require('request');
const randomUseragent = require('random-useragent');

//TESTS
let user = '4Qw3QhaY'
let password = 'prxc48p3'
let host = '91.213.35.192'
let port = '51707'

var proxyUrl = "http://" + user + ":" + password + "@" + host + ":" + port;

let kid = '1XJDKC'
//


function makeActions(kid, proxyUrl) {
	let notCompleted = 5
	
	const actions = [
		'108375', '109967', '108285', '108379', '108380'
	]
	
	let json = {
		aid: 0,
		data: {},
		kid: kid
	}
	
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	
	for (let i = 4; i > -1; i--) {
		let a = getRandomInt(10)
		
		if (a <= 6) {
			json = {
				aid: actions[i],
				data: {},
				kid: kid
			}
			try {
				let url = `https://leads.kickofflabs.com/action/155411`;
				let headers = {
					'User-Agent': randomUseragent.getRandom()
				};
				request.post({ 
					url: url, 
					headers: headers,
					proxy: proxyUrl,
					json: json
				}, //ТЕСТЫ
				function (e, r, body) {
					// console.log(r, body)
				})//
			}
			catch (error) {
				console.log(error);
			}
			notCompleted -= 1
		}
	}
	return notCompleted;
}
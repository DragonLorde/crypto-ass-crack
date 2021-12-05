const request = require('request');
const randomUseragent = require('random-useragent');

//ДЛЯ ТЕСТОВ
let user = '4Qw3QhaY'
let password = 'prxc48p3'
let host = '91.213.35.192'
let port = '51707'

var proxyUrl = "http://" + user + ":" + password + "@" + host + ":" + port;


let kid = "1XEZ36";
let email = "voronoff.savv@yandex.ru";

let id = 64457106;
let json = {
	email: email,
}
//

function Registration(email, proxyUrl, kid) {
	if (kid) {
		json = {
			email: email,
			// cid: cid,
			__kid: kid
		}
	}

	try {
			let url = 'https://leads.kickofflabs.com/lead/155411';
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
				console.log(r, body)
			})//
		}
	catch (error) {
		console.log(error);
	}
}

function RegistrationConfirm(id, proxyUrl) {
	try {
		let url = `https://app.kickofflabs.com/verify-email?c=155411&t=9931de3386e828ab300c&s=${id}`;
		let headers = {
			'User-Agent': randomUseragent.getRandom()
		};
		request.get({ 
			url: url, 
			headers: headers,
			proxy: proxyUrl
		}, //ТЕСТЫ
		function (e, r, body) {
			console.log(r, body)
		})//
	}
	catch (error) {
		console.log(error);
	}
}

function GetUserInfo(email, ver) {
	try {
		let url = 'https://leads.kickofflabs.com/lead/155411';
		let headers = {
			'User-Agent': randomUseragent.getRandom()
		};
		request.post({ 
			url: url, 
			headers: headers,
			proxy: proxyUrl,
			json: json
		}, //ТЕСТЫ
		function OutputUserInfo(e, r, body) {
			// console.log(body.verified)
			return body.verified
		})//
	}
	catch (error) {
		console.log(error);
	}
}
const Discord = require('discord.js');
const bot = new Discord.Client();

var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

function startKeepAlive() {
	setInterval(function()  {
		var options = {
			host: 'potatodbot.herokuapp.com',
			port: 80,
			path: '/'
		};
		http.get(options, function(res) {
			res.on('data', function(chunk) {
				try {
					console.log('Heroku response: ' + chunk);
				} catch (err) {
					console.log(err.message);
				}
			});
		}).on('error', function(err){
			console.log('Error: ' + err.message);
		});
	}, 900000);
}

startKeepAlive();

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});

const tmi = require("tmi.js");

const options = {
  options: {
    debug: true,
  },
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: "meiachan",
    password: process.env.oauth,
  },
  channels: ['meiachan']
};

const client = new tmi.client(options);

client.connect();

client.on('connected', (address, port) => {
  console.log('Ho-la, estoy vivo!');
});

client.on('chat', (channel, user, message, self) => {
  if (message == '!juego') {
    client.action('meiachan', 'Meiachan está jugando Black Desert Online.')
  }

  client.action('meiachan', `Bienvenido ${user['display-name']}`);
})

const prefix = '--';

bot.on('message', message => {

	let msg = message.content.toUpperCase();
	let sender = message.author;
	let cont = message.content.slice(prefix.length).split(" ");
	let args = cont.slice(1);
	let chg = message.content.split('spawnea en');
	
	if (msg === prefix + 'HELP') {
		message.channel.send('Los comandos actuales son: \n- vaciar :  Elimina hasta 50 mensajes del canal donde se ejecuta. \n- purge :  Elimina la cantidad de mensajes especificados (Hasta 10 mensajes). \nAdemás actualiza los avisos de los boses automáticamente.');
		console.log('El usuario '+ message.member.user.tag + ' ha utilizado el comando help')
	}

	if (msg === prefix + 'VACIAR') {
		
		if (!message.member.roles.find(x => x.name === "Oficiales")) {
				message.channel.send('Necesitas ser un oficial para usar este comando.');
				return;
			}
		if (message.channel.type == 'text') {
			message.channel.fetchMessages()
				.then(messages => {
					message.channel.bulkDelete(messages);
					messagesDeleted = messages.array().length;
				
				console.log('Se han borrado todos los mensajes posibles. Total de mensajes borrados: ' + messagesDeleted);
				});
		console.log('El usuario '+ message.member.user.tag + ' ha utilizado el comando vaciar')
		}
	}
	
	if (message.content.includes('spawnea en 30 minutos')) {
		message.delete (900100)
		setTimeout(function() {
			message.channel.send(chg[0]+'spawnea en 15 minutos <@&630800028084207631>');
		}, 900000);
		
	} else if (message.content.includes('15 minutos')) {
		message.delete (900000);
		
	} else if (message.content.includes('00:15')) {
		message.delete (86340000);
	
	} else if (message.content.includes('1 hora')) {
		message.delete (900000);
	
	}

	if (msg.startsWith(prefix + 'PURGE')) {

		async function purge() {

			message.delete();

			if (!message.member.roles.find(x => x.name === "Oficiales")) {
				message.channel.send('Necesitas ser un oficial para utilizar este comando.');
				return;
			}

			if (isNaN(args[0])) {

				message.channel.send('Por favor, usa un número como argumento. \nModo de uso: ' + prefix + 'purge <cantidad>');

				return;

			}

			const fetched = await message.channel.fetchMessages({limit: args[0]});
			console.log(fetched.size + ' messages found, deleting...');

			message.channel.bulkDelete(fetched)
				.catch(error => message.channel.send('Sólo puedes eliminar hasta 10 mensajes con este comando.'));
		}

		purge();
		console.log('El usuario '+ message.member.user.tag + ' ha utilizado el comando purge')
	}

	if (msg.startsWith(prefix + 'BORRAR')) {

		async function purge() {

			message.delete();

			if (!message.member.id === 239787910482755585) {
				message.channel.send('Necesitas ser un oficial para utilizar este comando.');
				return;
			}

			if (isNaN(args[0])) {

				message.channel.send('Por favor, usa un número como argumento. \nModo de uso: ' + prefix + 'purge <cantidad>');

				return;

			}

			const fetched = await message.channel.fetchMessages({limit: args[0]});
			console.log(fetched.size + ' messages found, deleting...');

			message.channel.bulkDelete(fetched)
				.catch(error => message.channel.send('Sólo puedes eliminar hasta 10 mensajes con este comando.'));
		}

		purge();
		console.log('El usuario '+ message.member.user.tag + ' ha utilizado el comando purge')
	}
});

bot.on('ready',  () => {

	console.log('Bot started.');

	bot.user.setActivity('--help');

	var testChannel = bot.channels.find(channel => channel.id === '631078316991840256');

	setInterval(() => {
		testChannel.send('Sigo vivo!');
	}, 900000);


});

bot.login(process.env.token);

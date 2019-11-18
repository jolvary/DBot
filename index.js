const Discord = require('discord.js');
const client = new Discord.Client();

var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

function startKeepAlive() {
	setInterval(function()  {
		var options = {
			host: 'potatodclient.herokuapp.com',
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
  client.action('Ho-la, estoy vivo!');
});

 let usuarios = []

client.on('chat', (channel, user, message, self) => {

  if (message == '!juego') {
    client.action('meiachan', 'Meiachan está jugando Black Desert Online.');
  }

  if (usuarios.includes(`${user['display-name']}`)) {
  	console.log('Queria un abruzo.'); 
  } else if (`${user['display-name']}` == 'Alpistenvena') {
  	if (message.toUpperCase().includes('HOLA')) {
  		client.action('meiachan', `Bienvenido Alpistenvena precioso`)
  	}
  } else {
  	if (message.toUpperCase().includes('HOLA')) {
  		client.action('meiachan', `Bienvenido al directo ${user['display-name']}`)
  		usuarios.push(`${user['display-name']}`);
  		console.log(usuarios);
  	}
  }
  	

});

const prefix = '--';

client.on('message', message => {

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
			message.channel.send(chg[0]+'spawnea en 15 minutos <@&610956094042538016>', {tts: true});
		}, 900000);
		
	} else if (message.content.includes('15 minutos')) {
		message.delete (900000); 
		
	} else if (message.content.includes('GRAN DECISION RAEDAN ERES UN PUTO GENIO <3 (Bienvenido Alpi, tu eres un grande te quiero joder).')) {
		message.delete (15000);
		
	} else if (message.content.includes('00:15')) {
		message.delete (86340000);
	
	} else if (message.content.includes('1 hora')) {
		message.delete (1800000);
	
	}

	if (msg.startsWith(prefix + 'PURGE')) {

		async function purge() {

			message.delete();

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

	if (msg.startsWith(prefix + 'PENE')) {
		message.channel.send("Iba yo de peregrino y me cogiste de la mano.", {tts: true})
	}

	if (msg.startsWith(prefix + 'BORRAR')) {

		async function purge() {

			message.delete();

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

client.on('ready',  () => {

	console.log('client started.');

	client.user.setActivity('--help');

	var testChannel = client.channels.find(channel => channel.id === '631078316991840256');

	setInterval(() => {
		testChannel.send('Sigo vivo!');
	}, 900000);


});

client.on('guildCreate', guild => {
	const clientStats = {
		totalGuildsID: '645907457285029898',
		totalUsersID: '645907404151586826',
		totalChannelsID: '645907536893181982'
	}
	
	client.channels.get(clientStats.totalGuildsID).setName(`Total Guilds : ${client.guilds.size}`);
	client.channels.get(clientStats.totalUsersID).setName(`Total Users : ${client.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
	client.channels.get(clientStats.totalChannelsID).setName(`Total Channels : ${client.channels.size}`);
});

client.on('guildDelete', guild => {
	const clientStats = {
		totalGuildsID: '645907457285029898',
		totalUsersID: '645907404151586826',
		totalChannelsID: '645907536893181982'
	}

	client.channels.get(clientStats.totalGuildsID).setName(`Total Guilds : ${client.guilds.size}`);
	client.channels.get(clientStats.totalUsersID).setName(`Total Users : ${client.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
	client.channels.get(clientStats.totalChannelsID).setName(`Total Channels : ${client.channels.size}`);
});

client.login(process.env.token);

const Discord = require("discord.js");
const bot = new Discord.Client();

const bd = require('sqlite');
bd.open("./anime.sqlite");

bot.login('');

bot.on('ready', () => {
    console.log('Listo!')

    bot.user.setActivity('~help');
});

bot.on('message', message => {

	let prefix = '~';
	let msg = message.content.toUpperCase();
	let cont = message.content.split(' ');
	const Discord = require("discord.js");

	if (msg === prefix + 'UNIRME') {
		bd.run('INSERT INTO usuarios (idUsu, nomUsu, avaUsu) values (?, ?, ?)', 
			[message.author.id, message.author.username, message.author.avatarURL]);
		bd.run(`CREATE TABLE IF NOT EXISTS ${message.author.username} (idVis integer primary key, anime integer, capitulos text, foreign key(anime) references animelist(idAni), unique(anime))`);
		message.channel.send('Te has registrado correctamente.');
	}

	if (msg === prefix + 'ANIMES') {
		bd.all('SELECT * FROM animelist').then(rows => {
			var anili = ''
			rows.forEach(function (row) {
				anili += `${row.idAni} --> ${row.nomAni}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de los animes de Otoño 2019:")
					.setColor('0x70e0ff')
					.setDescription(`${anili}`));
		})
	}

	if (msg.startsWith(prefix + 'AÑADIR')) {
		bd.run(`INSERT INTO ${message.author.username} (anime, capitulos) values (${cont[1]}, ${cont[2]})`);
		bd.all(`SELECT idVis, nomAni, capitulos from ${message.author.username} inner join animelist on animelist.idAni = ${message.author.username}.anime`)
		.then(rows => {
			var mili =''
			rows.forEach(function(row) {mili += `${row.idVis} - ${row.nomAni}  -->  Capitulos: ${row.capitulos}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de tus animes:")
					.setColor('0x70e0ff')
					.setDescription(`${mili}`));			
		})
	}

	if (msg === prefix + 'MIOS') {
		bd.all(`SELECT idVis, nomAni, capitulos from ${message.author.username} inner join animelist on animelist.idAni = ${message.author.username}.anime`)
		.then(rows => {
			var mili =''
			rows.forEach(function(row) {mili += `${row.idVis} - ${row.nomAni}  -->  Capitulos: ${row.capitulos}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de tus animes:")
					.setColor('0x70e0ff')
					.setDescription(`${mili}`));			
		})
	}

	if (msg.startsWith(prefix + 'VER')) {
		bd.all(`SELECT idVis, nomAni, capitulos from ${cont[1]} inner join animelist on animelist.idAni = ${cont[1]}.anime`)
		.then(rows => {
			var suli =''
			rows.forEach(function(row) {suli += `${row.idVis} - ${row.nomAni}  -->  Capitulos: ${row.capitulos}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle(`Lista de los animes de ${cont[1]}:`)
					.setColor('0x70e0ff')
					.setDescription(`${suli}`));			
		})
	}

	if (msg.startsWith(prefix + 'EDITAR')) {
		bd.run(`UPDATE ${message.author.username} set capitulos = ${cont[2]} where idVis =  ${cont[1]}`);
		bd.all(`SELECT idVis, nomAni, capitulos from ${message.author.username} inner join animelist on animelist.idAni = ${message.author.username}.anime`)
		.then(rows => {
			var mili =''
			rows.forEach(function(row) {mili += `${row.idVis} - ${row.nomAni}  -->  Capitulos: ${row.capitulos}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de tus animes:")
					.setColor('0x70e0ff')
					.setDescription(`${mili}`));			
		})
	}

	if (msg.startsWith(prefix + 'BORRAR')) {
		bd.run(`delete from ${message.author.username} where idVis =  ${cont[1]}`);
		bd.all(`SELECT idVis, nomAni, capitulos from ${message.author.username} inner join animelist on animelist.idAni = ${message.author.username}.anime`)
		.then(rows => {
			var mili =''
			rows.forEach(function(row) {mili += `${row.idVis} - ${row.nomAni}  -->  Capitulos: ${row.capitulos}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de tus animes:")
					.setColor('0x70e0ff')
					.setDescription(`${mili}`));			
		})
	}

	if (msg === prefix + 'USUARIOS') {
		bd.all('SELECT * FROM usuarios').then(rows => {
			var usuarios = '';
			rows.forEach(function (row) {
				usuarios += `--> ${row.nomUsu}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de los usuarios:")
					.setColor('0x70e0ff')
					.setDescription(`${usuarios}`));
		})
	}

	if (msg === prefix + 'HELP') {
		message.channel.send(new Discord.RichEmbed()
			.setTitle("Lista de comandos:")
			.setColor('red')
			.setDescription('- Unirme : Con este comando lo que hacemos es unirnos a esta base.\n\n - Animes : Vemos la lista de animes de la temporada actual.\n\n - Ver : Ves la lista de los animes del usuario que pongas (pon su username).\n\n - Mios : Ves la lista de tus animes.\n\n - Añadir : Para usar este comando ponemos "~añadir <número del anime(de la lista de ~animes)> <número de capítulos>".\n\n - Editar : Se usa como el comando añadir pero utilizando el número que se te muestra en la lista de mis animes.\n\n - Borrar : Eliminamos un anime de nuestra lista con "~borrar <número del anime(mi lista)>"'));
	}

});
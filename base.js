const Discord = require("discord.js");
const bot = new Discord.Client();

const bd = require('sqlite');
bd.open("./animes.sqlite");

bot.login('');

bot.on('ready', () => {

    console.log('Listo!')

    var botChannel = bot.channels.find(channel => channel.id === '640050183736131594');

	setInterval(() => {
		botChannel.send('--vaciar');
	}, 300000);

	setInterval(() => {
		botChannel.send('~help')
	}, 300500);

    bot.user.setActivity('~help');
});

bot.on('message', message => {

	let prefix = '~';
	let msg = message.content.toUpperCase();
	let cont = message.content.split(' ');
	const Discord = require("discord.js");

	if (msg === prefix + 'NANI') {
		message.channel.send('--vaciar')
	}

	if (msg === prefix + 'CREAR') {

		bd.run(`CREATE TABLE IF NOT EXISTS animelist (
			idAni integer primary key, 
			nomAni text, 
			temAni text)`);

		bd.run(`CREATE TABLE IF NOT EXISTS usuarios (
			idUsu integer primary key, 
			nomUsu text)`);

		bd.run(`CREATE TABLE IF NOT EXISTS viendo (
			idVie integer primary key, 
			usuario integer, 
			anime integer, 
			epVie integer default 0, 
			foreign key(usuario) references usuarios(idUsu),
			foreign key(anime) references animelist(idAni),
			unique(usuario, anime))`);

		message.channel.send('Tablas creadas correctamente.');
		message.delete(10000);
	}

	if (msg.startsWith(prefix + 'INSERTAR')) {
		var ani = message.content.split(' + ')
		var ins = ani[1].split(' - ')
		bd.run(`INSERT INTO animelist (nomAni, temAni) values (?, ?)`, [ins[0], ins[1]]);
		bd.all('SELECT idAni, nomAni, temAni FROM animelist').then(rows => {
			var addli = ''
			rows.forEach(function (row) {
				addli += `${row.idAni} --> ${row.nomAni} - ${row.temAni}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de animes:")
					.setColor('0x70e0ff')
					.setDescription(`${addli}`));
		})
		message.channel.send(`Se ha añadido correctamente el anime ${ani[1]}`)
	}

//		bd.run("insert into animelist (nomAni, temAni) values ('Boku no Hero Academia 4th Season', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Sword Art Online: Alicization - War of Underworld', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Nanatsu no Taizai: Kamigami no Gekirin', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Shokugeki no Souma: Shin no Sara', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Shinchou Yuusha: Kono Yuusha ga Ore Tueee Kuse ni Shinchou Sugiru', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Psycho-Pass 3', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Assassins Pride', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Ore wo Suki nano wa Omae dake ka yo', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Fate/Grand Order: Zettai Majuu Sensen Babylonia', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('No Guns Life', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Bokutachi wa Benkyou ga Dekinai!', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Azur Lane', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Choujin Koukousei-tachi wa Isekai demo Yoyuu de Ikinuku you desu!', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Hataage! Kemono Michi', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Beastars', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Kabukichou Sherlock', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Ahiru no Sora', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Babylon', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Chihayafuru 3', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Mairimashita! Iruma-kun', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Watashi, Nouryoku wa Heikinchi de tte Itta yo ne!', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Granblue Fantasy The Animation Season 2', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('High Score Girl II', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Val x Love', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Radiant 2nd Season', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Kono Oto Tomare! 2nd Season', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Hoshiai no Sora', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Keishichou Tokumubu Tokushu Kyouakuhan Taisakushitsu Dainanaka: Tokunana', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Fairy Gone 2nd Season', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Houkago Saikoro Club', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Chuubyou Gekihatsu Boy', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Rifle Is Beautiful', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Kandagawa Jet Girls', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('XL Joushi.', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Stand My Heroes: Piece of Truth', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Phantasy Star Online 2: Episode Oracle', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Africa no Salaryman (TV)', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Ani ni Tsukeru Kusuri wa Nai! 3', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Z/X: Code Reunion', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Actors: Songs Connection', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Shin Chuuka Ichiban!', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Tenka Hyakken: Meiji-kan e Youkoso!', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Urashimasakatasen no Nichijou', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Aikatsu on Parade!', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Zoids Wild Zero', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Dorufuro: Iyashi-hen', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Taeko no Nichijou', 'Autum 2019')");
//		bd.run("insert into animelist (nomAni, temAni) values ('Eily wa Ou-sama!', 'Autum 2019')");
//		message.channel.send('Animes insertados correctamente.');
//		message.delete(1000);
//	}

	if (msg === prefix + 'ANIMES') {
		message.delete(1000);
		bd.all('SELECT * FROM animelist').then(rows => {
			var anili = ''
			rows.forEach(function (row) {
				anili += `${row.idAni} --> ${row.nomAni}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de animes:")
					.setColor('0x70e0ff')
					.setDescription(`${anili}`));
		})
	}

	if (msg === prefix + 'UNIRME') {
		message.delete(1000);
		bd.run(`INSERT INTO usuarios (idUsu, nomUsu) values (?, ?)`,[message.author.id, message.author.username]);
		message.channel.send('Bienvenido a la base.');
	}

	if (msg.startsWith(prefix + 'AÑADIR')) {
		message.delete(1000);
		if (cont[2] == undefined) {
			cont[2] = 0
		}
		bd.run(`INSERT INTO viendo (usuario, anime, epVie) values (${message.author.id}, ${cont[1]}, ${cont[2]})`);
		bd.all(`SELECT nomAni, epVie from viendo 
			inner join animelist on animelist.idAni = viendo.anime where usuario = ${message.author.id} order by nomAni`)
		.then(rows => {
			var mili =''
			rows.forEach(function(row) {mili += `- ${row.nomAni}  -->  Capitulos: ${row.epVie}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de tus animes:")
					.setColor('0x70e0ff')
					.setDescription(`${mili}`));			
		})
	}

	if (msg === prefix + 'MIOS') {
		message.delete(1000);
		bd.all(`select idVie, nomAni, epVie from viendo
			inner join animelist on animelist.idAni = viendo.anime where usuario = ${message.author.id}`)
		.then(rows => {
			nombre = `${message.author.id}`
			var mili =''
			rows.forEach(function(row) {mili += `${row.idVie} - ${row.nomAni}  -->  Capitulos: ${row.epVie}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle(`${nombre}`)
					.setColor('0x70e0ff')
					.setDescription(`${mili}`));			
		})
	}

	if (msg.startsWith(prefix + 'VER')) {
		message.delete(1000);
		bd.all(`SELECT nomUsu, nomAni, epVie from viendo 
			inner join animelist on animelist.idAni = viendo.anime
			inner join usuarios on usuarios.idUsu = viendo.usuario 
			where nomUsu = ?`, [cont[1]])
		.then(rows => {
			var suli =''
			rows.forEach(function(row) {suli += `${row.nomAni}  -->  Capitulos: ${row.epVie}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle(`Lista de los animes de ${cont[1]}:`)
					.setColor('0x70e0ff')
					.setDescription(`${suli}`));			
		})
	}

	if (msg.startsWith(prefix + 'EDITAR')) {
		message.delete(1000);
		bd.run(`UPDATE viendo set epVie = ${cont[2]} where idVie = ${cont[1]}`);
		bd.all(`select nomAni, epVie from viendo 
			inner join animelist on animelist.idAni = viendo.anime where usuario = ${message.author.id}`)
		.then(rows => {
			var edili =''
			rows.forEach(function(row) {edili += `- ${row.nomAni}  -->  Capitulos: ${row.epVie}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de tus animes:")
					.setColor('0x70e0ff')
					.setDescription(`${edili}`));			
		})
	}

	if (msg.startsWith(prefix + 'BORRAR')) {
		message.delete(1000);
		bd.run(`delete from viendo where idVie = ${cont[1]}`);
		bd.all(`select nomAni, epVie from viendo 
			inner join animelist on animelist.idAni = viendo.anime where usuario = ${message.author.id}`)
		.then(rows => {
			var boli =''
			rows.forEach(function(row) {boli += `${row.nomAni}  -->  Capitulos: ${row.epVie}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de tus animes:")
					.setColor('0x70e0ff')
					.setDescription(`${boli}`));			
		})
	}

	if (msg === prefix + 'USUARIOS') {
		message.delete(1000);
		bd.all('SELECT nomUsu FROM usuarios').then(rows => {
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
		message.delete(1000);
		message.channel.send(new Discord.RichEmbed()
			.setTitle("Guía de comandos:")
			.setColor('#ff0000')
			.setDescription(`
				**~animes**: Para poder ver una lista general de los animes de temporada o en emisión.\n
				**~buscar <una palabra del título>**: Para realizar una búsqueda en la lista.\n\n

				**~unirme**: Lo utilizaremos si queremos empezar a crear una lista propia. Ahora se nos mostrará el id y el nombre de los animes para añadirlos a nuestra lista.\n
				**~añadir <id lista anime> <nº episodios vistos>**: Sirve para insertar un anime  en nuestra lista y saber por qué capítulo vamos.\n
				**~editar <id de nuestra lista> <nº episodios>**: Lo usaremos si necesitamos editar los capítulos vistos de nuestra lista.\n
				**~borrar <id nuestra lista>**: Para borrar un anime de nuestra lista. \n
				**~mios**: Lo podemos utilizar si en algún momento queremos consultar nuestra lista.\n
				**~ver <nombre usuario>**: Para ver la lista de otro usuario.\n
				**~whois <id lista anime>** o **~comun**: Si quisiéramos chafardear si otra persona está viendo algun anime en específico podremos utilizar cualquiera de estos comandos.\n`));
	}

	if (msg === prefix + 'COMUN') {
		message.delete(1000);
		bd.all('select nomUsu, nomAni from viendo inner join usuarios on usuarios.idUsu = viendo.usuario inner join animelist on animelist.idAni = viendo.anime where idAni in (select anime from viendo group by anime having count(*) > 1)').then(rows => {
			var usuarios = '';
			rows.forEach(function (row) {
				usuarios += `--> ${row.nomAni} --> ${row.nomUsu}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de los animes en conjunto:")
					.setColor('0x70e0ff')
					.setDescription(`${usuarios}`));
		})

	}

	if (msg.startsWith(prefix + 'BUSCAR')) {
		message.delete(1000);
		comando = message.content.split(' ')
		aniname = comando[1]
		comando.slice(2,).forEach(function(item){
			aniname += ' ' + item
		})
		message.channel.send(`Esto es lo que has introducido -> ${aniname}`)
		bd.all(`select idAni, nomAni, temAni from animelist where nomAni like "%${aniname}%"`).then(rows => {
			var busqueda = '';
			rows.forEach(function (row) {
				busqueda += `${row.idAni} --> ${row.nomAni} - ${row.temAni}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de los animes que coinciden con tu búsqueda:")
					.setColor('0x70e0ff')
					.setDescription(`${busqueda}`));
		})
	}

	if (msg.startsWith(prefix + 'TEMPORADA')) {
		message.delete(1000);
		comando = message.content.split(' ')
		temporada = comando[1]
		comando.slice(2,).forEach(function(item){
			temporada += ' ' + item
		})
		bd.all(`select idAni, nomAni, temAni from animelist where temAni like "%${temporada}%"`).then(rows => {
			var busqueda = '';
			rows.forEach(function (row) {
				busqueda += `${row.idAni} --> ${row.nomAni} - ${row.temAni}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle("Lista de los animes que coinciden con tu búsqueda:")
					.setColor('0x70e0ff')
					.setDescription(`${busqueda}`));
		})
	}

	if (msg.startsWith(prefix + 'WHOIS')) {
		message.delete(1000);
		bd.all(`select nomAni, nomUsu, epVie from viendo 
			inner join usuarios on usuarios.idUsu = viendo.usuario
			inner join animelist on animelist.idAni = viendo.anime 
			where idAni = ${cont[1]}`).then(rows => {
			var busqueda = '';
			rows.forEach(function (row) {
				anime = `${row.nomAni}`
				busqueda += `-> ${row.nomUsu} - Capítulo: ${row.epVie}\n\n`
			})

			message.channel.send(new Discord.RichEmbed()
					.setTitle(`${anime}`)
					.setColor('0x70e0ff')
					.setDescription(`${busqueda}`));
		})
	}

});
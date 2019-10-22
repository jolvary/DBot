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
    password: "oauth:p509xbkpfld6u5e1sg7jscfb2dj154",
  },
  channels: ['meiachan']
};

const client = new tmi.client(options);

client.connect();

client.on('connected', (address, port) => {
  client.action('meiachan', 'Ho-la, estoy vivo!');
});

client.on('chat', (channel, user, message, self) => {
  if (message == '!juego') {
    client.action('meiachan', 'Meiachan está jugando al puto lol.')
  }

  client.action('meiachan', `Bienvenido ${user['display-name']}`);
})
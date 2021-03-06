'use strict';

const node_ssh = require('node-ssh');
const shell = require('shelljs');

const { colored } = require('../helpers/logger');
const { PATH_TERRAFORM, secrets } = require('../config');

const ssh = new node_ssh();

const log = colored('magenta', 'SSH');

shell.cd(`${PATH_TERRAFORM}/service`);
const host = shell.exec('terraform output ip').stdout.trim();

let connection;
const getConnection = () => {
  if(!connection) {
    log(`Connecting to host: ${host}`);
    connection = ssh.connect({
      host,
      username: 'root',
      privateKey: secrets.SSH_PRIVATE_KEY,
    })
    .then(() => ssh);
  }

  return connection;
}

module.exports = getConnection;
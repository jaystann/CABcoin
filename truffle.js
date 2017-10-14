require('babel-register');
require('babel-polyfill');
/*
var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic = '[REDACTED]';

var provider;

if (!process.env.SOLIDITY_COVERAGE){
  provider = new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/')
}*/

module.exports = {
  networks: {
    development: {
      host: "localhost",
      gasPrice:1,
      gas: 6000000,
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};

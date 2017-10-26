require('babel-register');
require('babel-polyfill');

var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');

var mnemonic = "market drop knee vote describe wise home hood urban during dust major shaft letter trophy2";
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
var wallet_hdpath = "m/44'/60'/0'/0/";
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

console.log(address);

var providerUrl = "https://rinkeby.infura.io/hvN3davA6zG6AdH8mU81";
var engine = new ProviderEngine();
// filters
engine.addProvider(new FilterSubprovider());

engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(); // Required by the provider engine.


var providerUrlMain = "https://mainnet.infura.io/hvN3davA6zG6AdH8mU81";
var engineMain = new ProviderEngine();
// filters
engineMain.addProvider(new FilterSubprovider());

engineMain.addProvider(new WalletSubprovider(wallet, {}));
engineMain.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrlMain)));
engineMain.start(); // Required by the provider engine.


module.exports = {
  networks: {
    
    rinkeby: {
      network_id: 4,    // Official rinkeby network id
      gasPrice:4000000000,
      provider: engine, // Use our custom provider
      from: address     // Use the address we derived
    },
    development: {
      host: "localhost",
      gasPrice:1,
      gas: 6000000,
      port: 8545,
      network_id: "*" // Match any network id
    },
    mainnet: {
      network_id: 1,    // Official main network id
      gasPrice:1,
      gasPrice:1100000000,
      gas: 6000000,
      provider: engineMain, // Use our custom provider
      from: address,     // Use the address we derived
      network_id: "*" // Match any network id
    }
  }
};

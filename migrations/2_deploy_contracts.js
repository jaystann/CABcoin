var DevTeamContract = artifacts.require("./DevTeamContract.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var CABCoin = artifacts.require("./CABCoin.sol");
var CABCoinICO = artifacts.require("./CABCoinICO.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, CABCoin);
  deployer.link(SafeMath, CABCoinICO);
   deployer.deploy(CABCoin);
   deployer.deploy(CABCoinICO);
  deployer.deploy(DevTeamContract);
};

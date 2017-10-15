var DevTeamContract = artifacts.require("./DevTeamContract.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var CABCoin = artifacts.require("./CABCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, CABCoin);
   deployer.deploy(CABCoin);
  deployer.deploy(DevTeamContract);
};

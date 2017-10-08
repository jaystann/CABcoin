var CabCoin = artifacts.require("./CabCoin.sol");
var SafeMath = artifacts.require("./SafeMath.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, CabCoin);
  deployer.deploy(CabCoin);
};

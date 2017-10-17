var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  // Migrations mechanizm disabled
   deployer.deploy(Migrations);
};

var DevTeamContract = artifacts.require("./DevTeamContract.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var CABCoin = artifacts.require("./CABCoin.sol");
var CABCoinICO = artifacts.require("./CABCoinICO.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, CABCoin);
  deployer.link(SafeMath, CABCoinICO);
  console.log("1");
  Promise.all(
      [deployer.deploy(CABCoin),
       deployer.deploy(CABCoinICO),
       deployer.deploy(DevTeamContract)]
       
      ).then(function(){
          Promise.all([CABCoinICO.deployed(),
                CABCoin.deployed(),
               DevTeamContract.deployed()])
               .then(function(contracts){
                   contracts[0].SetContracts(contracts[1].address,contracts[2].address)
                   .then(function(){
                       contracts[1].transferOwnership(contracts[0].address).then(function(){
                           
                           contracts[0].getCabCoinsAmount().then(function(val){
                             console.log('2 '+val);;
                           })
                       });
                   });
               });
      });
};

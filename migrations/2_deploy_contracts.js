var DevTeamContract = artifacts.require("./DevTeamContract.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var CABCoin = artifacts.require("./CABCoin.sol");
var CABCoinICO = artifacts.require("./CABCoinICO.sol");
var CABCoinICOMock = artifacts.require("./mock/CABCoinICOMock.sol");
var StatsContract = artifacts.require("./StatsContract.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, CABCoin);
  deployer.link(SafeMath, CABCoinICOMock);
  deployer.link(SafeMath, CABCoinICO);
  console.log("1");
  Promise.all(
      [deployer.deploy(CABCoin),
       deployer.deploy(CABCoinICO,/*4586211*/1225200),
       deployer.deploy(DevTeamContract),
       deployer.deploy(StatsContract)]
       
      ).then(function(){
          Promise.all([CABCoinICO.deployed(),
                CABCoin.deployed(),
               DevTeamContract.deployed(),
               StatsContract.deployed()])
               .then(function(contracts){
                   contracts[0].SetContracts(contracts[1].address,contracts[2].address)
                   .then(function(){
                       contracts[1].transferOwnership(contracts[0].address).then(function(){
                           contracts[0].getCabCoinsAmount().then(function(val){
                             contracts[3].setAddresses(
                                contracts[2].address,
                                contracts[1].address,
                                contracts[0].address).then(
                                 function(){
                                    console.log("END Of deployment");;
                                 }
                                 );
                           });
                       });
                   });
               }); 
      });
};

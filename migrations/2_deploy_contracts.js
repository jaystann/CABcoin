var DevTeamContract = artifacts.require("./DevTeamContract.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var CABCoinICO = artifacts.require("./CABCoinICO.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, CABCoinICO);
   deployer.deploy(CABCoinICO).then(
       function(){
                   console.log('1');
           
            var b = CABCoinICO.deployed();
            b.then(function(instance){
                   console.log('2');
                   instance.tokenAddress.call().then(function(val){
                        console.log('3 '+val);
                   })
            });
       });
};

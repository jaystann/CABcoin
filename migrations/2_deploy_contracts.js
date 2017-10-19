var DevTeamContract = artifacts.require("./DevTeamContract.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var CABCoinICO = artifacts.require("./CABCoinICO.sol");
var CABCoin = artifacts.require("./CABCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, CABCoinICO);
  deployer.link(SafeMath, CABCoin);
  var coinInstance = null;
  var coinIcoInstance = null;
  var devInstance = null;
  var cabCoinP = deployer.deploy(CABCoin).then(function() {
      console.log('1');
      return CABCoin.deployed().then(function(cInstance){
          console.log('2');
          return new Promise(
                  (res,err) =>{
                    console.log('3');
                    coinInstance = cInstance;
                    res(coinInstance);   
                  }
              );
      });
  });
  var icoP = cabCoinP.then(function(){
      console.log('1b');
      return deployer.deploy(CABCoinICO).then(function() {
          console.log('2b');
          return CABCoinICO.deployed().then(function(icoInstance){
              console.log('3b');
              return new Promise(
                      (res,err) =>{
                        console.log('4b');
                        coinIcoInstance = icoInstance;
                        res(coinIcoInstance);   
                      }
                  );
          });
      });
  });
  var devP = icoP.then(function(){
      console.log('1c');
      return deployer.deploy(DevTeamContract).then(function() {
          console.log('2c');
          return DevTeamContract.deployed().then(function(devInst){
              console.log('3c');
              return new Promise(
                      (res,err) =>{
                        console.log('4c');
                        devInstance = devInst;
                        res(devInstance);   
                      }
                  );
          });
      });
  });
  
  devP.then(function(){
      console.log('1d');
      return coinIcoInstance.setRelatedContracts(coinInstance.address,devInstance.address).then(
              function(test){
                  console.log('END');
              }
          );
  });
  
  
};

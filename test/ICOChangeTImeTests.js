'use strict';
var BigNumber = require('big-number');
const assertJump = require('./helpers/assertJump');
var CABCoinICOMock = artifacts.require('./mock/CABCoinICOMock.sol');

contract('CABCoinICOMock', function(accounts) {
  
  let cntr ;
  let acc3balance;
  let acc3balanceAfter;
  let _startTimeBlock = 1000000;
  var testStartBlock;
  var contractAddress = "";
  
  beforeEach(async function() {
    
    var waitFor = new Promise((r,e)=>{
        web3.eth.getBlockNumber(function(err,res){
        testStartBlock = res;
        r(res);
      });
    });
    await waitFor;
    cntr = await CABCoinICOMock.new(testStartBlock);
    contractAddress = cntr.address;
    let sumToSend = 10000000;
    var newTime = 1;
    await cntr.SetTime(newTime);
    var readedTime = await cntr.GetTime();
    var readedStartTime = await cntr.GetStartBlock();
    assert.equal(newTime,readedTime);
  });
  /*
  
  it('should run Test suit', async function() {
    
  });
  
  
  it('should fail buy before startTime', async function() {
    var actualStatus = false;
    try{
      await cntr.SetTime((testStartBlock-10<1)?1:(testStartBlock-10));
      await cntr.buy(accounts[3],{value:1000,from:accounts[3]});
      
      
      console.log("no exception in test4");
      actualStatus=true;
    }catch(ex){
      console.log("exception in test4 "+ex);
      actualStatus=false;
    }
    assert.isOk(!actualStatus,"should be exception");
    
    
  }); 
  
  it('should not fail buy during ICO', async function() {
    var expectedStaus = false;
    var actualStatus = false;
    try{
      await cntr.SetTime((testStartBlock+5<1)?1:(testStartBlock+5));
      await cntr.buy(accounts[3],{value:1000,from:accounts[3]});
      
      
      actualStatus=true;
      console.log("no exception in test5");
    }catch(ex){
      console.log("exception in test5 "+ex);
      actualStatus=false;
    }
    assert.isOk(!actualStatus,"should be no exception");
    
    
  });
  
  it('should fail buy after endTime', async function() {
    var expectedStaus = false;
    var actualStatus = false;
    try{
      await cntr.SetTime((testStartBlock+25<1)?1:(testStartBlock+25));
      await cntr.buy(accounts[3],{value:1000,from:accounts[3]});
      
      
      actualStatus=true;
      console.log("no exception in test5");
    }catch(ex){
      console.log("exception in test5 "+ex);
      actualStatus=false;
    }
    assert.isOk(!actualStatus,"should be exception");
    
    
  });
  
  
  
  it('should fail transfer before startTime', async function() {
    var result = undefined;
    var expectedStaus = false;
    var actualStatus = false;
    try{
      var blockNum ;
      await cntr.SetTime((testStartBlock-10<1)?1:(testStartBlock-10));
      await cntr.runPayment({
            gas:2000000,
            gasPrice:5,
            from:accounts[3],
            to:contractAddress
          });
        
      actualStatus=true;
      console.log("just before console.log " + JSON.stringify(sendTxRetVal));
      console.log("no exception in test2 ");
    }catch(ex){
      console.log("exception in test2 "+ex);
      actualStatus=false;
    }
    assert.isOk(!actualStatus,"should be exception");
    
    
  });
  
  
  */
  it('should not fail transfer after startTime', async function() {
    var result = undefined;
    var expectedStaus = true;
    var actualStatus;
    try{
      var blockNum ;
      await cntr.SetTime((testStartBlock+10<1)?1:(testStartBlock+10));
      
      await cntr.runPayment({
        gas:2000000,
        gasPrice:5,
        from:accounts[0],
        to:contractAddress
        
      });
      
      
      actualStatus = true;
      console.log("no exception in test3");
    }catch(ex){
      console.log("exception in test3 "+ex);
      actualStatus=false;
    }
    assert.isOk(actualStatus,"should be no exception");
    
  });
  
  
  it('should increase TokenBalance', async function() {
    var result = undefined;
    var expectedStaus = false;
    var actualStatus = false;
    try{
      var blockNum ;
      await cntr.SetTime((testStartBlock+10<1)?1:(testStartBlock+10));
      await cntr.runPayment({
            value:10000,
            gas:2000000,
            gasPrice:5,
            from:accounts[3],
            to:contractAddress
          });
      console.log("runPayment ");
        
      var balance = await cntr.GetUserBalance(accounts[3]);
        
      actualStatus=true;
      console.log("no exception in test4 "+balance);
    }catch(ex){
      console.log("exception in test4 "+ex);
      actualStatus=false;
    }
    assert.isOk(actualStatus,"should be no exception");
    
    
  });
  
  
  
});
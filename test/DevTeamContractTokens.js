'use strict';
var BigNumber = require('big-number');
const assertJump = require('./helpers/assertJump');
var CABCoinICO = artifacts.require('./CABCoinICO.sol');
var CABCoin = artifacts.require('./CABCoin.sol');
var DevTeamContractMock = artifacts.require('./helpers/DevTeamContractMock.sol');
var Caller = artifacts.require('./helpers/Caller.sol');

contract('DevTeamContractTokens', function(accounts) {
  
  let cntr ;
  let tokenICO ;
  let token ;
  let acc3balance;
  let acc3balanceAfter;
  let _startTimeBlock = 1000000;
  
  beforeEach(async function() {
    cntr = await DevTeamContractMock.new(accounts[0],accounts[1],accounts[2],accounts[3],accounts[4]);
    
    tokenICO = await CABCoinICO.new();
    token = await CABCoin.new();
  
    await tokenICO.SetContracts(token.address,cntr.address);
    await token.transferOwnership(tokenICO.address);
    await tokenICO.buy(accounts[4],{from:accounts[4],  value: 1000000});
    
    let sumToSend = 10000000;
    let res = await cntr.recieveFunds({value : sumToSend});
    res = await cntr.SetNow(_startTimeBlock);
    let endBalance =  await token.balanceOf(cntr.address);
    acc3balance = await token.balanceOf(accounts[3]);
    assert.isOk(sumToSend<endBalance);
  });
  
  var getAcc3Balance = async function(){
    acc3balanceAfter  =  await token.balanceOf(accounts[3]);
    return acc3balanceAfter;
  }
  var countTransactions = async function(){
    var tCount = await cntr.getTotalNumberOfTransactions.call();
    return tCount.toNumber();
  } 
  
  var getPendingAmount = async function(){
    var tCount = await cntr.pendingAmount.call();
    return tCount.toNumber();
  } 
  
  it('should count transactions without errors', async function() {
    var counter = await countTransactions();
    assert.equal(0,counter);
  });
  
  it('should register transaction if Owner', async function() {
    var res = await cntr.RegisterTokenTransaction(accounts[3],1000,token.address);
  });
  
  
  it('register should increase transaction counter', async function() {
    var startCount = await countTransactions();
    var res = await cntr.RegisterTokenTransaction(accounts[3],1000,token.address);
    var endCount = await countTransactions();
    assert.equal(startCount,endCount-1);
  });
  
  it('should not register transaction if not owner', async function() {
    var startCount = await countTransactions();
    try{
      var res = await cntr.RegisterTokenTransaction({from:accounts[3]},accounts[1],1000,token.address);
      assert.isNotOk(res,'Should throw exception');
    }catch(ex){
    }
    var endCount = await countTransactions();
    assert.equal(startCount,endCount);
    
  });
  
  it('register should increase pendingAmount', async function() {
    var amount = 1000;
    var startCount = await getPendingAmount();
    var res = await cntr.RegisterTokenTransaction(accounts[3],amount,token.address);
    var endCount = await getPendingAmount();
    assert.equal(startCount,endCount-amount);
  });
  
  
  it('should not transfer tokens if not enaught confirmations', async function() {
    var amount = 1000;
    var res = await cntr.RegisterTokenTransaction(accounts[3],amount,token.address);
    var startCount = await getPendingAmount();
    var errorDuringTransaction = true;
    try{
      res = await cntr.ProcessTransaction(0);
      errorDuringTransaction = false;
    }
    catch(ex){
      if(ex.message.indexOf("invalid opcode")==-1){
        errorDuringTransaction = false;
        throw "incorrect exception";
      }
    }
    if(errorDuringTransaction==false){
      var endCount = await getPendingAmount();
      await getAcc3Balance();
      
      assert.equal(acc3balance,acc3balanceAfter,'balance should not increase');
      assert.equal(startCount,endCount, 'pendingAmount should not change');
    }
  });
  
  
  it('should transfer tokens if enaught confirmations', async function() {
    var amount = 1000;
    var res = await cntr.RegisterTokenTransaction(accounts[3],amount,token.address);
    var startCount = await getPendingAmount();
    res = await cntr.ConfirmTransaction(0,{from:accounts[0]});
    res = await cntr.ConfirmTransaction(0,{from:accounts[2]});
    res = await cntr.ProcessTransaction(0,{from:accounts[0]});
    var endCount = await getPendingAmount();
    await getAcc3Balance();
    assert.equal(acc3balance<acc3balanceAfter,true,'balance should increase');
    console.log(acc3balance,acc3balanceAfter);
  });
  
  it('should not transfer tokens if enaught confirmations but account[0] did not confirm', async function() {
    var amount = 1000;
    var res = await cntr.RegisterTokenTransaction(accounts[3],amount,token.address);
    var startCount = await getPendingAmount();
    res = await cntr.ConfirmTransaction(0,{from:accounts[4]});
    res = await cntr.ConfirmTransaction(0,{from:accounts[2]});
    try{
      res = await cntr.ProcessTransaction(0,{from:accounts[1]});
    }
    catch(ex){
      if(ex.message.indexOf("invalid opcode")==-1){
        errorDuringTransaction = false;
        throw "incorrect exception";
      }
    }
    var endCount = await getPendingAmount();
    await getAcc3Balance();
    assert.equal(acc3balance<acc3balanceAfter,false,'balance should stay the same');
    assert.equal(startCount,endCount, 'pendingAmount should not change ');
  });
  
  
  it('should not transfer tokens if confirmations by the same person', async function() {
    var amount = 1000;
    var res = await cntr.RegisterTokenTransaction(accounts[3],amount,token.address);
    var startCount = await getPendingAmount();
    res = await cntr.ConfirmTransaction(0,{from:accounts[0]});
    res = await cntr.ConfirmTransaction(0,{from:accounts[1]});
    try{
      res = await cntr.ProcessTransaction(0,{from:accounts[0]});
    }
    catch(ex){
      if(ex.message.indexOf("invalid opcode")==-1){
        errorDuringTransaction = false;
        throw "incorrect exception";
      }
    }
    var endCount = await getPendingAmount();
    await getAcc3Balance();
    assert.equal(acc3balance<acc3balanceAfter,false,'balance should stay the same');
    assert.equal(startCount,endCount, 'pendingAmount should  stay the same ');
  });
  
  
  it('should cancel transaction if no confirmation for WAIT_BLOCKS time and ProcessTransaction executed', async function() {
    var amount = 1000;
    var res = await cntr.RegisterTokenTransaction(accounts[3],amount,token.address);
    var startCount = await getPendingAmount();
    var waitBlocksCount = await cntr.WAIT_BLOCKS();
    res = await cntr.ConfirmTransaction(0,{from:accounts[0]});
    res = await cntr.SetNow(_startTimeBlock+waitBlocksCount+1);
    res = await cntr.ProcessTransaction(0,{from:accounts[0]});
    var endCount = await getPendingAmount();
    await getAcc3Balance();
    assert.equal(acc3balance<acc3balanceAfter,false,'balance should stay the same');
    assert.equal(startCount-amount,endCount, 'pendingAmount should  change ');
  });
  
  
  
});
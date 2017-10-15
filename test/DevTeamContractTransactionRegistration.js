'use strict';
var BigNumber = require('big-number');
const assertJump = require('./helpers/assertJump');
var DevTeamContractMock = artifacts.require('./helpers/DevTeamContractMock.sol');
var Caller = artifacts.require('./helpers/Caller.sol');

contract('DevTeamContractMock', function(accounts) {
  
  let cntr ;
  let acc3balance;
  let acc3balanceAfter;
  let _startTimeBlock = 1000000;
  
  beforeEach(async function() {
    cntr = await DevTeamContractMock.new(accounts[0],accounts[1],accounts[2],accounts[3]);
    let sumToSend = 10000000;
    let res = await cntr.recieveFunds({value : sumToSend});
    res = await cntr.SetNow(_startTimeBlock);
    let endBalance =  await cntr.contract._eth.getBalance(cntr.address).toNumber();
    acc3balance =  await cntr.contract._eth.getBalance(accounts[3]).toNumber();
    assert.equal(sumToSend,endBalance);
  });
  
  var getAcc3Balance = async function(){
    acc3balanceAfter  =  await cntr.contract._eth.getBalance(accounts[3]).toNumber();
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
    var res = await cntr.RegisterTransaction(accounts[3],1000);
  });
  
  
  it('register should increase transaction counter', async function() {
    var startCount = await countTransactions();
    var res = await cntr.RegisterTransaction(accounts[3],1000);
    var endCount = await countTransactions();
    assert.equal(startCount,endCount-1);
  });
  
  it('should not register transaction if not owner', async function() {
    var startCount = await countTransactions();
    try{
      var res = await cntr.RegisterTransaction({from:accounts[3]},accounts[1],1000);
      assert.isNotOk(res,'Should throw exception');
    }catch(ex){
    }
    var endCount = await countTransactions();
    assert.equal(startCount,endCount);
    
  });
  
  it('register should increase pendingAmount', async function() {
    var amount = 1000;
    var startCount = await getPendingAmount();
    var res = await cntr.RegisterTransaction(accounts[3],amount);
    var endCount = await getPendingAmount();
    assert.equal(startCount,endCount-amount);
  });
  
  
  it('should not transfer if not enaught confirmations', async function() {
    var amount = 1000;
    var res = await cntr.RegisterTransaction(accounts[3],amount);
    var startCount = await getPendingAmount();
    res = await cntr.ProcessTransaction(0);
    var endCount = await getPendingAmount();
    await getAcc3Balance();
    
    assert.equal(acc3balance,acc3balanceAfter,'balance should not increase');
    assert.equal(startCount,endCount, 'pendingAmount should not change');
  });
  
  
  it('should transfer if enaught confirmations', async function() {
    var amount = 1000;
    var res = await cntr.RegisterTransaction(accounts[3],amount);
    var startCount = await getPendingAmount();
    res = await cntr.ConfirmTransaction(0,{from:accounts[0]});
    res = await cntr.ConfirmTransaction(0,{from:accounts[2]});
    res = await cntr.ProcessTransaction(0,{from:accounts[0]});
    var endCount = await getPendingAmount();
    await getAcc3Balance();
    console.log(acc3balance,acc3balanceAfter);
    console.log(startCount,endCount);
    assert.equal(acc3balance<acc3balanceAfter,true,'balance should increase');
    assert.equal(startCount,endCount+amount, 'pendingAmount should change by transfer amount');
  });
  
  
  it('should not transfer if confirmations by the same person', async function() {
    var amount = 1000;
    var res = await cntr.RegisterTransaction(accounts[3],amount);
    var startCount = await getPendingAmount();
    res = await cntr.ConfirmTransaction(0,{from:accounts[0]});
    res = await cntr.ConfirmTransaction(0,{from:accounts[1]});
    res = await cntr.ProcessTransaction(0,{from:accounts[0]});
    var endCount = await getPendingAmount();
    await getAcc3Balance();
    console.log(acc3balance,acc3balanceAfter);
    console.log(startCount,endCount);
    assert.equal(acc3balance<acc3balanceAfter,false,'balance should stay the same');
    assert.equal(startCount,endCount, 'pendingAmount should  stay the same ');
  });
  
  
});
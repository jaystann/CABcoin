'use strict';
/*
const assertJump = require('./helpers/assertJump');
var CABCoinICO = artifacts.require('./CABCoinICO.sol');
var CABCoin = artifacts.require('./CABCoin.sol');
var DevTeamContract = artifacts.require('./DevTeamContract.sol');

contract('CABCoinICOMock', function(accounts) {
  

  let tokenICO;
  let token;
  let devTeam;
  
  
  beforeEach(async function() {
    
    tokenICO = await CABCoinICO.new(0);
    token = await CABCoin.new();
    devTeam = await DevTeamContract.new();
    
  
    await tokenICO.SetContracts(token.address,devTeam.address);
    await token.transferOwnership(tokenICO.address);
  });
  
  it('cab coins amount changess with time', async function() {
    var start = (await tokenICO._startBlock()).toNumber();
    var delay = (await tokenICO.delayOfICO1()).toNumber();
    var delay2 = (await tokenICO.delayOfICO2()).toNumber();
    var delay3 = (await tokenICO.delayOfICOEND()).toNumber();
    await tokenICO.SetTime(start + delay-1);
    console.log(start,delay);
    var amount = (await tokenICO.getCabCoinsAmount()).toNumber();
    assert.equal(amount, 33333);
    await tokenICO.SetTime(start + delay);
    amount = (await tokenICO.getCabCoinsAmount()).toNumber();
    assert.equal(amount, 25000);
    await tokenICO.SetTime(start + delay2-1);
    amount = (await tokenICO.getCabCoinsAmount()).toNumber();
    assert.equal(amount, 25000);
    await tokenICO.SetTime(start + delay2);
    amount = (await tokenICO.getCabCoinsAmount()).toNumber();
    assert.equal(amount, 20000);
    await tokenICO.SetTime(start + delay3-1);
    amount = (await tokenICO.getCabCoinsAmount()).toNumber();
    assert.equal(amount, 20000);
    await tokenICO.SetTime(start + delay3+1);
    amount = (await tokenICO.getCabCoinsAmount()).toNumber();
    assert.equal(amount, 0);
  });
  
  
  it('after delayOfICOEND isAfterICO returns true', async function() {
    var start = (await tokenICO._startBlock()).toNumber();
    var delay3 = (await tokenICO.delayOfICOEND()).toNumber();
    await tokenICO.SetTime(start + delay3+1);
    var state = (await tokenICO.isAfterICO());
    assert.equal(state, true);
  });
   
  it('after delayOfICOEND isAfterICO returns true', async function() {
    var start = (await tokenICO._startBlock()).toNumber();
    var delay3 = (await tokenICO.delayOfICOEND()).toNumber();
    await tokenICO.SetTime(start + delay3+1);
    var state = (await tokenICO.isAfterICO());
    assert.equal(state, true);
  });
  
  
  it('should refund if minimumGoal not collected ', async function() {
    var start = (await tokenICO._startBlock()).toNumber();
    var delay2 = (await tokenICO.delayOfICO2()).toNumber();
    var delay3 = (await tokenICO.delayOfICOEND()).toNumber();
    await tokenICO.SetTime(start + delay2+1);
    var acc3balanceStart =  await tokenICO.contract._eth.getBalance(accounts[3]).toNumber();
    console.log(acc3balanceStart);
    await tokenICO.buy(accounts[3],{from:accounts[3],value:500000000}); 
    await tokenICO.SetTime(start + delay3+1);
    var acc3balanceHasTokens =  await tokenICO.contract._eth.getBalance(accounts[3]).toNumber();
    console.log(acc3balanceHasTokens);
    var resp = await tokenICO.refund(accounts[3],{from:accounts[3],value:1}); 
    var acc3balanceEnd =  await tokenICO.contract._eth.getBalance(accounts[3]).toNumber();
    console.log((acc3balanceStart-acc3balanceHasTokens)/(acc3balanceStart-acc3balanceEnd));
    console.log(resp.receipt.gasUsed);
    assert.equal((acc3balanceStart-acc3balanceHasTokens)/(acc3balanceStart-acc3balanceEnd)>1000, true);
  });
  
  
});
*/

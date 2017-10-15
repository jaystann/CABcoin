'use strict';

const assertJump = require('./helpers/assertJump');
var DevTeamContractMock = artifacts.require('./helpers/DevTeamContractMock.sol');
var Caller = artifacts.require('./helpers/Caller.sol');

contract('DevTeamContractMock', function(accounts) {
  
  let cntr ;
  
  beforeEach(async function() {
    cntr = await DevTeamContractMock.new(accounts[0],accounts[1],accounts[2],accounts[3]);
  });
  
  it('should allow Transfer', async function() {
    let startBalance = await cntr.contract._eth.getBalance(cntr.address).toNumber();
    let sumToSend = 10000000;
    let res = await cntr.recieveFunds({value : sumToSend});
    let endBalance =  await cntr.contract._eth.getBalance(cntr.address).toNumber();
    assert.equal(startBalance+sumToSend,endBalance);
  });
  
  it('should return correct balance by getTotalAmount()', async function() {
    let sumToSend = 10000000;
    let res = await cntr.recieveFunds({value : sumToSend});
    let endBalance =  (await cntr.contract._eth.getBalance(cntr.address)).toNumber();
    let totalAmount =  (await cntr.getTotalAmount.call()).toNumber();
    assert.equal(totalAmount,endBalance);
  });
  
  
  it('should be callable from known Accounts', async function() {
    try{
      let res = await cntr.ProtectedCall({from:accounts[0]});
      assert.isOk(true, 'there shoud be no exception');
    }catch(err){
      console.log(err);
      assert.isNotOk(err, 'there shoud be no exception');
    }
  });
  
  it('should not be callable from unknown Accounts', async function() {
    var hasEx = false;
    try{
      let res = await cntr.ProtectedCall({from:accounts[3]});
      console.log("no exception in unknown "+res);
    }catch(err){
      hasEx = true;
      assert.isOk(err, 'there shoud be exception');
    }
    assert.isOk(hasEx, 'there shoud be exception');
  });

  it('should not be callable even from known Accounts if not direct and modifier isHuman', async function() {
    let caller = await Caller.new(cntr.address);
    console.log("caller ="+caller.address);
    console.log("cntr ="+cntr.address);
    console.log("human ="+accounts[0]);
    var hasEx = false;
    try{
      let res = await caller.HumanOnlyCall({from:accounts[0]});
      
      console.log(JSON.stringify(res));
    }catch(err){
      hasEx = true;
      assert.isOk(err, 'there shoud be exception');
    }
    assert.isOk(hasEx, 'there shoud be exception');
  });
  
  
  it('should  be callable  from known Accounts if not direct and no modifier isHuman', async function() {
    let caller = await Caller.new(cntr.address);
    var hasEx = false;
    try{
      let res = await caller.ContractCallable();
    }catch(err){
      hasEx = true;
      console.log(err);
    }
    assert.isNotOk(hasEx, 'there shoud be no exception');
  });
  
});
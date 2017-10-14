'use strict';

const assertJump = require('./helpers/assertJump');
var DevTeamContractMock = artifacts.require('./helpers/DevTeamContractMock.sol');

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

});
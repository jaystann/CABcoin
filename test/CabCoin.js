'use strict';

const assertJump = require('./helpers/assertJump');
var CabCoin = artifacts.require('./CabCoin.sol');

contract('StandardToken', function(accounts) {

  const unit = 100000000;

  let token;
  
  beforeEach(async function() {
    token = await CabCoin.new(accounts[0], 100);
  });
  
  it('should be properly constructed', async function() {
    assert.equal(await token.decimals(), 18);
    assert.equal(await token.unit(), 1000000000000000000);
    assert.equal(await token.totalSupply(), 0);    
  });

});
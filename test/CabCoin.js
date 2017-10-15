'use strict';

const assertJump = require('./helpers/assertJump');
var CABCoin = artifacts.require('./CABCoin.sol');

contract('CABCoin', function(accounts) {

  const unit = 100000000;

  let token;
  
  
  beforeEach(async function() {
    token = await CABCoin.new();
    token.mint(accounts[0],1000);
    token.mint(accounts[1],1000);
    token.mint(accounts[2],1000);
  });
  
  it('should be properly constructed', async function() {
    assert.equal(await token.decimals(), 18);
    assert.equal(await token.symbol(), "CAB");
    var tS = await token.totalSupply();
    assert.equal(parseInt(await token.totalSupply()), 3000);    
  });
 
  it('should check balance properly', async function(){
    var b0 = parseInt(await token.balanceOf(accounts[0]));
    assert.equal(b0,1000);
    var b3 = parseInt(await token.balanceOf(accounts[3]));
    assert.equal(b3,0);
  })
  it('should transfer tokens properly', async function(){
    var amount = 100;
    var b0 = parseInt(await token.balanceOf(accounts[0]));
    var b3 = parseInt(await token.balanceOf(accounts[3]));
    token.transfer(accounts[3],amount);
    var b0_1 = parseInt(await token.balanceOf(accounts[0]));
    var b3_1 = parseInt(await token.balanceOf(accounts[3]));
    
    assert.equal(b0+b3,b0_1+b3_1,'sum of tokens should not change');
    
    assert.equal(b3,b3_1-amount,'accounts[3] should have more tokens');
    
    assert.equal(b0,b0_1+amount,'accounts[0] should have less tokens');
  })
  it('should not allow transfers bigger than account balance', async function(){
    var amount = 1000;
    var b0 = parseInt(await token.balanceOf(accounts[0]));
    var b3 = parseInt(await token.balanceOf(accounts[3]));
    try{
      var res = await token.transfer(accounts[3],b0+1);
      assert.isNotOk(true,'should throw exception');
    }catch(ex){
      assert.isOk(ex,'should throw exception');
    }
    var b0_1 = parseInt(await token.balanceOf(accounts[0]));
    var b3_1 = parseInt(await token.balanceOf(accounts[3]));
    
    assert.equal(b0,b0_1,'number of accounts[0] tokens should not change');
    assert.equal(b3,b3_1,'number of accounts[3] tokens should not change');
  })
  
});
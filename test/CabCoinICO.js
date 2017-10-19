'use strict';



const assertJump = require('./helpers/assertJump');
var CABCoinICO = artifacts.require('./CABCoinICO.sol');

  contract('CABCoinICO', function(accounts) {

 var coinAbi =  [ { "constant": true, "inputs": [], "name": "TEAM_SHARE_PERCENTAGE", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "mintingFinished", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "delayOfICO2", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "blocksByDay", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxTokenSupplyICO2", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "PRICE_ICO4", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxTokenSupplyICO3", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxTokenSupplyICOEND", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "PRICE_ICO3", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "delayOfICOEND", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "type": "function" }, 
 { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "mint", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "PRICE_ICO1", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxTokenSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "finishMinting", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "PRICE_ICO2", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "PRICE_PREICO", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "PRE_ICO_RISK_PERCENTAGE", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getMaxTokenAvaliable", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "delayOfICO3", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "minimumGoal", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "type": "function" },
 { "constant": true, "inputs": [], "name": "delayOfPreICO", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxTokenSupplyICO1", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "delayOfICO1", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxTokenSupplyPreICO", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [], "name": "MintFinished", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]
    var filter = null;
  
  
    const unit = 100000000;
  
    let tokenICO;
    
  
    beforeEach(async function() {
      tokenICO = await CABCoinICO.new({from:accounts[0]},{fromBlock: 0, toBlock: 'latest'});
      try{
          filter.stopWatching();
      }catch(ex){};
        
    });
    
    it('should be properly constructed', async function() {
      assert.equal(await tokenICO.PRICE_PREICO(), 50000);
    });
   
    it('should not be afterICO on the begining of it', async function(){
      var amount = await tokenICO.getCabCoinsAmount();
      console.log('amount ='+amount);
      var state = await tokenICO.isAfterICO();
      console.log('state ='+state);
      assert.equal(state, false);
    })
    
    it('should return proper CAB Coins Amounts', async function(){
      var amount =(await tokenICO.getCabCoinsAmount()).toNumber();
      assert.equal(amount, (await tokenICO.PRICE_PREICO()).toNumber());
    })
    
    
    it('minting coin should be possible', async function(){
       var coinAdr = await tokenICO.coin();
       var coinInstance = await web3.eth.contract(coinAbi).at(coinAdr);
       var isFinished = await coinInstance.mintingFinished();
       console.log(JSON.stringify(isFinished));
       assert.equal(isFinished,false);
    })
    
    it('should buy without errors and balance should be correct', async function(){
      
       var coinAdr = await tokenICO.coin();
       var ethVal = 10000;
       var balance = 0;
       var amount =(await tokenICO.getCabCoinsAmount()).toNumber();
        var coinInstance = await web3.eth.contract(coinAbi).at(coinAdr);
       
       try{
        var resp = await tokenICO.buy({value:ethVal,from:accounts[1]});
       }catch(ex){
        assert.notOk(ex,'there should be no exception');
       };
      
        var balance =  await coinInstance.balanceOf(accounts[1]);
        assert.equal(balance,ethVal*amount);
    });
    
    
    
    it('should buy by fallback without errors and balance should be correct', async function(){
      
       var coinAdr = await tokenICO.coin();
       var ethVal = 10000;
       var balance = 0;
       var amount =(await tokenICO.getCabCoinsAmount()).toNumber();
       var coinInstance = await web3.eth.contract(coinAbi).at(coinAdr);
       
       try{
          var resp = await tokenICO.fallback({value:ethVal,from:accounts[1]});
       }catch(ex){
          assert.notOk(ex,'there should be no exception');
       };
      
        var balance =  (await coinInstance.balanceOf(accounts[1])).toNumber();
        assert.equal(balance,ethVal*amount);
    });
    
  });
  
  

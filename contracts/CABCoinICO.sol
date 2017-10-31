pragma solidity ^0.4.15;



import './Common/Constant.sol';
import './Common/SafeMath.sol';

contract DevTeamContractI{
	function recieveFunds() payable public;
}

contract CABCoinI{
  address public owner;
  uint256 public totalSupply;
  bool public mintingFinished = false;
  modifier onlyOwner() {
    if(msg.sender == owner){
      _;
    }
    else{
      revert();
    }
  }
  
  modifier canMint() {
    if(!mintingFinished){
      _;
    }
    else{
      revert();
    }
  }
  function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool);
  function getMaxTokenAvaliable() constant public  returns(uint256);
  function finishMinting() onlyOwner public returns (bool);
}

contract CABCoinICO is Constants{
  using SafeMath for uint256;
  mapping(address => bool) public preICOHolders ;
  mapping(address => uint256) public ethGiven ;
	address public tokenAddress = 0;
	DevTeamContractI public devTeam;
	uint256 public _startBlock ;
	CABCoinI public coin;
	
	
	event AmountToLittle();
	
  modifier canMint() {
    if(coin.mintingFinished()==false){
    	_;
    }
    else{
    	
    }
  }
  
  bool private isRunned = false;
  
  modifier runOnce() {
  	if(isRunned){
  		revert();
  	}
  	else{
  		isRunned = true;
  		_;
  	}
  }
  
	uint256 public currBlock = 1;
	
	function GetTime() public constant returns(uint256) {
	  return block.number;
	}
	
	function getAllTimes() constant returns(uint256,uint256,uint256){
		if(GetTime()<_startBlock){
			return(_startBlock.sub(GetTime()),0,0);
		}
		if(GetTime()<=_startBlock.add(delayOfICOEND))
		{
			uint256 currentStageTime = 0;
			if(GetTime()<_startBlock.add(delayOfPreICO)){
				currentStageTime = _startBlock.add(delayOfPreICO) - GetTime();
			}
			else{
				if(GetTime()<_startBlock.add(delayOfICO1)){
					currentStageTime = _startBlock.add(delayOfICO1) - GetTime();
				}
				else{
					if(GetTime()<_startBlock.add(delayOfICO2)){
						currentStageTime = _startBlock.add(delayOfICO2) - GetTime();
					}
				}
			}
			if(GetTime()>=_startBlock){
				return(0,currentStageTime,_startBlock.add(delayOfICOEND)-GetTime());
			}
		}
		else{
			return(0,0,0);
		}
	}
	
	function CABCoinICO(uint256 sBlock) public {
		if(sBlock==0){
	    	_startBlock = GetTime();
		}
		else{
	    	_startBlock = sBlock;
		}
	}
	
	function SetContracts(address coinAdr, address dev) runOnce(){
		
  		if(tokenAddress == address(0)){
  			tokenAddress = coin;
		    coin = CABCoinI(coinAdr);
		    devTeam =  DevTeamContractI(dev);
		    
		    
  		}
	}
	
	function getMaxEther() constant public  returns(uint256) {
		uint256 maxAv = coin.getMaxTokenAvaliable();
		uint256 price = getCabCoinsAmount();
		var maxEth = maxAv.div(price);
		return maxEth;
	}
	
	function isAfterICO()  public constant returns(bool) {
	  return (getCabCoinsAmount() == 0); 
	}
	
	function getCabCoinsAmount()  public constant returns(uint256) {
	    if(GetTime()<_startBlock.add(delayOfPreICO)){
	    	if(maxTokenSupplyPreICO>coin.totalSupply()){
	        	return PRICE_PREICO;
	    	}
	    }
	    if(GetTime()<_startBlock.add(delayOfICO1) ){
		    if(maxTokenSupplyICO1>coin.totalSupply()){
		        return PRICE_ICO1;
		    }	
	    } 
	    if(GetTime()<_startBlock.add(delayOfICO2)){
	    	if(maxTokenSupplyICO2>coin.totalSupply()){
	        	return PRICE_ICO2;
	    	}
	    }
	    if(GetTime()<=_startBlock.add(delayOfICOEND)){
	    	if(maxTokenSupplyICOEND>=coin.totalSupply()){
	        	return PRICE_ICO4;
	    	}
	    }
		return 0; 
	}
	
	function() payable public{
		
	  if(isAfterICO() && coin.totalSupply()<minimumGoal){
		this.refund.value(msg.value)(msg.sender);
	  }
	  else{
	  	if(isAfterICO() == false){
			this.buy.value(msg.value)(msg.sender);
	  	}
	  }
	}
	
	function buy(address owner) payable public{
		
	  bool isMintedDev ;
	  bool isMinted ;
	  uint256 tokensAmountPerEth = getCabCoinsAmount();
	  
		if(GetTime()<_startBlock){
			revert();
		}
		else{
			
			if(tokensAmountPerEth==0){
			  coin.finishMinting();
			  msg.sender.transfer(msg.value);
			}
			else{
			
				uint256 tokensAvailable = coin.getMaxTokenAvaliable() ;
		  		uint256 val = msg.value * tokensAmountPerEth ;
		  		
		  		uint256 valForTeam = val.mul(TEAM_SHARE_PERCENTAGE).div(100-TEAM_SHARE_PERCENTAGE);
		  		
		  		if(tokensAvailable<val+valForTeam){
		  			val = val.mul(tokensAvailable).div(val.add(valForTeam));
		  			valForTeam = valForTeam.mul(tokensAvailable).div(val.add(valForTeam));
			  		isMintedDev =coin.mint(owner,val);
			  		isMinted =  coin.mint(devTeam,valForTeam);
			  		
			     	ethGiven[owner] = msg.value;
			  		if(isMintedDev==false){
			  		  revert();
			  		}
			  		if(isMinted==false){
			  		  revert();
			  		}
					coin.finishMinting();
		  		}
		  		else
		  		{
		  			
			  		if(IsPreICO()){
			  		  preICOHolders[owner] = true;
			  		  devTeam.recieveFunds.value(msg.value.mul(PRE_ICO_RISK_PERCENTAGE).div(100))();
			  		}
			  	
			  		isMintedDev =coin.mint(owner,val);
			  		isMinted =  coin.mint(devTeam,valForTeam);
			  		
			     	ethGiven[owner] = msg.value;
			  		if(isMintedDev==false){
			  		  revert();
			  		}
			  		if(isMinted==false){
			  		  revert();
			  		}
			  		
		  		}
			
			}
		 
		}
		
	}
	
	function IsPreICO() returns(bool){
	  if(GetTime()<_startBlock.add(delayOfPreICO)){
	    return true;
	  }
	  else{
	    return false;
	  }
	}
	
	function sendAllFunds() public {
	  if(coin.totalSupply()>=minimumGoal){ // goal reached monay Goes to devTeam
		devTeam.recieveFunds.value(this.balance)();
	  }
	  else
	  {
	    revert();
	  }
	}
	
	
	function refund(address sender) payable public {
	  if(isAfterICO() && coin.totalSupply()<minimumGoal){ // goal not reached
	    var sumToReturn = ethGiven[sender];
	     ethGiven[sender] =0;
	    if(preICOHolders[msg.sender]){
	    	sumToReturn = sumToReturn.mul(100-PRE_ICO_RISK_PERCENTAGE).div(100);
	    }
	    sender.transfer(sumToReturn+msg.value);
	  }
	  else
	  {
	  	 sender.transfer(msg.value);
	  }
	}
}

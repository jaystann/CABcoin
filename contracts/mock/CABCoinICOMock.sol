pragma solidity ^0.4.15;



import './../Common/Constant.sol';
import './../Common/SafeMath.sol';
import './../CABCoinICO.sol';

  contract CoinI{
	  function balanceOf(address who) constant public returns (uint256);	
  }
  
contract CABCoinICOMock is CABCoinICO(0){
	uint256 public minimumGoal = 500000 ;
	uint256 public time = 0 ;
	
	uint256 public constant delayOfPreICO =5;
	uint256 public constant delayOfICO1 = 10;
	uint256 public constant delayOfICO2 = 15;
	uint256 public constant delayOfICOEND = 20;
  uint256 public constant maxTokenSupplyPreICO = 1000000 ; 
  uint256 public constant maxTokenSupplyICO1 = 2000000 ; 
  uint256 public constant maxTokenSupplyICO2 = 3000000 ; 
  uint256 public constant maxTokenSupplyICOEND = 4000000 ; 
  
	
	
	function runPayment() payable public {
		
		  if(isAfterICO() && coin.totalSupply()<minimumGoal){
			this.refund.value(msg.value)(msg.sender);
		  }else{
		  	if(isAfterICO() == false){
				this.buy.value(msg.value)(msg.sender);
		  	}else{
		  		if(msg.value==0){
		  			sendAllFunds();
		  		}else{
		  			revert();	
		  		}
		  	}
		  }	
	}
	
	function GetUserBalance(address user) public returns(uint256){
		return CoinI(coin).balanceOf(user);	
	}
	
	function SetTime(uint256 t) public{
	  time = t;	
	}
  
	function GetTime() public constant returns(uint256) {
	  return time;
	}
	
	function GetStartBlock() public constant returns(uint256) {
	  return _startBlock;
	}
	
	function CABCoinICOMock(uint256 x) public {
	    	_startBlock = x;
	}
	
}

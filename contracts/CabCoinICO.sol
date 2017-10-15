pragma solidity ^0.4.15;



import './CABCoin.sol';
import './DevTeamContract.sol';
import './Common/Constant.sol';

contract CABCoinICO is Constants{
  using SafeMath for uint256;
  mapping(address => bool) preICOHolders ;
  mapping(address => uint256) ethGiven ;
	address public tokenAddress = 0;
	DevTeamContract public devTeam;
	uint256 public _startBlock ;
	CABCoin coin;
	
  modifier canMint() {
    require(!coin.mintingFinished());
    _;
  }
  
	function GetTime() public returns(uint256){
	  return block.number;
	}
	
	function CABCoinICO() public {
	    _startBlock = GetTime();
  		if(tokenAddress == address(0)){
  			var token = new CABCoin();
  			tokenAddress = address(token);
		    coin = CABCoin(tokenAddress);
		    devTeam = new DevTeamContract();
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
	    if(GetTime()<_startBlock.add(delayOfPreICO) && maxTokenSupplyPreICO>coin.totalSupply()){
	        return PRICE_PREICO;
	    }
	    if(GetTime()<_startBlock.add(delayOfICO1) && maxTokenSupplyICO1>coin.totalSupply()){
	        return PRICE_ICO1;
	    }
	    if(GetTime()<_startBlock.add(delayOfICO2) && maxTokenSupplyICO2>coin.totalSupply()){
	        return PRICE_ICO2;
	    }
	    if(GetTime()<_startBlock.add(delayOfICO3) && maxTokenSupplyICO3>coin.totalSupply()){
	        return PRICE_ICO3;
	    }
	    if(GetTime()<=_startBlock.add(delayOfICOEND) && maxTokenSupplyICOEND>=coin.totalSupply()){
	        return PRICE_ICO4;
	    }
		return 0; 
	}
	
	function() payable canMint public{
		this.buy.value(msg.value)();
	}
	
	function buy() payable canMint public{
	  uint256 tokensAvailable = coin.getMaxTokenAvaliable() ;
	  uint256 tokensAmountPerEth = getCabCoinsAmount();
	  
		if(tokensAmountPerEth==0){
		  coin.finishMinting();
		  msg.sender.transfer(msg.value);
		}
		else{
	  		uint256 val = msg.value * getCabCoinsAmount() ;
	  		if(IsPreICO()){
	  		  preICOHolders[msg.sender] = true;
	  		  devTeam.recieveFunds.value(msg.value.mul(PRE_ICO_RISK_PERCENTAGE).div(100))();
	  		}
	  		
	  		uint256 valForTeam = val.mul(TEAM_SHARE_PERCENTAGE).div(100-TEAM_SHARE_PERCENTAGE);
	  		
	  	
	  		if(tokensAvailable<val+valForTeam){
	  		  revert();
	  		}
	  		coin.mint(msg.sender,val);
	  		bool isMinted =  coin.mint(devTeam,val);
	  		ethGiven[msg.sender] = msg.value;
	  		if(isMinted==false){
	  		  revert();
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
	
	function refund() public {
	  if(isAfterICO() && coin.totalSupply()<minimumGoal){ // goal not reached
	    var sumToReturn = ethGiven[msg.sender];
	     ethGiven[msg.sender] =0;
	    if(preICOHolders[msg.sender]){
	    	sumToReturn = sumToReturn.mul(100-PRE_ICO_RISK_PERCENTAGE).div(100);
	    }
	    msg.sender.transfer(sumToReturn);
	  }
	  else
	  {
	    revert();
	  }
	}
}

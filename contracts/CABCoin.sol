pragma solidity ^0.4.15;

import './OpenZeppelinToken.sol';
import './Common/Constant.sol';

contract CABCoin is MintableToken{
    
	
	string public constant name = "CabCoin";
	string public constant symbol = "CAB";
	uint8 public constant decimals = 18;
	
	uint256 public constant TEAM_SHARE_PERCENTAGE = 16;

  uint256 public constant maxTokenSupply = (10**18)*(10**9) ; 
  function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
      
  	if(totalSupply.add(_amount)<maxTokenSupply){
  	  super.mint(_to,_amount);
  	  return true;
  	}
  	else{
  		return false; 
  	}
  	
  	return true;
  }
  
  function getMaxTokenAvaliable() constant public  returns(uint256) {
  	return (maxTokenSupply.sub(totalSupply)).mul(100-TEAM_SHARE_PERCENTAGE).div(100);
  }
}

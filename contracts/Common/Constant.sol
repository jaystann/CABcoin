pragma solidity ^0.4.15;

contract Constants {
	uint256 public constant PRE_ICO_RISK_PERCENTAGE = 5;
	uint256 public constant TEAM_SHARE_PERCENTAGE = 16;
	uint256 public constant blocksByDay = 5760;
	uint256 public constant PRICE_PREICO = 50000;
	uint256 public constant PRICE_ICO1 = 33333;
	uint256 public constant PRICE_ICO2 = 25000;
	uint256 public constant PRICE_ICO4 = 20000;
	
	uint256 public constant delayOfPreICO = blocksByDay*23;
	uint256 public constant delayOfICO1 = blocksByDay*46;
	uint256 public constant delayOfICO2 = blocksByDay*69;
	uint256 public constant delayOfICOEND = blocksByDay*90;
    uint256 public constant minimumGoal = (10**18)*(10**5)*2666 ; // minimalny cel to 266 000 000 cab coinów, co da 6 000 Eth 
  uint256 public constant maxTokenSupplyPreICO = (10**18)*(10**8)*2 ; 
  uint256 public constant maxTokenSupplyICO1 = (10**18)*(10**8)*5 ; 
  uint256 public constant maxTokenSupplyICO2 = (10**18)*(10**8)*7 ; 
  uint256 public constant maxTokenSupplyICOEND = (10**18)*(10**7)*84 ; 
}


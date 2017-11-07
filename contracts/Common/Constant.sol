pragma solidity ^0.4.15;

contract Constants {
	uint256 public constant PRE_ICO_RISK_PERCENTAGE = 5;
	uint256 public constant TEAM_SHARE_PERCENTAGE = 16;
	uint256 public constant blocksByDay = 6306;
	uint256 public constant PRICE_PREICO = 50000;
	uint256 public constant PRICE_ICO1 = 33333;
	uint256 public constant PRICE_ICO2 = 25000;
	uint256 public constant PRICE_ICO4 = 20000;
	
	uint256 public constant delayOfPreICO = blocksByDay*23;
	uint256 public constant delayOfICO1 = blocksByDay*46;
	uint256 public constant delayOfICO2 = blocksByDay*69;
	uint256 public constant delayOfICOEND = blocksByDay*90;
    uint256 public constant minimumGoal = (10**18)*(10**6)*178 ; 
  uint256 public constant maxTokenSupplyPreICO = (10**18)*(10**6)*357 ; 
  uint256 public constant maxTokenSupplyICO1 = (10**18)*(10**6)*595 ; 
  uint256 public constant maxTokenSupplyICO2 = (10**18)*(10**6)*833 ; 
  uint256 public constant maxTokenSupplyICOEND = (10**18)*(10**6)*1000 ; 
}


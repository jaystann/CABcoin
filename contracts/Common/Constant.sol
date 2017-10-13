pragma solidity ^0.4.15;

contract Constants {
	uint256 public constant PRE_ICO_RISK_PERCENTAGE = 10;
	uint256 public constant TEAM_SHARE_PERCENTAGE = 16;
	uint256 public constant blocksByDay = 2700;
	uint256 public constant PRICE_PREICO = 50000;
	uint256 public constant PRICE_ICO1 = 40000;
	uint256 public constant PRICE_ICO2 = 30000;
	uint256 public constant PRICE_ICO3 = 25000;
	uint256 public constant PRICE_ICO4 = 20000;
	
	uint256 public constant delayOfPreICO = blocksByDay*30;
	uint256 public constant delayOfICO1 = blocksByDay*60;
	uint256 public constant delayOfICO2 = blocksByDay*90;
	uint256 public constant delayOfICO3 = blocksByDay*120;
	uint256 public constant delayOfICOEND = blocksByDay*150;
  uint256 public constant minimumGoal = (10**18)*(10**8)*3 ; 
  uint256 public constant maxTokenSupplyPreICO = (10**18)*(10**8)*2 ; 
  uint256 public constant maxTokenSupplyICO1 = (10**18)*(10**8)*4 ; 
  uint256 public constant maxTokenSupplyICO2 = (10**18)*(10**8)*6 ; 
  uint256 public constant maxTokenSupplyICO3 = (10**18)*(10**8)*8 ; 
  uint256 public constant maxTokenSupplyICOEND = (10**18)*(10**8)*10 ; 
}


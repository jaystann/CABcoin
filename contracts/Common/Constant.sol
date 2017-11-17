pragma solidity ^0.4.15;

contract Constants {
	uint256 public constant PRE_ICO_RISK_PERCENTAGE = 5;
	uint256 public constant TEAM_SHARE_PERCENTAGE = 16;
	uint256 public constant blocksByDay = 6150;
	uint256 public constant coinMultiplayer = (10**18);
	
	uint256 public constant PRICE_PREICO = 12500;
	uint256 public constant PRICE_ICO1 = 10000;
	uint256 public constant PRICE_ICO2 = 8000;
	uint256 public constant PRICE_ICO4 = 6250;
	
	uint256 public constant delayOfPreICO = blocksByDay*30;
	uint256 public constant delayOfICO1 = blocksByDay*50;
	uint256 public constant delayOfICO2 = blocksByDay*70;
	uint256 public constant delayOfICOEND = blocksByDay*90;
   uint256 public constant minimumGoal = coinMultiplayer*(10**5)*1786 ;
  uint256 public constant maxTokenSupplyPreICO = coinMultiplayer*(10**6)*357 ; 
  uint256 public constant maxTokenSupplyICO1 = coinMultiplayer*(10**6)*595 ; 
  uint256 public constant maxTokenSupplyICO2 = coinMultiplayer*(10**6)*833 ; 
  uint256 public constant maxTokenSupplyICOEND =coinMultiplayer*(10**6)*1000 ; 
}


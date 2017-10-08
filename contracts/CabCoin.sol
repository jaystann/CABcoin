pragma solidity ^0.4.11;

import './StandardToken.sol';

/**
 * @title CabCoin
 *
 * @dev Implementation of CabCoin.
 */
contract CabCoin is StandardToken {
    
	string public constant name = "CabCoin";
	string public constant symbol = "CAB";
	uint8 public constant decimals = 18;
	uint public constant unit = 1000000000000000000;

	uint public constant totalSupply = 0 * unit;

	function CabCoin() {		
	}
}
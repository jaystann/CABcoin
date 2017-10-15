pragma solidity ^0.4.15;

import './../../contracts/mock/DevTeamContractMock.sol';

contract Caller {
    DevTeamContractMock dest ;
    event CallerEv(address caller, address ctrct);
    
    function Caller(address adr) public{
        dest = DevTeamContractMock(adr);
    }
    
    
    function HumanOnlyCall() public {
        CallerEv(msg.sender,this);
        dest.HumanOnlyCall();
    }
    
    function ContractCallable() public  {
    }
}
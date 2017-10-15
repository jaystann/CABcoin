pragma solidity ^0.4.15;

import './../../contracts/DevTeamContract.sol';

contract DevTeamContractMock is DevTeamContract{
    
    
    address[] testAddr ;
    
    function DevTeamContractMock(address acc1_u1,address acc2_u1,address acc1_u2,address acc1_notOwner) public{
        testAddr.push(acc1_u1);
        testAddr.push(acc2_u1);
        testAddr.push(acc1_u2);
        testAddr.push(acc1_notOwner);
        SetupAccounts() ;
    }
    event DevTeamContractMockEv(address caller, address ctrct, address orgn);
    
    function ProtectedCall() public isOwner isHuman {
        
    }
    
    function HumanOnlyCall() public isHuman {
        
        DevTeamContractMockEv(msg.sender,this, tx.origin);
    }
    
    function ContractCallable() public {
        
        DevTeamContractMockEv(msg.sender,this, tx.origin);
    }
    
    
    function SetupAccounts() public{
        if(testAddr.length>=4){
          owners[testAddr[0]] = 1; // pod jednym bitem (userem) może być więcej niż jedno konto
          owners[testAddr[1]] = 1;
          owners[testAddr[2]] = 2;}
    }
    
}
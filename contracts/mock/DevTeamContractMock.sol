pragma solidity ^0.4.15;

import './../../contracts/DevTeamContract.sol';

contract DevTeamContractMock is DevTeamContract{
    
    
    address[] testAddr ;
    
    uint256 public _now;
    
    function DevTeamContractMock(address acc1_u1,address acc2_u1,address acc1_u2,address acc1_notOwner,address acc1_u3) public{
        testAddr.push(acc1_u1);
        testAddr.push(acc2_u1);
        testAddr.push(acc1_u2);
        testAddr.push(acc1_notOwner);
        testAddr.push(acc1_u3);
        SetupAccounts() ;
    }
    event DevTeamContractMockEv(address caller, address ctrct, address orgn);
    
    function SetNow(uint256 n) public{
        _now = n;
    }
    
    function GetNow() public constant returns(uint256){
        return _now;
    }
    
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
          owners[testAddr[2]] = 2;
          owners[testAddr[4]] = 4;}
    }
    
}
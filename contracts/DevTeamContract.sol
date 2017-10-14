pragma solidity ^0.4.15;

import './Common/Constant.sol';

contract DevTeamContract{
    
    struct Transaction{
        address _to;
        uint256 amount;
        uint256 registrationBlock;
    }    
    
    uint256 public pendingAmount = 0;
    
    uint256 constant  WAIT_BLOCKS = 500;
    uint256 constant MINIMUM_CONFIRMATION_COUNT = 2;
    
    uint256 constant USER1_CODE = 1;// każdy user ma inny bit 
    address constant USER1_ACCOUNT1 = 0x94DA43C587c515AD30eA86a208603a7586D2C25F; 
    address constant USER1_ACCOUNT2 = 0x56947aC048452f75A64e2411CA140336cF939f7D;
    uint256 constant USER2_CODE = 2;// każdy user ma inny bit 
    address constant USER2_ACCOUNT1 = 0x59A5aC4033dB403587e8BEAb8996EDe2F170413a;
    uint256 constant USER3_CODE = 4;// każdy user ma inny bit 
    uint256 constant USER4_CODE = 8;// każdy user ma inny bit 
    
    mapping (address => uint256) owners;
    mapping (uint256 => uint256) confirmations;
    Transaction[] public transactions  ;
    
    function DevTeamContract() public{
      owners[USER1_ACCOUNT1] = USER1_CODE; // pod jednym bitem (userem) może być więcej niż jedno konto
      owners[USER1_ACCOUNT2] = USER1_CODE;
      owners[USER2_ACCOUNT1] = USER2_CODE;
    }
    
    function getTotalAmount() constant public returns(uint256){
        return (this.balance);
    }
    
    function getTotalNumberOfTransactions() constant public returns(uint256){
        return (transactions.length);
    }
    
    function countConfirmations(uint256 i) constant public returns(uint256){
        uint256 counter = 0;
        uint256 tmp = 0;
        tmp = confirmations[i];
        //sumuję ile bitów jest ustawionych na 1
        while(tmp>0){
            counter = counter + tmp%2 ;
            tmp = tmp/2;
        }
        return counter;
    }
    
    // Function used by ICO Contract to send ether to wallet
    function recieveFunds() payable public{
        
    }
    
    // Only human, wallet can not be invoked from other contract
    modifier isHuman() {
        if(msg.sender != tx.origin){
            revert();
        }
        else{
            _;
        }
    }
    
    modifier isOwner() {
        if(owners[msg.sender]>0){
            _;   
        }
        else{
            revert();
        }
    }
    
    function RegisterTransaction(address _to,uint256 amount) isHuman isOwner public{
    
        if(owners[msg.sender]>0 && amount+pendingAmount<=this.balance){
            transactions.push(Transaction(_to,amount,block.number));
            pendingAmount = amount+pendingAmount;
        }
    }
    
    function ConfirmTransaction(uint256 i)  isHuman isOwner public{
        confirmations[i] = confirmations[i] | owners[msg.sender];
    }
    
    function ReverseConfirmTransaction(uint256 i)  isHuman isOwner public{
        confirmations[i] = confirmations[i] & (~owners[msg.sender]);
    }
    
    function ProcessTransaction(uint256 i) isHuman isOwner public{
        
        if(owners[msg.sender]>0){
            if(countConfirmations(i)>=MINIMUM_CONFIRMATION_COUNT 
            && transactions[i].registrationBlock<block.number-WAIT_BLOCKS
            && transactions[i].amount > 0){
                var tmp = transactions[i].amount;
                transactions[i].amount = 0;
                transactions[i]._to.transfer(tmp);
                pendingAmount = pendingAmount -tmp;
            }
            else{
                if(transactions[i].registrationBlock<block.number-WAIT_BLOCKS){ 
                    //if not confirmed sofar cancel
                    transactions[i].amount = 0;
                }
            }
        }
    }
  
}
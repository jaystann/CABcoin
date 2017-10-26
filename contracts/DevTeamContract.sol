pragma solidity ^0.4.15;

import './Common/Constant.sol';


contract Transferable {
  function transfer(address to, uint256 value) public returns (bool);
}

contract DevTeamContract{
    
    struct Transaction{
        address _to;
        uint256 amount;
        uint256 registrationBlock;
        address from;
    }    
    
    // Only human, wallet can not be invoked from other contract,
    // If so transaction is reverted
    modifier isHuman() {
        var sndr = msg.sender;
        var orgn = tx.origin;
        if(sndr != orgn){
            revert();
        }
        else{
            _;
        }
    }
    
    /*
     revert operation if caller is not owner of wallet specified in constructor
    */
    modifier isOwner() {
        if(owners[msg.sender]>0){
            _;   
        }
        else{
            revert();
        }
    }
    
    uint256 public pendingAmount = 0;
    
    /*
     Numbers of blocks in which transaction must be confirmed by wallet owners 
     to be allowed for execution, here 10000 blocks ~2.5 days
    */
    uint256 public constant  WAIT_BLOCKS = 15000;
    uint256 constant MINIMUM_CONFIRMATION_COUNT = 2;
    
    uint256 constant USER1_CODE = 1;// every user has different bit
    address constant USER1_ACCOUNT1 = 0xEdf57c2A10899AE483a4E52D86b305d53cFC91cb; //user can have more than one account in case he have lost it
    uint256 constant USER2_CODE = 2;// every user has different bit
    address constant USER2_ACCOUNT1 = 0x60C154C1B378fe6bae48521161601fB98CEa2731;
    uint256 constant USER3_CODE = 4;// every user has different bit
    address constant USER3_ACCOUNT1 = 0x94DA43C587c515AD30eA86a208603a7586D2C25F;
    uint256 constant USER4_CODE = 8;// every user has different bitt 
    
    mapping (address => uint256) public owners;
    mapping (uint256 => uint256) public confirmations;
    Transaction[] public transactions  ;
    
    /*
        Constructor
    */
    function DevTeamContract() public{
        SetupAccounts();
    }
    
    /*
        time measuement is based on blocks
    */
    function GetNow() public constant returns(uint256){
        return block.number;
    }
    /*
      Function that sets the accounts that can do transfers 
      Only first call changes anything
    */
    function SetupAccounts() public{
      owners[USER1_ACCOUNT1] = USER1_CODE; // all accounts get assigned to the users
      owners[USER2_ACCOUNT1] = USER2_CODE; // all accounts get assigned to the users
      owners[USER3_ACCOUNT1] = USER3_CODE; // all accounts get assigned to the users
    }
    /*
        Gets Contract Balance
    */
    function getTotalAmount() constant public returns(uint256){
        return (this.balance);
    }
    /*
      Gets Total number of transactions ever created
      
    */
    function getTotalNumberOfTransactions() constant public returns(uint256){
        return (transactions.length);
    }
    
    /*
    Counts number of confirmations if number is equal or greater than 
    MINIMUM_CONFIRMATION_COUNT transaction can be confirmed
    */
    function countConfirmations(uint256 i) constant public returns(uint256){
        uint256 counter = 0;
        uint256 tmp = 0;
        tmp = confirmations[i];
        if(tmp%2==0){ //USER1 ALWAYS NEED TO ACCEPT
            return 0;
        }
        //SUMS Number of bits set to 1
        while(tmp>0){
            counter = counter + tmp%2 ;
            tmp = tmp/2;
        }
        return counter;
    }
    
    // Function used by ICO Contract to send ether to wallet
    function recieveFunds() payable public{
        
    }
    
    
    /*
        Registers transaction for confirmation
        from that moment wallet owners have WAIT_BLOCKS blocks to confirm transaction
    */
    function RegisterTransaction(address _to,uint256 amount) isHuman isOwner public{
    
        if(owners[msg.sender]>0 && amount+pendingAmount<=this.balance){
            transactions.push(Transaction(_to,amount,this.GetNow(),address(0)));
            pendingAmount = amount+pendingAmount;
        }
    }
    /*
        Registers transaction for confirmation, designed for tokens transfer
        from that moment wallet owners have WAIT_BLOCKS blocks to confirm transaction
    */
    function RegisterTokenTransaction(address _to,address _from,uint256 amount) isHuman isOwner public{
    
        if(owners[msg.sender]>0 && amount+pendingAmount<=this.balance){
            transactions.push(Transaction(_to,amount,this.GetNow(),_from));
            pendingAmount = amount+pendingAmount;
        }
    }
    /*
        If caller is one of wallet owners Function note his confirmation 
        for transaction number i
    */
    function ConfirmTransaction(uint256 i)  isHuman isOwner public{
        confirmations[i] = confirmations[i] | owners[msg.sender];
    }
    
    /*
        If caller is one of wallet owners Function revert his confirmation 
        for transaction number i
    */
    function ReverseConfirmTransaction(uint256 i)  isHuman isOwner public{
        confirmations[i] = confirmations[i] & (~owners[msg.sender]);
    }
    /*
      If Transaction number i has correct numbers of confirmations and
      It has been created less than WAIT_BLOCKS ago it gets executed
      otherwise, if time is longer than WAIT_BLOCKS it is cancelled,
      otherwise nothing happends
    */
    function ProcessTransaction(uint256 i) isHuman isOwner public{
        uint256 tmp;
        if(owners[msg.sender]>0){
            if(this.countConfirmations(i)>=MINIMUM_CONFIRMATION_COUNT 
            && transactions[i].amount > 0){
                if(transactions[i].from==address(0)){
                    tmp = transactions[i].amount;
                    transactions[i].amount = 0;
                    transactions[i]._to.transfer(tmp);
                    pendingAmount = pendingAmount -tmp;
                }
                else{
                    var token = Transferable(transactions[i].from);
                    tmp = transactions[i].amount;
                    transactions[i].amount = 0;
                    token.transfer(transactions[i]._to,tmp);
                }
            }
            else{
                if(transactions[i].registrationBlock<this.GetNow()-WAIT_BLOCKS ){ 
                    //if not confirmed sofar cancel
                    tmp = transactions[i].amount;
                    pendingAmount = pendingAmount -tmp;
                    transactions[i].amount = 0;
                }
                else{
                    assert(false);
                }
            }
        }
    }
  
}
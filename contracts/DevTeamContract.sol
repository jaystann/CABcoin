pragma solidity ^0.4.15;

import './Common/Constant.sol';
contract DevTeamContract{
    
    struct Transaction{
        address _to;
        uint256 amount;
        uint256 registrationBlock;
        bool isCoin;
    }    
    
    event HumanCheck(address sender, address origin);
    
    // Only human, wallet can not be invoked from other contract,
    // If so transaction is reverted
    modifier isHuman() {
        var sndr = msg.sender;
        var orgn = tx.origin;
        HumanCheck(sndr,orgn);
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
     to be allowed for execution, here 5000 blocks ~20-48 hours
    */
    uint256 public constant  WAIT_BLOCKS = 5000;
    uint256 constant MINIMUM_CONFIRMATION_COUNT = 2;
    
    uint256 constant USER1_CODE = 1;// every user has different bit
    address constant USER1_ACCOUNT1 = 0xca35b7d915458ef540ade6068dfe2f44e8fa733c; //user can have more than one account in case he have lost it
    address constant USER1_ACCOUNT2 = 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c;//user can have more than one account in case he have lost it
    uint256 constant USER2_CODE = 2;// every user has different bit
    address constant USER2_ACCOUNT1 = 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db;
    uint256 constant USER3_CODE = 4;// every user has different bit
    uint256 constant USER4_CODE = 8;// every user has different bitt 
    
    mapping (address => uint256) public owners;
    mapping (uint256 => uint256) public confirmations;
    Transaction[] public transactions  ;
    address public coinAdr ;
    
    
    /*
        Constructor
    */
    function DevTeamContract(address coinAddress) public{
        coinAdr = coinAddress;
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
      owners[USER1_ACCOUNT2] = USER1_CODE; // all accounts get assigned to the users
      owners[USER2_ACCOUNT1] = USER2_CODE; // all accounts get assigned to the users
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
    
    
    /*
        Registers transaction for confirmation
        from that moment wallet owners have WAIT_BLOCKS blocks to confirm transaction
    */
    function RegisterTransaction(address _to,uint256 amount,bool isCoin) isHuman isOwner public{
    
        if(owners[msg.sender]>0 && amount+pendingAmount<=this.balance){
            transactions.push(Transaction(_to,amount,this.GetNow(),isCoin));
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
                if(transactions[i].isCoin == false){
                    tmp = transactions[i].amount;
                    if(tmp>this.balance){
                        transactions[i].amount = 0;
                        transactions[i]._to.transfer(tmp);
                        pendingAmount = pendingAmount -tmp;
                    }
                    else{
                        revert();
                    }
                }
                else
                {
                    /*transferTokens*/
                }
            }
            else{
                if(transactions[i].registrationBlock<this.GetNow()-WAIT_BLOCKS ){ 
                    //if not confirmed sofar cancel
                    tmp = transactions[i].amount;
                    pendingAmount = pendingAmount -tmp;
                    transactions[i].amount = 0;
                }
            }
        }
    }
  
}
pragma solidity ^0.4.15;

contract CoinI{
    
    uint256 public totalSupply ;
    uint256 public maxTokenSupply ;
}
contract IcoI{
    
    function getAllTimes() public constant returns(uint256,uint256,uint256);
    function getCabCoinsAmount()  public constant returns(uint256);
}
contract StatsContract{
    
    
    CoinI public coin;
    IcoI  public ico;
    address public dev;
    
    function setAddresses(address devA,address coinA, address icoA){
        ico = IcoI(icoA);
        dev = devA;
        coin = CoinI(coinA);
    }
    function getStats() constant returns (address,address,uint256,uint256,uint256,uint256,uint256,uint256){
        address[2] memory adr;
        adr[0] =  address(coin);
        adr[1] = address(ico);
        var (toStart,toEndPhase,toEndAll) = ico.getAllTimes();
       // var cabsPerEth = ico.getCabCoinsAmount();
        var amountSold = coin.totalSupply()/(10**18);
        var maxSupply = coin.maxTokenSupply()/(10**18);
        var ethRised = (adr[1].balance + dev.balance)/(10**15);
        
        return (adr[0], adr[1], toStart, toEndPhase, toEndAll, amountSold, maxSupply, ethRised);
    }
  
}
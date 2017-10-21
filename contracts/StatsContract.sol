pragma solidity ^0.4.15;

contract CoinI{
    
    uint256 public totalSupply ;
    uint256 public maxTokenSupply ;
}
contract IcoI{
    
    function getAllTimes() public constant returns(uint256,uint256,uint256);
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
        address coinA = address(coin);
        address icoA = address(ico);
        var (toStart,toEndPhase,toEndAll) = ico.getAllTimes();
        var amoutSold = coin.totalSupply();
        var maxSupply = coin.maxTokenSupply();
        var ethRised = icoA.balance + dev.balance;
        
        return (coinA, icoA, toStart, toEndPhase, toEndAll, amoutSold, maxSupply, ethRised);
    }
  
}
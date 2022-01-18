// // SPDX-License-Identifier: GPL-3.0
// pragma solidity 0.8.11;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract Erc20Token is ERC20 {
//     constructor() ERC20("ESG", "ETK") {
//           _mint(msg.sender, 100000000e18);
//     }

// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";



contract MyToken is ERC20,Ownable{


constructor() ERC20("ESG", "ETK") {
     _mint(msg.sender, 100000000e18);
    }

 //function mintToken(address to, uint256 amount) public onlyOwner returns (bool){
    function mintToken(address to, address nftCA, uint256 amount) public onlyOwner returns (bool){
        require(to != address(0x0));
        require(amount > 0);
        _mint(to, amount);
        //_approve(to, msg.sender, allowance(to, msg.sender) + amount);  // approve 추가
       _approve(to, nftCA, allowance(to, nftCA) + amount);  // approve 추가
        // _approve(to, sellCA, allowance(to, sellCA) + amount);  // approve 추가
        return true;
    }


}
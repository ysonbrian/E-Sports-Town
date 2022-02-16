// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.5.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Erc20Token is ERC20, Ownable {
    constructor() ERC20("ESG", "ETK") {
          _mint(msg.sender, 10000000000000e18);
    }

}
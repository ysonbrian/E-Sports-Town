// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc20Token is ERC20 {
    constructor() ERC20("ESG", "ETK") {
          _mint(msg.sender, 100000000e18);
    }

}
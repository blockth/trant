// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TrantToken is ERC20 {
    constructor() public ERC20("Trant Token", "TRANT") {
        _mint(msg.sender, 1000e18);
    }
}

// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Manage is Ownable {
    mapping(address => bool) public managers;

    constructor() {}

    /**@dev Allows execution by managers only */
    modifier managerOnly() {
        require(managers[msg.sender]);
        _;
    }

    function setManager(address manager, bool state) public onlyOwner {
        managers[manager] = state;
    }
}

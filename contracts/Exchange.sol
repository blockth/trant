// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Manage.sol";
import "./TokenBase.sol";

//Interface name is not important, however functions in it are important
// interface TokenBaseInterface {
//     function sendReward(uint256 amount, address user) external;
// }

contract Exchange is Ownable {
    uint256 public creationTime = block.timestamp;
    uint256 public rate = 1e14; // tokens for 1 eth
    uint256 public rateMultiply = 1e4;
    event Bought(uint256 amount);
    event Sold(uint256 amount);

    IERC20 public token;
    // address public tokenBase;

    mapping(address => uint256) tokenPriceFeed;

    constructor(address _trantTokenAddress) {
        token = IERC20(_trantTokenAddress);
        // tokenBase = _tokenBase;
    }

    function checkBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function checkTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    //10000 unit buy
    // should equal to 1 ether
    function buyToken(uint256 amountInEth) public payable {
        // uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountInEth > 0, "You need to send some ether");
        // require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");

        uint256 tokenReturn = amountInEth / rate;
        // require(amountTobuy >= costWei);
        assert(token.transfer(msg.sender, tokenReturn));
        emit Bought(amountInEth);
    }

    function buyTokenOnPayload() public payable {
        uint256 amountInEth = msg.value;
        // uint256 dexBalance = token.balanceOf(address(this));
        require(amountInEth > 0, "You need to send some ether");
        // require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");

        uint256 tokenReturn = (amountInEth * 1 ether) / rate;
        // // require(amountTobuy >= costWei);
        // assert(token.transferFrom(address(this), msg.sender, tokenReturn));
        assert(token.transfer(msg.sender, tokenReturn));
        emit Bought(amountInEth);
    }

    function sellToken(uint256 amount) public {
        uint256 exchangeEth = amount / rateMultiply;
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(exchangeEth);
        // emit Sold(amount);
    }

    function stakeTokens(uint256 _amount, address _token) public {
        //what tokens can they stake?
        // how much can they stake?
        require(_amount > 0, "Amount must be more than 0!");
        // require(tokenIsAllowed(_token), "Token is currently no allowed!");
        //transfer from function needed.
        // ERC20 2 types transfer(can be called by only the owner) and transferFrom
        IERC20(_token).transferFrom(msg.sender, address(this), _amount); //we have the ABI via this IERC20
    }

    function sendReward(uint256 amount, address user) external {
        //managerOnly {
        uint256 dexBalance = token.balanceOf(address(this));
        require(amount <= dexBalance, "Not enough tokens in the reserve");

        // uint256 tokenReturn = (1 * 1 ether) / rate;
        // token.approve(address(this), tokenReturn);
        assert(token.transfer(user, amount / 20));
        emit Bought(1);
        // if (amount > 50) {
        //     assert(token.transfer(user, 5));
        //     emit Bought(1);
        //     // token.transfer(user, 5);
        // } else if (amount < 50 && amount < 20) {
        //     assert(token.transfer(user, 3));
        //     emit Bought(1);
        // } else {
        //     assert(token.transfer(user, 1));
        //     emit Bought(1);
        // }
    }
}

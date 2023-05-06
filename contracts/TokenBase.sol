// SPDX-License-Identifier:MIT

// transfer
// enroll ?
// issue rewards
// add allowed 2 tokens
// getEthValue

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Exchange.sol";
import "./Manage.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

//Interface name is not important, however functions in it are important
// interface ExchangeInterface {
//     function sendReward(uint256 amount, address user) external;
// }

contract TokenBase is Ownable {
    address[] public allowedTokenList;
    // mapping token address -> staker address -> amount
    mapping(address => mapping(address => uint256))
        public tokenUserBalancePayment;

    // address public constant OTHER_CONTRACT =
    //     0x8016619281F888d011c84d2E2a5348d9417c775B;
    // ExchangeInterface GreeterContract = GreeterInterface();

    //user total paid for campaign

    address[] public users;

    address[] public stationList;

    // mapping(address => address) public tokenStation;

    // mapping(address => mapping(address => uint256)) public tokenStationBalance;

    AggregatorV3Interface internal ethUSDPriceFeed;
    AggregatorV3Interface internal sUSDPriceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     **/
    IERC20 public trantToken;

    address public exchange;

    // There are 2 transfer function in ethereum chain
    // one is the transfer I can use it only I am the owner of the contract
    // transferFrom is the publicly used one. here used only one contract
    // this. But needed to expand peer to peer using this contract.
    constructor(
        address _priceFeedAddress,
        address _priceFeedAddressO,
        address _exchange,
        address _token
    ) {
        ethUSDPriceFeed = AggregatorV3Interface(_priceFeedAddress);
        sUSDPriceFeed = AggregatorV3Interface(_priceFeedAddressO);
        trantToken = IERC20(_token);
        exchange = _exchange;
    }

    // ExchangeInterface IExchange = ExchangeInterface(exchange);

    // tested
    function getPriceFeedEth() public view returns (uint256) {
        (, int256 price, , , ) = ethUSDPriceFeed.latestRoundData();
        uint256 adjustedPrice = uint256(price) * 10**10; //because returned data is already has 8 decimals
        // return uint256(price);
        return adjustedPrice;
    }

    //tested
    function getPriceFeedS() public view returns (uint256) {
        (, int256 price, , , ) = sUSDPriceFeed.latestRoundData();
        uint256 adjustedPrice = uint256(price) * 10**10; //because returned data is already has 8 decimals
        //return uint256(price);
        return adjustedPrice;
    }

    //tested
    function sendToken(uint256 _amount) public {
        //what token can they use?
        // how much can they send?
        require(_amount > 0, "Amount must be more than 0!");
        // require(isTokenAllowed(_token), "You should send TRANT");
        require(trantToken.balanceOf(address(msg.sender)) > _amount);
        trantToken.transferFrom(msg.sender, address(this), _amount);
        //     trantToken.approve()
        //    token.approve(TransferToken.sol Contract Address, amount);
        //    transferToken.transferFrom(recipient, amount);
        // uint256 ret = getPriceFeedEth();
        // return ret;
        // users.push(msg.sender); // we added user to the users.
        // tokenStationBalance[_token][station] += _amount;
        //trantToken.transferFrom(exchange, msg.sender, calculateRate(_amount));

        // IExchange.sendReward(_amount, msg.sender);

        // exchange.call.gas(1000000).value(1 ether)(
        //     "sendReward",
        //     _amount,
        //     msg.sender
        // );

        Exchange ex = Exchange(exchange);
        ex.sendReward(_amount, msg.sender);
    }

    function sellToken(uint256 amount) public {
        // uint256 exchangeEth = (amount * 1 ether) / rateMultiply;
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = trantToken.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        trantToken.transferFrom(msg.sender, address(this), amount);
        // payable(msg.sender).transfer(exchangeEth);
        // emit Sold(amount);
    }

    //tested
    function enrollStation(address _state) public onlyOwner {
        stationList.push(_state);
    }

    //tested
    function getStation(uint256 index) public view onlyOwner returns (address) {
        if (stationList.length > index) return stationList[index];
    }

    //tested
    function addAllowedTokens(address _token) public onlyOwner {
        allowedTokenList.push(_token);
    }

    //tested
    function getAllowedTokens(uint256 index)
        public
        view
        onlyOwner
        returns (address)
    {
        if (allowedTokenList.length > 0) return allowedTokenList[index];
    }

    // indirectly tested
    function isTokenAllowed(address _token) public returns (bool) {
        for (
            uint256 allowedTokenCounter = 0;
            allowedTokenCounter < allowedTokenList.length;
            allowedTokenCounter++
        ) {
            if (allowedTokenList[allowedTokenCounter] == _token) return true;
        }
        return false;
    }
}

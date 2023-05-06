from brownie import accounts, network, Exchange, web3
from scripts.deploy import KEPT_BALANCE, deploy_exchange

from scripts.helpful_scripts import LOCAL_BLOCKCHAIN_ENVIRONMENTS, get_account
import pytest
from web3 import Web3

# unit test function of buy tokens
# assert in 2 cases such as
# 1 if total supply = inital total + allocated for test + sold amount
# 2 if buyer has that amount of token
def test_buy():
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    account = get_account()
    non_owner = get_account(index=1)
    exchange, trant = deploy_exchange()
    # Act
    exchange.buyTokenOnPayload({"from": non_owner, "value": 100})
    # Assert
    assert exchange.checkTokenBalance() == trant.totalSupply() - KEPT_BALANCE - 100
    # print(non_owner.balance)

    assert trant.balanceOf(non_owner.address) == 100


# # deploy the DEX
# dex = DEX.deploy({'from':account1})

# # call the buy function to swap ether for token
# # 1e18 is 1 ether denominated in wei
# dex.buy({'from': account2, 1e18})

# # get the deployment address for the ERC20 token
# # that was deployed during DEX contract creation
# # dex.token() returns the deployed address for token
# token = ERC20Basic.at(dex.token())

# # call the token's approve function
# # approve the dex address as spender
# # and how many of your tokens it is allowed to spend
# token.approve(dex.address, 3e18, {'from':account2})


def test_sell():
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    account = get_account()
    non_owner = get_account(index=1)
    exchange, trant = deploy_exchange()
    exchange.buyToken({"from": non_owner, "value": 100})

    trant.approve(exchange.address, 3e18, {"from": non_owner})

    exchange.sellToken(100, {"from": non_owner})

    assert trant.balanceOf(non_owner.address) == 0

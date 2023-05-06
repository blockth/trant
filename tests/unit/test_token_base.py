from lib2to3.pgen2 import token
from brownie import TokenBase, accounts, network, config, Exchange
import pytest
from scripts.helpful_scripts import LOCAL_BLOCKCHAIN_ENVIRONMENTS, get_account
from scripts.deploy import deploy_exchange, deploy_token_base
from web3 import Web3


def test_enroll_station():
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing")
    account = get_account()
    non_owner = get_account(index=1)
    token_base, trant = deploy_token_base()

    # address of metamask account 3: 0xBbdbDe13C20CF0f4c428f890527B46F8aEB1Bed8
    # Act
    token_base.enrollStation(non_owner.address, {"from": account})
    token_base.addAllowedTokens(trant.address, {"from": account})
    # assert
    # assert token_base.getStation(0) == non_owner.address
    token_base.stationList(0) == non_owner.address
    assert token_base.getAllowedTokens(0) == trant.address


# amount, token address, station address
def test_send_token():
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing")
    account = get_account()
    non_owner = get_account(index=1)
    token_base, trant, exchange = deploy_token_base()

    trant.approve(token_base.address, 3e18, {"from": account})

    # exchange.approve(account.address, 10, {"from": account})
    # trant.approve(exchange.address, 3e18, {"from": account})
    # account tum tokenlera sahip oldugu icin ondan yolladim
    # baska token olan accountlar da yollayabilmeli
    token_base.sendToken(100, trant.address, non_owner.address, {"from": account})
    # exchange.sell(100, {"from": non_owner})

    assert trant.balanceOf(non_owner.address) == 100

    # print(trant.balanceOf(account.address))
    assert trant.balanceOf(account.address) == 100

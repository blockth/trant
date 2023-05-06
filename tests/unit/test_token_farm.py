# from lib2to3.pgen2 import token
# from brownie import accounts, network, config, exceptions
# from web3 import Web3

# from scripts.helpful_scripts import (
#     INITIAL_PRICE_FEED,
#     get_account,
#     LOCAL_BLOCKCHAIN_ENVIRONMENTS,
#     get_contract,
# )
# from scripts.deploy import deploy_token_farm_and_trip_token
# import pytest

# # from tests.conftest import amount_staked


# def test_setPriceFeedContract():
#     # Arrange
#     if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
#         pytest.skip("Only for local testing")
#     account = get_account()
#     non_owner = get_account(index=1)
#     token_farm, dapp_token = deploy_token_farm_and_trip_token()

#     # Act phase
#     token_farm.setPriceFeedContract(
#         dapp_token.address,
#         get_contract("eth_usd_price_feed"),
#         {"from": account},
#     )
#     # Assert
#     assert token_farm.tokenPriceFeedMapping(dapp_token.address) == get_contract(
#         "eth_usd_price_feed"
#     )
#     with pytest.raises(exceptions.VirtualMachineError):
#         token_farm.setPriceFeedContract(
#             dapp_token.address, get_contract("eth_usd_price_feed"), {"from": non_owner}
#         )


# def test_stake_tokens(amount_staked):
#     # Arrange
#     if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
#         pytest.skip("Only for local testing")
#     account = get_account()
#     token_farm, dapp_token = deploy_token_farm_and_trip_token()
#     # Act

#     dapp_token.approve(token_farm.address, amount_staked, {"from": account})

#     token_farm.stakeTokens(amount_staked, dapp_token.address, {"from": account})
#     # Assert
#     assert (
#         token_farm.stakingBalance(dapp_token.address, account.address) == amount_staked
#     )
#     assert token_farm.uniqueTokensStaked(account.address) == 1
#     assert token_farm.stakers(0) == account.address

#     return token_farm, dapp_token


# def test_issue_tokens(amount_staked):

#     # Arrange
#     if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
#         pytest.skip("Only for local testing")
#     account = get_account()
#     token_farm, dapp_token = test_stake_tokens(amount_staked)
#     starting_balance = dapp_token.balanceOf(account.address)
#     # Act
#     token_farm.issueTokens({"from": account})

#     # Arrange
#     # we are staking 1 dapp == in price to 1 ETH
#     # we should get 2000 dapp tokens in reward 2000000000000000000 initial feed
#     # since the price of eth is 2000
#     assert (
#         dapp_token.balanceOf(account.address) == starting_balance + INITIAL_PRICE_FEED
#     )


# def test_unstake_tokens(amount_staked):
#     # Arrange
#     if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
#         pytest.skip("Only for local testing")
#     account = get_account()
#     not_owner = get_account(2)
#     token_farm, dapp_token = test_stake_tokens(amount_staked)
#     starting_balance = dapp_token.balanceOf(account.address)
#     # Act
#     # with pytest.raises(exceptions.VirtualMachineError):
#     #     token_farm.unstakeTokens(dapp_token.address, {"from": not_owner})

#     token_farm.unstakeTokens(dapp_token.address, {"from": account})
#     assert token_farm.stakingBalance(dapp_token.address, account.address) == 0

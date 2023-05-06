from brownie import TokenBase, network, config
from scripts.deploy import deploy_token_base
from scripts.helpful_scripts import get_account
from web3 import Web3


def test_get_eth_usd_price_feed():
    account = get_account()
    # tokenBase = TokenBase.deploy(
    #     config["networks"][network.show_active()]["eth_usd_price_feed"],
    #     config["networks"][network.show_active()]["oil_usd_price_feed"],
    #     {"from": account},
    # )

    tokenBase = deploy_token_base()
    # print(tokenBase.getPriceFeedEth())
    assert tokenBase.getPriceFeedEth() == 3050e18  # Web3.toWei(1, "ether")
    # assert tokenBase.getPriceFeedEth() == 3050e18
    # print(tokenBase.getPriceFeedS())  # 111.66 $
    # assert tokenBase.getPriceFeedS() == 111.66e18
    # assert tokenBase.getPriceFeedS() == 111.66e18
    # 1 Varil 158.987 litre
    # 1 litre petrol => 0.7$ -> 10.25 TL
    # Vergiler ve diger maliyetler -> 21.5 TL

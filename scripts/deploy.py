from ast import Load
import json
from operator import truediv
import os
import shutil
from black import get_cache_info
from brownie import accounts, config, network, TrantToken, Exchange, TokenBase, Manage
import yaml

from scripts.helpful_scripts import get_account, get_contract
from web3 import Web3

KEPT_BALANCE = 0  # Web3.toWei(1, "ether")  # for testing purposes


def deploy_exchange():
    account = get_account()
    trant_token = TrantToken.deploy({"from": account}, publish_source=False)

    print(f"TRANT supply {trant_token.totalSupply()}")

    exchange_ = Exchange.deploy(
        trant_token.address,
        {"from": account},
        publish_source=config["networks"][network.show_active()]["verify"],
    )
    # sending most of the supply to the exchange
    trx = trant_token.transfer(
        exchange_.address, trant_token.totalSupply() - KEPT_BALANCE, {"from": account}
    )
    trx.wait(1)

    print(f"Exchange balance {exchange_.checkTokenBalance()}")
    # TRANT
    # weth wrapped eth
    # weth_token = get_contract("weth_token")
    # allow only payment with trant
    # token_base.addAllowedTokens(trant_token.address, {"from": account})

    return exchange_, trant_token


def copy_folders_to_frontend(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def update_front_end():
    copy_folders_to_frontend("./build", "./front-end/src/chain-info")
    # sending the frontend our config in JSON format
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./front-end/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("front end updated")


def deploy_token_base():
    account = get_account()
    exchange, trant = deploy_exchange()

    token_base = TokenBase.deploy(
        config["networks"][network.show_active()]["eth_usd_price_feed"],
        config["networks"][network.show_active()]["oil_usd_price_feed"],
        exchange.address,
        trant.address,
        {"from": account},
        publish_source=False,
    )

    print(f"Exchange balance {exchange.checkTokenBalance()}")

    # print(f"Token Base balance {trant.balanceOf(token_base.address)}")
    # TRANT
    # weth wrapped eth
    # weth_token = get_contract("weth_token")
    # allow only payment with trant
    token_base.addAllowedTokens(trant.address, {"from": account})
    # token_base.addAllowedTokens(trant_token.address, {"from": account})
    # manage = Manage.deploy({"from": account})
    # manage.setManager(token_base.address, True)
    # if update_front_end:
    update_front_end()
    return token_base, trant, exchange


def add_allowed_tokens(exchange_, dict_of_allowed_tokens, account):
    pass


def main():
    deploy_token_base()

from brownie import (
    network,
    config,
    accounts,
    Contract,
    interface,
    LinkToken,
    MockV3Aggregator,
    MockWETH,
    MockDAI,
)


INITIAL_PRICE_FEED = 2000000000000000000000
DECIMALS = 18

NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["hardhat", "development", "ganache"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS + [
    "mainnet-fork",
    "binance-fork",
    "matic-fork",
]


def get_account(index=None, id=None):
    if index:
        return accounts[index]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    if id:
        return accounts.load(id)

    return accounts.add(config["wallets"]["from_key"])


contract_to_mock = {
    "eth_usd_price_feed": MockV3Aggregator,
    # "dai_usd_price_feed": MockV3Aggregator,
    # "fau_token": MockDAI,
    "weth_token": MockWETH,
}

"""If you want to use this function, go to the brownie config and add a new entry for
    the contract that you want to be able to 'get'. Then add an entry in the in the variable 'contract_to_mock'.
    You'll see examples like the 'link_token'.
        This script will then either:
            - Get a address from the config
            - Or deploy a mock to use for a network that doesn't have it
        Args:
            contract_name (string): This is the name that is refered to in the
            brownie config and 'contract_to_mock' variable.
        Returns:
            brownie.network.contract.ProjectContract: The most recently deployed
            Contract of the type specificed by the dictonary. This could be either
            a mock or the 'real' contract on a live network.
"""


def get_contract(contract_name):
    contract_type = contract_to_mock[contract_name]
    if network.show_active() in NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        if len(contract_type) <= 0:
            deploy_mocks()
        contract = contract_type[-1]

    else:
        try:
            contract_address = config["networks"][network.show_active()][contract_name]
            contract = Contract.from_abi(
                contract_type._name, contract_address, contract_type.abi
            )
        except KeyError:
            print(
                f"{network.show_active()} address not found, perhaps you should add it to the config or deploy mocks?"
            )
            print(
                f"brownie run scripts/deploy_mocks.py -- network {network.show_active()}"
            )

    return contract


def deploy_mocks(decimals=DECIMALS, initial_value=INITIAL_PRICE_FEED):
    """
    Use this script if you want to deploy mocks to a testnet
    """
    print(f"The active network is {network.show_active()}")
    print("Deploying mocks...")
    account = get_account()

    # print("Deploying mock Link Token")
    # link_token = LinkToken.deploy({"from": account})
    # print("Deploying mock price feed")
    # mock_price_feed = MockV3Aggregator.deploy(
    #     decimals, initial_value, {"from": account}
    # )
    # print(f"Deployed to {mock_price_feed.address}")
    # print("Deploying Mock DAI...")
    # dai_token = MockDAI.deploy({"from": account})
    # print(f"Deployed to {dai_token.address}")
    print("Deploying Mock WETH")
    weth_token = MockWETH.deploy({"from": account})
    print(f"Deployed to {weth_token.address}")

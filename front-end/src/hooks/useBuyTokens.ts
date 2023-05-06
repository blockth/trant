import Exchange from "../chain-info/contracts/Exchange.json"
import Trant from "../chain-info/contracts/TrantToken.json"
import networkMapping from "../chain-info/deployments/map.json"

import { useEffect, useState } from "react"
import { useTabsList } from "@mui/base"
import { ERC20Interface, useContractFunction, useEthers } from "@usedapp/core"
import { constants, utils } from "ethers"
import { Contract } from "@ethersproject/contracts"

export const useBuyTokens = (tokenAddress: string) => {
    // address, abi, chainId
    // approve and exchange

    /// we have the exchange contract
    const { chainId } = useEthers()
    const { abi } = Exchange
    const exchangeAddress = chainId ? networkMapping[String(chainId)]["Exchange"][0] : constants.AddressZero
    const exchangeInterface = new utils.Interface(abi)
    const exchangeContract = new Contract(exchangeAddress, exchangeInterface)

    //we need to approve first from the erc20
    // we have the token contract
    const erc20TokenAbi = Trant.abi
    const erc20Interface = new utils.Interface(erc20TokenAbi)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)


    // approve and sell
    // first implement approve
    const { send: approveErc20Send, state: approveErc20StateBuy } =
        useContractFunction(erc20Contract, "approve", {
            transactionName: "Approve ERC20 transfer!"
        })

    const approveAndBuy = (amount: string) => {
        setAmountToBuy(amount)
        return approveErc20Send(exchangeAddress, amount)
    }

    // second implement sell function
    // const { send:exchangeBuy, state:sendState} = 
    // useContractFunction(exchangeContract, "buyToken", {
    //     transactionName:"Buy Tokens",
    // })

    const [amountToSell, setAmountToBuy] = useState("0")
    // useEffect allows you do smt if anything changes


    // const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

    const { state, send } = useContractFunction(exchangeContract, 'buyTokenOnPayload', {
        transactionName: 'Buy Trant Token'
    })
    const { status } = state

    const wrapEther = (etherAmount: string) => {
        // void send({ value: utils.parseEther(etherAmount)})
        void send({ value: etherAmount })
    }
    // const buyToken = (etherAmount:string) => {
    //     send({value:utils.parseEther(etherAmount)})
    // }


    useEffect(() => {

        if (approveErc20StateBuy.status === "Success" && amountToSell != "0") {
            //sell 
            wrapEther(amountToSell)
            //exchangeBuy(amountToSell)// we fill this whenever approve called.
            //, {value:0.02}
        }
    }, [approveErc20StateBuy, amountToSell])
    return { approveAndBuy, approveErc20StateBuy }
}

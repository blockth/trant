import { formatUnits } from "@ethersproject/units"
import { Button, Input } from "@material-ui/core"
import { useEthers, useTokenBalance } from "@usedapp/core"
import React, { useState } from "react"
import { Token } from "../Main"
import { useStakeTokens } from "../../hooks/useStakeTokens"
import { useBuyTokens } from "../../hooks/useBuyTokens"
import { useEtherPrice } from "../../hooks/useEtherPrice"
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { constants } from "ethers"
import Exchange from "../../chain-info/contracts/Exchange.json"
import Trant from "../../chain-info/contracts/TrantToken.json"
import networkMapping from "../../chain-info/deployments/map.json"
import { ERC20Interface, useContractFunction } from "@usedapp/core"

export interface ExchangeFormProps {
    token: Token
}

export const ExchangeForm = ({ token }: ExchangeFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)

    const formattedTokenBalance: number = tokenBalance ?
        parseFloat(formatUnits(tokenBalance, 18)) : 0

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)

    const handleInputchangeSell = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }

    // to call approve or any smart contract related form 
    // we will use hooks
    const { approveAndSell, approveErc20State } = useStakeTokens(tokenAddress)

    const { approveAndBuy, approveErc20StateBuy } = useBuyTokens(tokenAddress)

    const handleExchangeSell = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndSell(amountAsWei.toString())
        //return approveAndSell(amount.toString())
    }

    const handleInputchangeBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }


    ////
    const { chainId } = useEthers()
    const { abi } = Exchange
    const exchangeAddress = chainId ? networkMapping[String(chainId)]["Exchange"][0] : constants.AddressZero
    const exchangeInterface = new utils.Interface(abi)
    const exchangeContract = new Contract(exchangeAddress, exchangeInterface)

    // const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

    // const {state, send} = useContractFunction(exchangeContract, "buyToken", {
    //     transactionName:"Buy Tokens",})
    // const { status } = state

    // const wrapEther = () => {
    //     void send(10000,{ value: 0.02 })
    // }


    const handleExchangeBuy = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndBuy(amountAsWei.toString())
    }
    const etherPrice = useEtherPrice()
    return (
        <>
            <Input onChange={handleInputchangeBuy} placeholder="In Ether Terms" />
            <Button color="primary" onClick={handleExchangeBuy}
                size="large">
                Buy
            </Button>


            <Input onChange={handleInputchangeSell} placeholder="In TRANT Terms" />
            <Button color="primary" onClick={handleExchangeSell}
                size="large">
                Sell
            </Button>
        </>
    )
}
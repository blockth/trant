export const LiterForm = {}

// import { formatUnits } from "@ethersproject/units"
// import { Button, Input } from "@material-ui/core"
// import { useEthers, useTokenBalance } from "@usedapp/core"
// import React, { useState } from "react"
// import {Token} from "../Main"
// import { useStakeTokens } from "../../hooks/useStakeTokens"
// import { useBuyTokens } from "../../hooks/useBuyTokens"
// import {utils} from "ethers"
// import { Contract } from "@ethersproject/contracts"
// import { constants } from "ethers"
// import TokenBase from "../../chain-info/contracts/TokenBase.json"
// import Trant from "../../chain-info/contracts/TrantToken.json"
// import   networkMapping from "../../chain-info/deployments/map.json"
// import {connectContractToSigner, ERC20Interface, useContractFunction} from "@usedapp/core"

// export interface LiterFormProps {
//     token:Token
// }

// export const LiterForm = ({ token} : LiterFormProps) => {
//     // const{address:tokenAddress, name} = token
//     // const {account} = useEthers()
//     // const tokenBalance = useTokenBalance(tokenAddress, account)

//     // const formattedTokenBalance: number = tokenBalance ? 
//     //     parseFloat(formatUnits(tokenBalance, 18)) : 0

//     // const [amount, setAmount] = useState<number | string | Array<number | string>> (0)
    
//     // const handleInputchangeSell = (event: React.ChangeEvent<HTMLInputElement>) => {
//     //     const newAmount = event.target.value === "" ? "" : Number(event.target.value)
//     //     setAmount(newAmount)
//     //     console.log(newAmount)
//     // }

//     // // to call approve or any smart contract related form 
//     // // we will use hooks
//     // const {approveAndSell, approveErc20State} = useStakeTokens(tokenAddress)
    
//     const {approveAndBuy, approveErc20StateBuy} = useBuyTokens(tokenAddress)
    
//     const handleExchangeSell = () => {
//         const amountAsWei = utils.parseEther(amount.toString())
//         return approveAndSell(amountAsWei.toString())
//     }

//     const handleInputchangeBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newAmount = event.target.value === "" ? "" : Number(event.target.value)
//         setAmount(newAmount)
//         console.log(newAmount)
//     }


// ////
//     const {chainId} = useEthers()
//     const {abi} = TokenBase
//     const exchangeAddress = chainId ? networkMapping[String(chainId)]["Exchange"][0] : constants.AddressZero
//     const exchangeInterface = new utils.Interface(abi)
//     const exchangeContract = new Contract(exchangeAddress,exchangeInterface)

//     // const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

//     // const {state, send} = useContractFunction(exchangeContract, "buyToken", {
//     //     transactionName:"Buy Tokens",})
//     // const { status } = state

//     // const wrapEther = () => {
//     //     void send(10000,{ value: 0.02 })
//     // }

//     return (
//         <>
//         <Input onChange={handleInputchangeSell}/>
//         <Button color="primary" onClick={handleExchangeBuy}
//         size="large">
//         Buy
//         </Button>


//         <Input onChange={handleInputchangeBuy}/>
//         <Button color="primary" onClick={handleExchangeSell}
//         size="large">
//         Sell
//         </Button>
//         </>
//     )
// }
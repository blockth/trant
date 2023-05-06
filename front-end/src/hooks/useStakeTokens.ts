import Exchange from "../chain-info/contracts/Exchange.json"
import Trant from "../chain-info/contracts/TrantToken.json"
import   networkMapping from "../chain-info/deployments/map.json"

import { useEffect, useState } from "react"
import { useTabsList } from "@mui/base"
import {ERC20Interface, useContractFunction, useEthers} from "@usedapp/core"
import { constants, utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
export const useStakeTokens = (tokenAddress: string) => {
    // address, abi, chainId
    // approve and exchange

    /// we have the exchange contract
    const {chainId} = useEthers()
    const {abi} = Exchange
    const exchangeAddress = chainId ? networkMapping[String(chainId)]["Exchange"][0] : constants.AddressZero
    const exchangeInterface = new utils.Interface(abi)
    const exchangeContract = new Contract(exchangeAddress,exchangeInterface)

    //we need to approve first from the erc20
    // we have the token contract
    const erc20TokenAbi = Trant.abi
    const erc20Interface = new utils.Interface(erc20TokenAbi)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)


    // approve and sell
    // first implement approve
    const {send:approveErc20Send, state: approveErc20State} =
        useContractFunction(erc20Contract, "approve", {
            transactionName:"Approve ERC20 transfer!"
        })
    
    const approveAndSell = (amount:string) => {
        setAmountToSell(amount)
        return approveErc20Send(exchangeAddress,amount)
    }

    // second implement sell function
    const { send:exchangeSend, state:sendState} = 
    useContractFunction(exchangeContract, "sellToken", {
        transactionName:"Sell Tokens",
    })

    const [amountToSell, setAmountToSell] = useState("0")
    // useEffect allows you do smt if anything changes

    useEffect(() => {

        if (approveErc20State.status === "Success" && amountToSell != "0"){
            //sell 
            exchangeSend(amountToSell)// we fill this whenever approve called.

        }
    }, [approveErc20State,amountToSell])
    return {approveAndSell, approveErc20State}
}

// export {}
// import { useEffect, useState } from "react"
// import { useTabsList } from "@mui/base"
// import {connectContractToSigner, ERC20Interface, useContractFunction, useEthers} from "@usedapp/core"
// import { constants, utils } from "ethers"
// import { Contract } from "@ethersproject/contracts"
// import  TokenFarm  from "../chain-info/contracts/TokenFarm.json"
// import   networkMapping from "../chain-info/deployments/map.json"
// import ERC20 from "../chain-info/contracts/MockERC20.json"

// export const useStakeTokens = (tokenAddress: string) => {
//     // address
//     // abi
//     // chainId

//     const {chainId} = useEthers()
//     const {abi} = TokenFarm
//     const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
//     const tokenFarmInterface = new utils.Interface(abi)
//     const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)
    
//     const erc20ABI = ERC20.abi
//     const erc20Interface = new utils.Interface(erc20ABI)
//     const erc20Contract = new Contract(tokenAddress, ERC20Interface)
//     // approve
//     // stake

//     const {send: approveErc20Send, state: approveAndStakeErc20State} = 
//         useContractFunction(erc20Contract, "approve", {
//             transactionName: "Approve ERC20 transfer"
//             })
//     const [state, setState] = useState(approveAndStakeErc20State)
    
//     const [amountToStake, setAmountToStake] = useState("0")

//     const approveAndStake = (amount: string) => {
//         setAmountToStake(amount)
//         return approveErc20Send(tokenFarmAddress, amount)
//     }

//     // 
//     const { send: stakeSend, state:stakeState }  = 

//     useContractFunction(tokenFarmContract, "stakeTokens",
//         {transactionName:"Stake Tokens",
//     })
    

//     //useEffect tum sayfayi yeniden render etme
//     // ama approve state Success donduyse stakeSend'i calistir ustteki
    
//     useEffect(() => {
//         if(approveAndStakeErc20State.status === "Success"){
//             //
//             stakeSend(amountToStake, tokenAddress)
//         }
//     }, [approveAndStakeErc20State, amountToStake, tokenAddress])

//     // useEffect(() => {
//     //     if(approveAndStakeErc20State.status === "Success"){
//     //         setState(stakeState)
//     //     }
//     //     else{
//     //         setState(approveAndStakeErc20State)
//     //     }
//     // }, [approveAndStakeErc20State, stakeState])

//     return {approveAndStake, state}
// }
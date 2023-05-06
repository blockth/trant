import TokenBase from "../chain-info/contracts/TokenBase.json"
import Trant from "../chain-info/contracts/TrantToken.json"
import Exchange from "../chain-info/contracts/Exchange.json"
import   networkMapping from "../chain-info/deployments/map.json"

import { useEffect, useState } from "react"
import { useTabsList } from "@mui/base"
import { ERC20Interface, useContractFunction, useEthers} from "@usedapp/core"
import { constants, utils } from "ethers"
import { Contract } from "@ethersproject/contracts"

export const useGasTokensPayments = (tokenAddress: string) => {
    // address, abi, chainId
    // approve and exchange

    /// we have the exchange contract
    const {chainId} = useEthers()
    const {abi} = TokenBase
    const tokenBaseAddress = chainId ? networkMapping[String(chainId)]["TokenBase"][0] : constants.AddressZero
    const tokenBaseInterface = new utils.Interface(abi)
    const tokenBaseContract = new Contract(tokenBaseAddress,tokenBaseInterface)

    // const exchangeAbi = Exchange.abi
    // // const exhangeAddress = Exchange
    // const exchangeAddress = chainId ? networkMapping[String(chainId)]["Exchange"][0] : constants.AddressZero
    // const exchangeInterface = new utils.Interface(abi)
    // const exchangeContract = new Contract(exchangeAddress,exchangeInterface)

    // const {abi} = Exchange
    // const exchangeAddress = chainId ? networkMapping[String(chainId)]["Exchange"][0] : constants.AddressZero
    // const exchangeInterface = new utils.Interface(abi)
    // const exchangeContract = new Contract(exchangeAddress,exchangeInterface)


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
    
    const approveAndSend = (amount:string ) => { //, _token:string,_station:string
        setAmountToSell(amount)
        // setToken(_token)
        // setStation(_station)
        return approveErc20Send(tokenBaseAddress,amount)
    }

    // second implement sell function
    const { send:sendTRANT, state:sendState} = 
    useContractFunction(tokenBaseContract, "sendToken",{
        transactionName:"Send Tokens",
    })
    // useEffect allows you do smt if anything changes
    const [amountToSell, setAmountToSell] = useState("0")
    // const [_token,setToken] = useState("0")
    // const [_station, setStation] = useState("0")

    useEffect(() => {
        if (approveErc20State.status === "Success" && amountToSell != "0")
        {
            //sell 
            // sendTRANT(100, "0x3aDc2d331ff0b17BB22548589134113450eA1627", "0xBbdbDe13C20CF0f4c428f890527B46F8aEB1Bed8")// we fill this whenever approve called.
            sendTRANT(amountToSell)
        }
    }, [approveErc20State,amountToSell])//,_token,_station])
    return {approveAndSend, approveErc20State}
}

// export const useGasTokensPayments = (tokenAddress: string) => {
//     // address, abi, chainId
//     // approve and exchange

//     /// we have the exchange contract
//     const {chainId} = useEthers()
//     const {abi} = TokenBase
//     const tokenBaseAddress = chainId ? networkMapping[String(chainId)]["TokenBase"][0] : constants.AddressZero
//     const tokenBaseInterface = new utils.Interface(abi)
//     const tokenBaseContract = new Contract(tokenAddress,tokenBaseInterface)

//     //we need to approve first from the erc20
//     // we have the token contract
//     const erc20TokenAbi = Trant.abi
//     const erc20Interface = new utils.Interface(erc20TokenAbi)
//     const erc20Contract = new Contract(tokenAddress, erc20Interface)

//     // approve and sell
//     // first implement approve
//     const {send:approveErc20Send, state: approveErc20State} =
//         useContractFunction(erc20Contract, "approve", {
//             transactionName:"Approve ERC20 transfer!"
//         })
    
//     const [amountToSell, setAmountToSell] = useState("0")

//     const approveAndSend = (amount:string) => {
//         setAmountToSell(amount)
//         return approveErc20Send(tokenBaseAddress,amount)
//     }

//     // second implement sell function
//     const { send:sendTRANT, state:sendState} = 
//     useContractFunction(tokenBaseContract, "sendToken", {
//         transactionName:"Send TRANT",
//     })
//     // useEffect allows you do smt if anything changes

//     useEffect(() => {
//         if (approveErc20State.status === "Success" && amountToSell != "0"){
//             //sell 
//             sendTRANT(amountToSell)// we fill this whenever approve called.

//         }
//     }, [approveErc20State,amountToSell])
//     return {approveAndSend, approveErc20State}
// }
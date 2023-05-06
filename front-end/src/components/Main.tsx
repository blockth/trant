/* eslint-disable spaced-comment */
/// <reference types="react-scripts"/>
import { useEthers, useEtherBalance } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import dapp from './transport.png'
import weth from './eth.png'
import { makeStyles } from "@material-ui/core"
import { YourWallet } from "./yourWallet"
import { ExchangeEtherBalance } from "./yourWallet/ExchangeEtherBalance"
import { parseEther } from "@ethersproject/units"
// import { LitreToEther } from "./yourWallet/LitreToEther"
import { formatEther } from '@ethersproject/units'

// to use it in YourWallet
export type Token = {
    image: string
    address: string
    name: string
}


const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.black,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))

export const Main = () => {
    // Show token values from the wallet
    // Get the address of different tokens
    // Get the balance of the users wallet 

    // send the brownie-config to our src folder
    // send the build folder 
    const classes = useStyles()
    const { account, chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    console.log(chainId)
    console.log(networkName)

    const trantTokenAddress = chainId ? networkMapping[String(chainId)]["TrantToken"][0] : constants.AddressZero
    console.log(trantTokenAddress)

    // const etherBalance = useEtherBalance(account)
    // { etherBalance && <p>Ether balance: {formatEther(etherBalance)}</p> }
    // console.log("ether balance", parseEther(etherBalance?.toString()))

    // const wethTokenAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa"//chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero

    // console.log(wethTokenAddress)
    // to send YourWallet
    const supportedTokens: Array<Token> = [
        {
            image: dapp,
            address: trantTokenAddress,
            name: "TRANT"
        }
        // ,
        // {
        //     image: weth,
        //     address: wethTokenAddress,
        //     name: "ETH"
        // },
        // {
        //     image:dai,
        //     address:fauTokenAddress,
        //     name:"DAI"
        // }
    ]
    // pass supportedTokens array to Wallet
    return (<>
        <h2 className={classes.title}> TRANT Smart Payment with the power of Web3.0!</h2>
        <div><h2>Exchange's Ether Balance </h2>        <ExchangeEtherBalance /></div>
        <h2>Your Assets</h2>
        <YourWallet supportedTokens={supportedTokens} />

    </>)
}

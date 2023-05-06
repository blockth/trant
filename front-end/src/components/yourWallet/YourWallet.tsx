

import { Token } from "../Main"
import { Box, Tab } from "@material-ui/core"
import React from "react"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { useState } from "react"
import { tokenToString } from "typescript"
import { Button, Input } from "@material-ui/core"
import { WalletBalance } from "./WalletBalance" // to see the wallet balance (we already exported this)
import { ExchangeForm } from "./ExchangeForm"
import GasPrice from "./GasPrice"
import { useOilPrice } from "../../hooks/useGasPrice"
import { useEtherPrice } from "../../hooks/useEtherPrice"
import { useGasTokensPayments } from "../../hooks"
import { formatUnits, parseEther, parseUnits } from "@ethersproject/units"
import { utils } from "ethers"
import { formatEther } from '@ethersproject/units'

import { useEtherBalance, useTokenBalance, useEthers } from "@usedapp/core"
import { BigNumber } from "@ethersproject/bignumber"
// import { useTestTokenBase } from "../../hooks/testTokenBase"
// just telling to the YourWallet what YourWalletProps will look like
interface YourWalletProps {
    supportedTokens: Array<Token>
}



// you need to export it to be able to render in main or therefore app.tsx
// we are passing a parameter here, with supportedToken which is gonna be of type props
export const YourWallet = ({ supportedTokens }: YourWalletProps) => {

    //to select a token we use a select hook
    // it creates a variable which will be the token whatever you are on
    // and naturally setSelectedTokenIndex is going to update it.
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

    // to handle when another tab clicked
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }
    const selectedFuelIndex = {
        Gas: "Gasoline",
        Elect: "Electricity"
    }
    // const ren = useTestTokenBase()
    // console.log(ren)
    const oilPrice = useOilPrice()
    console.log(oilPrice?.toString())
    const oilLiterUSD = useOilPrice() / ((158.987 * 25)) / 10 ** 18
    console.log("oil lliter usd", oilLiterUSD?.toString())

    // const formattedOilPricez: number = oilPrice ? Number(Number(parseFloat(formatUnits(oilPrice, 26)) / (158.987 * 25))) : 0
    // console.log(formattedOilPricez)
    // const formattedOilPricez: number = oilPrice ? parseUnits(formatUnits(oilPrice, 28), 18) / (158.987 * 25) : 0




    var num1: number = 0;

    // const [amount, setAmount] = useState<number | string | Array<number >> (0)

    const handleInputchangeLiter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        // setAmount(newAmount)
        num1 = Number(newAmount)
        console.log(newAmount)
    }

    const etherPrice = useEtherPrice() / 10 ** 18
    console.log("ether price", etherPrice)
    // to call approve or any smart contract related form 
    // we will use hooks
    // const {approveAndSend, approveErc20State} = useGasTokensPayments(supportedTokens[0].address)
    // console.log(0.51 / 1952)
    const { approveAndSend, approveErc20State } = useGasTokensPayments(supportedTokens[0].address)

    const handlePayFee = () => {

        // // const eth = utils.formatEther(etherPrice.toString())
        // console.log("oil liter price")
        // console.log(formattedOilPricez)

        const fee = (oilLiterUSD / etherPrice) * num1 * 1000 * 10 ** 18  // convert it to trant
        console.log("odenecek trant", fee)

        // const fee = (oilLiterUSD * num1 / etherPrice) * 10000 // convert it to trant
        // console.log("gee,", fee)

        // console.log("ether price")
        // console.log(Number(etherPrice))
        if (num1 > 0) {
            // const amountAsWei = utils.parseEther(fee.toString())

            // const amountAsWei2 = parseFloat(formatUnits(fee, 28)).toString()

            const amountAsWei3 = utils.parseEther(fee.toString())


            // console.log(amountAsWei3)
            //const amountAsWei = Math.ceil(fee).toString()
            return approveAndSend(fee.toString())//,supportedTokens[0].address,stationAddress)
        }
        // const amountAsWei = utils.parseEther(fee.toString())
        // return approveAndSend(amountAsWei.toString())
    }


    // const gasPrice = useGasPrice()
    // {gasPrice && <p>Estimated Base Gas Fee: {formatEther(gasPrice)}</p>}

    const formattedOilPrice: number = oilPrice ? parseFloat(formatUnits(oilPrice, 18)) / 25 : 0


    // const formattedOilPriceLiter: number = oilPrice ? parseFloat(formatUnits(oilPrice, 18)) : 0
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account)
    // const formattedTokenBalance: number = etherBalance ? parseFloat(formatUnits(etherBalance,18)) : 0

    return (<Box>
        {/* <h1>Exchange</h1> */}
        <Box>
            <TabContext value={selectedTokenIndex.toString()}>
                {/* <TabList onChange={handleChange} aria-label="stake form tabs">
                    {supportedTokens.map((token,index) => {
                        return (<Tab label={token.name} 
                            value={index.toString()}
                            key={index}/>)
                    })}
                </TabList> */}
                {/* <div>Your ether balance : {formatEther(etherBalance) }</div> */}
                {supportedTokens.map((token, index) => {
                    // we can implement a new compoonent to get the wallet balance
                    // in that sense we have index->main->YourWallet->newComponent
                    // dont forget we still need to send supported token
                    // so use index of the supported tokens
                    return (
                        <TabPanel value={index.toString()} key={index}>
                            <div>
                                <WalletBalance token={supportedTokens[selectedTokenIndex]} />
                                <ExchangeForm token={supportedTokens[selectedTokenIndex]} />

                            </div>
                        </TabPanel>
                    )
                })}
            </TabContext>
        </Box>
        <h1>
            Payment
        </h1>

        <div>
            A Barrel Oil/USD: {formattedOilPrice}
            <br />
            A Liter: {oilLiterUSD}

        </div>

        Please enter the amount of gasoline in litres terms!

        <Box>
            <Input onChange={handleInputchangeLiter} />
            <Button color="primary" onClick={handlePayFee}
                size="large">
                Calculate Fee and Transfer Payment
            </Button>
        </Box>
    </Box>


    )
}
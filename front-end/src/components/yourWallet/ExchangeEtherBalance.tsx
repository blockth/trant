import { formatEther } from '@ethersproject/units'
import { Config, DAppProvider, Kovan, Goerli, Sepolia, Mainnet, useEtherBalance, useGasPrice, useTokenBalance } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import React from 'react'
import ReactDOM from 'react-dom'
import { useEthers } from "@usedapp/core"
import helperConfig from "../../helper-config.json"
import { useEtherPrice } from "../../hooks/useEtherPrice"
import { format } from 'node:path/win32'
import Exchange from "../../chain-info/contracts/Exchange.json"
import networkMapping from "../../chain-info/deployments/map.json"
import { formatUnits } from "@ethersproject/units"

import { constants, utils } from "ethers"

export const ExchangeEtherBalance = () => {
  const { account, chainId } = useEthers()
  const { abi } = Exchange
  const exchangeAddress = chainId ? networkMapping[String(chainId)]["Exchange"][0] : constants.AddressZero //networkMapping[String(chainId)]["Exchange"][0] : constants.AddressZero
  const trantAddress = chainId ? networkMapping[String(chainId)]["TrantToken"][0] : constants.AddressZero//networkMapping["5"]["TrantToken"][0] : constants.AddressZero
  const etherBalance = useEtherBalance(exchangeAddress)

  // console.log("exchange address", exchangeAddress)
  // console.log("exchange balance", etherBalance)
  const gasPrice = useGasPrice()
  const etherPrice = useEtherPrice()
  const tokenBalance = useTokenBalance(trantAddress, exchangeAddress)
  // const formattedTokenBalance: number =  parseFloat(formatUnits(tokenBalance,18)) : 0
  const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0// tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0

  // const {account} = useEthers()
  // {tokenBalance && <p>TRANT Balance of Station {formatEther(tokenBalance)}</p>}
  // const tokenBalance = useTokenBalance(STAKING_CONTRACT, account)
  return (
    <div>
      {etherBalance && <p>Ether balance: {formatEther(etherBalance)}</p>}
      {gasPrice && <p>Estimated Base Gas Fee: {formatEther(gasPrice)}</p>}
      {etherPrice && <p>Current ether Price in USD: {formatEther(etherPrice)}</p>}
      {formattedTokenBalance && <p>Current TRANT Balance of Exchange: {formattedTokenBalance}</p>}
    </div>
  )
}
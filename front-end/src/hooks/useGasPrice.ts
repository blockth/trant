import TokenBase from "../chain-info/contracts/TokenBase.json"
import Trant from "../chain-info/contracts/TrantToken.json"
import networkMapping from "../chain-info/deployments/map.json"

import { useEffect, useState } from "react"
import { useTabsList } from "@mui/base"
import { ERC20Interface, useContractFunction, useEthers } from "@usedapp/core"
import { constants, utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useContractCall } from "@usedapp/core";

export const useOilPrice = () => {
    const { chainId } = useEthers()
    const { abi } = TokenBase
    const tokenBaseAddress = chainId ? networkMapping[String(chainId)]["TokenBase"][0] : constants.AddressZero
    const tokenBaseInterface = new utils.Interface(abi)
    const TokenBaseContract = new Contract(tokenBaseAddress, tokenBaseInterface)

    const [price]: any = useContractCall({
        abi: tokenBaseInterface,
        address: tokenBaseAddress,
        method: "getPriceFeedS",
        args: [],
    }) ?? [];

    // return Number(price / Math.pow(10, 18)).toFixed(2);
    return price;

}
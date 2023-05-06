import React from 'react'

import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useEthers, useGasPrice, useTokenBalance } from "@usedapp/core"
import networkMapping from "../../chain-info/deployments/map.json"
import { useContractFunction } from '@usedapp/core'
import TokenBase from "../../chain-info/contracts/TokenBase.json"
import { constants } from "ethers"
import { useContractCall } from "@usedapp/core";
import { Box, Tab } from "@material-ui/core"
import { useOilPrice } from '../../hooks/useGasPrice'

export default function GasPrice() {
  const count = useOilPrice();
  return (
    <Box color="white" fontSize="8xl">
      {count ? count.toNumber() : 0}
      {/* {count ? Number(count) : 0} */}
    </Box>
  );
}
// hooks/index.ts

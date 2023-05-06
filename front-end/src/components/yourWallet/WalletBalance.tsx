import { Token } from "../Main"
import { useEthers, useTokenBalance } from "@usedapp/core" //usedapp has a great hook to get the token balance
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../BalanceMsg"


export interface WalletBalanceProps {
    token: Token
}
//we are going to use this to get the token balance which passed to
// this
export const WalletBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token // we get the name address and the name from the input token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    console.log(tokenBalance?.toString())
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (<BalanceMsg label={`Your ${name} balance`}
        tokenImgSrc={image} amount={formattedTokenBalance}></BalanceMsg>)
}
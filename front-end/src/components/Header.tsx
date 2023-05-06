import { useEthers, useEtherBalance } from "@usedapp/core"
import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1)

    }
}))

export const Header = () => {
    const classes = useStyles()
    const { account, activateBrowserWallet, deactivate } = useEthers()
    //connect and check youre already connected!
    const isConnected = account !== undefined

    // const etherBalance = useEtherBalance(account)
    // console.log(etherBalance)

    return (
        <div className={classes.container}>
            <div>
                {isConnected ? ( ///if
                    <Button color="primary" variant="contained" onClick={deactivate}>
                        Disconnect
                    </Button>
                ) :
                    (/// else
                        <Button color="primary" variant="contained"
                            onClick={() => activateBrowserWallet()}>
                            Connect Wallet
                        </Button>
                    )
                }
            </div>
        </div>
    )
}   
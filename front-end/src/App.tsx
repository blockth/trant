import React from 'react'
import ReactDOM from 'react-dom'
// import logo from './logo.svg';
// import './App.css';
import { DAppProvider, Config, ChainId, Kovan, Goerli, Sepolia, Mainnet } from '@usedapp/core';
import { Header } from './components/Header'
import { Container } from "@material-ui/core"
import { Main } from "./components/Main"
import { getDefaultProvider } from 'ethers'


const config: Config = {
  networks: [Sepolia, Goerli],
  readOnlyChainId: Sepolia.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]: "https://sepolia.infura.io/v3/1733c145a6ed40ef8d177c549a0f7464",//getDefaultProvider('sepolia'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}
// ReactDOM.render(
//   <DAppProvider config={config}>
//     <App />
//   </DAppProvider>,
//   document.getElementById('root')
// )


function App() {

  //{ 'https://sepolia.infura.io/v3/3d1196064281455fb61d5fdf44932172'}
  return (
    // <DAppProvider config={{
    //   // supportedChains: [ChainId.Kovan, ChainId.Rinkeby, 1337 ], Kovan
    //   networks: [Goerli],
    //   notifications: {
    //     expirationPeriod: 1000,
    //     checkInterval: 1000
    //   }

    // }}>
    //   <Header />
    //   <Container maxWidth="md">
    //     <Main />
    //   </Container>
    // </DAppProvider>
    <DAppProvider config={config}>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </DAppProvider>

  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //        Hello!
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

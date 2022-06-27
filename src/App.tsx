import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {connectWallet, initialize} from './ethereum/web3';
import contractLottery from './ethereum/abis/Lottery.json';

function App() {

  const [contract, setContract] = useState<any>('');
  const [manager, setManager] = useState<any>('');
  const [players, setPlayers] = useState<any>([]);
  const [balance, setBalance] = useState<any>('');

  console.log(contract);

  useEffect(() => {
    // @ts-ignore
    if(window.web3) {
      initialize();
      loadBlockchainData();
    }
  }, [])

  const loadBlockchainData = async () => {
    //@ts-ignore  
    const Web3 = window.web3;
    const networkData = contractLottery.networks['5777'];
    console.log('network data', networkData);
    if (networkData) {
      const abi = contractLottery.abi;
      const address = networkData.address;
      console.log('address: ', address);
      
      const contractDeployed = new Web3.eth.Contract(abi, address);
      setContract(contractDeployed);

      const players = await contractDeployed.methods.getPlayers().call();
      setPlayers(players);
      
      const manager = await contractDeployed.methods.manager().call();
      setManager(manager);
      
      const balance = await Web3.eth.getBalance(contractDeployed.options.address);
      setBalance(balance);
      
      setContract(contractDeployed);
      const aux = new Web3.eth.Contract(abi, address);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hi React, Truffle and Firebase
        </a>
        <button onClick={() => connectWallet()}>Connect</button>
        <p>Players: {players.length}</p>
        <p>Balance: {balance}</p>
        <p>Manager: {manager}</p>
      </header>
    </div>
  );
}

export default App;
import { injected } from "./components/wallet/connectors"
import { useWeb3React } from "@web3-react/core"
import { Web3ReactProvider, getWeb3ReactContext } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import {ethers, Contract} from "ethers"
//import formatEther from "@ethersproject/units" will want later if importing eth values probably
import React from 'react'

export default function App() {

  const InteractiveArea = () => {

    const context = useWeb3React()
    const {chainId, provider, account, active, library, activate, deactivate} = context
    
    //get user account balance
    async function getBalance() {
      const provider = ethers.getDefaultProvider('kovan')
      const bigBalance = await provider.getBalance(account)
      const balance = ethers.utils.formatEther(bigBalance.toString())
      console.log(balance)
    }

    //smart contract info
    const abi = [
      {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "num",
            "type": "uint256"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    const cAddress = "0xFD4fc6914CF19c02cdcE1382E9776c096138695F"


    //erc20 contract info
    const ercabi = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
          }
        ],
        "name": "decreaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "token_count",
            "type": "uint256"
          }
        ],
        "name": "giveMeTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]

    const ercAddress = "0xcB76918A7102150Ae4c1A160c1F316958e7dB4eD"
    //get current number from basic 'store' contract
    async function getNumber() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new Contract(cAddress, abi, provider)
      const num =  await contract.retrieve()
      console.log('number from contract: ' + num)
    }

    async function storeNumber() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new Contract(cAddress, abi, signer)
      await contract.store(1920)
      getNumber()
    }

    async function getERCBalance() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new Contract(ercAddress, ercabi, provider)
      const balance = await contract.balanceOf(account)
      const readableBalance = ethers.utils.formatEther(balance.toString())
      console.log('balance is: ' + readableBalance)
      
    }

    return (
      <div>
        <button onClick={() => {activate(injected)}}>Connect Wallet</button>
        {active ? (<div>connected: {account}</div>): (<div>Not connected</div>)}
        <button onClick={() => {deactivate()}}>Disconnect Wallet</button>
        <button onClick={getNumber}>Get Contract Number</button>
        <button onClick={storeNumber}>Store number</button>
        <button onClick={getBalance}>get balance</button>
        <button onClick={getERCBalance}>get erc balance</button>
      </div>
    )
  }
  
  

  function getLibraryf(provider) {
    const library = new Web3Provider(provider || "https://kovan.infura.io/v3/95a535264da54bfa9c54bccde64ba9f4");
    library.pollingInterval = 12000;
    return library;
  }

  return (
    <Web3ReactProvider getLibrary={getLibraryf}>
      <InteractiveArea />
    </Web3ReactProvider>
  )
}
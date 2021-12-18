import Web3ReactProvider from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider) {
  return new Web3(provider)
}

function CApp() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div>Hello World</div>
    </Web3ReactProvider>
  )
}

export default CApp
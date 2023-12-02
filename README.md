# NFT Platform

This [Next.js](https://nextjs.org/) project was developed for the Cryptocurrencies and Blockchain course, whose objective is to work with Tokenomics and Smart Contracts.

The project is a NFT Minter and NFT Explorer using Goerli Testnet and [Metamask Wallet](https://metamask.io/). Some tools used for this Web3 dApp was:

- Typescript + NextJS
- Material UI (Google's Material Design for React)
- Pinata (Upload files to IPFS)
- Moralis (Web3 APIs)
- Alchemy (Web3 APIs)
- Wagmi (React Hooks for Ethereum)

## Smart Contract

The smart contract is located at [nftMinter.sol](contracts/nftMinter.sol) file.

The contract has the function of mint NFTs using [OpenZeppelin](https://www.openzeppelin.com/) ERC721URIStorage and Counter.

## Getting Started

First, install dependencies:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

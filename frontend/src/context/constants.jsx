import { ethers } from "ethers";

// INTERNAL IMPORT 
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";

export const TOKEN_ADDRESS = "0x891973FA34b7B98a2487A3ED0aa610E797F7299E";
export const ERC20_ABI = erc20.abi;

export const OWNER_ADDRESS = "0x5Ad474CdDd73F8A506C04A6ddAA23450D9611943";

export const CONTRACT_ADDRESS = "0xee16b1F65E41A4fF1b32cf85A5248F88DCb452ED";
export const CONTRACT_ABI = tokenICO.abi;

const networks = {
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ethereum-holesky-rpc.publicnode.com/"],
    blockExplorerUrls: ["https://holesky.beaconcha.in/"],
  },

  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },

  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Amoy",
    nativeCurrency: {
      name: "POL",
      symbol: "POL",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
};

const switchNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        ...networks[networkName],
      }],
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to switch network");
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "holesky";
  await switchNetwork({ networkName });
};

export const CHECK_WALLET_CONNECTED = async () => {
  if (!window.ethereum) return console.log("Please install MetaMask!");
  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      return accounts[0];
    } else {
      console.log("Please connect MetaMask");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const CONNECT_WALLET = async () => {
  try {
    if (!window.ethereum) return console.log("Please install MetaMask!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (accounts.length) {
      console.log('CONNECT_WALLET');
      return accounts[0];
    } else {
      console.log("CONNECT_WALLET Failed");
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchContract = (address, abi, signerOrProvider) =>
  new ethers.Contract(address, abi, signerOrProvider);

export const TOKEN_ICO_CONTRACT = async () => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return contract;

  } catch (error) {
    console.log(error, 'TOKEN_ICO_CONTRACT Failed');
    throw error;
  }
};

export const ERC20 = async (ADDRESS) => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    const signer = provider.getSigner();

    const contract = fetchContract(ADDRESS, ERC20_ABI, signer);

    const userAddress = await signer.getAddress();
    const balance = await contract.balanceOf(userAddress);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const supply = await contract.totalSupply();
    const decimals = await contract.decimals(); // Added for EduToken (assumes OpenZeppelin's ERC20)
    const address = await contract.address;

    const token = {
      name: name,
      symbol: symbol,
      supply: ethers.utils.formatEther(supply.toString()),
      decimals: decimals,
      address: address,
      balance: ethers.utils.formatEther(balance.toString()),
      chainId: network.chainId,
    };
    console.log(token, 'ERC20');
    return token;
  } catch (error) {
    console.log(error, 'ERC20 Failed');
    throw error;
  }
};


export const ERC20_CONTRACT = async (CONTRACT_ADDRESS) => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, signer);
    console.log(contract, 'ERC20_CONTRACT');
    return contract;
  } catch (error) {
    console.log(error, 'ERC20_CONTRACT Failed');
    throw error;
  }
};

export const GET_BALANCE = async () => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const maticBal = await signer.getBalance();
    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error, 'GET_BALANCE Failed');
    throw error;
  }
};

export const CHECK_ACCOUNT_BALANCE = async (ADDRESS) => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const maticBal = await provider.getBalance(ADDRESS);
    console.log(maticBal, 'CHECK_ACCOUNT_BALANCE');
    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error, 'CHECK_ACCOUNT_BALANCE Failed');
    console.log(error);
    throw error;
  }
};

export const addTokenToMetaMask = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenDetails = await ERC20(TOKEN_ADDRESS);

    const tokenDecimals = tokenDetails?.decimals;
    const tokenAddress = TOKEN_ADDRESS;
    const tokenSymbol = tokenDetails?.symbol;
    const tokenImage = "";

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log("Token added to MetaMask");
      } else {
        console.log("Token not added to MetaMask");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

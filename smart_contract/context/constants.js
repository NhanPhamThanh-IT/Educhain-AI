import { ethers } from "ethers";
import Web3Modal from "web3modal";

// INTERNAL IMPORT 
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";

export const TOKEN_ADDRESS = "0xB507C51E0956C52a0Dcb128e2d77296fE45DAa52";
export const ERC20_ABI = erc20.abi;

export const OWNER_ADDRESS = "0x5Ad474CdDd73F8A506C04A6ddAA23450D9611943";

export const CONTRACT_ADDRESS = "0x17a2Af6461BF73AC504119a704356b2eb0f4AFED";
export const CONTRACT_ABI = tokenICO.abi;

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const changeNetwork = async (network) => {
  try {
    if (window.ethereum) throw new Error("No wallet founded");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{ ...networks[network] }],
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "holesky";
  await changeNetwork(networkName);
};

export const CHECK_WALLET_CONNECTED = async () => {
  if (!window.ethereum) return console.log("Please install MetaMask!");
  await handleNetworkSwitch();

  const account = await window.ethereum.request({ method: "eth_accounts" });
  if (account.lenght) {
    return account[0];
  } else {
    console.log("Please install Metamask");
  }
};

export const CONNECT_WALLET = async () => {
  try {
    if (!window.ethereum) return console.log("Please install MetaMask!");
    await handleNetworkSwitch();

    const account = await window.ethereum.request({ method: "eth_requestAccounts" });
    window.location.reload();

    if (account.lenght) {
      return account[0];
    } else {
      console.log("Please install Metamask");
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (address, abi, signer) => new ethers.Contract(address, abi, signer);

export const TOKEN_ICO_CONTRACT = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal;
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const ERC20 = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal;
    const provider = new ethers.providers.Web3Provider(connection);

    const network = await provider.getNetwork();
    const signer = await provider.getSigner();

    const userAddress = signer.getAddress();
    const balance = await contract.balanceOf(userAddress);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const supply = await contract.totalSupply();
    const decimals = await contract.decimals();
    const address = await contract.address;

    const token = {
      name: name,
      symbol: symbol,
      supply: ethers.utils.formatEther(supply.toString()),
      decimals: decimals,
      address: address,
      balance: ethers.utils.formatEther(balance.toString()),
      chainId: network.chainId,
    }
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const ERC20_CONTRACT = async (CONTRACT_ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal;
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, signer);
    
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const GET_BALANCE = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal;
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
   
    const maticBal = await signer.getBalance();
    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};

export const CHECK_ACCOUNT_BALANCE = async (ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal;
    const provider = new ethers.providers.Web3Provider(connection);
    const maticBal = await provider.getBalance(ADDRESS);

    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};

export const addtokeToMetaMask = async () => {
  if (window.ethereum) {
    const tokenDetails = await ERC20(TOKEN_ADDRESS);

    const tokenDecimals = tokenDetails?.decimals;
    const tokenAddress = TOKEN_ADDRESS;
    const tokenSymbol = tokenDetails?.symbol;
    const tokenImage = "https://www.daulathussain.com/wp-content/uploads/2024/05/theblockchaincoders.jpg";
  }

  try {
    const wasAddes = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: TOKEN_ADDRESS,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });

    if (wasAddes) {
      console.log("Token added to MetaMask");
    } else {
      console.log("Token not added to MetaMask");
    }
  } catch (error) {
    console.log(error);
  }
};


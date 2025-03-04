import { ethers } from "ethers";

// INTERNAL IMPORT 
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";

export const TOKEN_ADDRESS = "0xB507C51E0956C52a0Dcb128e2d77296fE45DAa52";
export const ERC20_ABI = erc20.abi;

export const OWNER_ADDRESS = "0x5Ad474CdDd73F8A506C04A6ddAA23450D9611943";

export const CONTRACT_ADDRESS = "0x17a2Af6461BF73AC504119a704356b2eb0f4AFED";
export const CONTRACT_ABI = tokenICO.abi;

// Networks configuration for testnets (Sepolia and Holesky)
const networks = {
  holesky: {
    chainId: 17000,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  sepolia: {
    chainId: 11155111,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },

};

// Helper to switch networks using ethers.js
const switchNetwork = async (chainId) => {
  try {
    if (!window.ethereum) throw new Error("No wallet found");
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error) {
    console.log(error.message);
    // If the network isn’t added, add it
    if (error.code === 4902) {
      const network = networks.holesky; // Default to Holesky, or use sepolia if preferred
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [network],
      });
    }
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "holesky"; // Default to Holesky, or change to "sepolia" if preferred
  const chainId = networks[networkName].chainId;
  await switchNetwork(chainId);
};

// Use ethers.js for wallet connection
export const CHECK_WALLET_CONNECTED = async () => {
  if (!window.ethereum) return console.log("Please install MetaMask!");

  await handleNetworkSwitch();

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
    await handleNetworkSwitch();

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (accounts.length) {
      return accounts[0];
    } else {
      console.log("Please connect MetaMask");
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Fetch contract using ethers.js
const fetchContract = (address, abi, signerOrProvider) =>
  new ethers.Contract(address, abi, signerOrProvider);

export const TOKEN_ICO_CONTRACT = async () => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");
    await handleNetworkSwitch();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return contract;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ERC20 = async (ADDRESS) => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");
    await handleNetworkSwitch();

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
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ERC20_CONTRACT = async (CONTRACT_ADDRESS) => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");
    await handleNetworkSwitch();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, signer);
    return contract;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GET_BALANCE = async () => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");
    await handleNetworkSwitch();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const maticBal = await signer.getBalance();
    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CHECK_ACCOUNT_BALANCE = async (ADDRESS) => {
  try {
    if (!window.ethereum) throw new Error("Please install MetaMask!");
    await handleNetworkSwitch();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const maticBal = await provider.getBalance(ADDRESS);
    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTokenToMetaMask = async () => {
  if (window.ethereum) {
    await handleNetworkSwitch();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenDetails = await ERC20(TOKEN_ADDRESS);

    const tokenDecimals = tokenDetails?.decimals;
    const tokenAddress = TOKEN_ADDRESS;
    const tokenSymbol = tokenDetails?.symbol;
    const tokenImage = "https://www.daulathussain.com/wp-content/uploads/2024/05/theblockchaincoders.jpg";

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

export const calculateEthCost = async (tokenAmount) => {
  try {
    const contract = await TOKEN_ICO_CONTRACT();
    const tokenDetails = await contract.getTokenDetails();
    const pricePerToken = ethers.utils.formatEther(tokenDetails[4].toString());
    return (tokenAmount * pricePerToken).toString();
  } catch (error) {
    console.error("Error calculating ETH cost:", error);
    return "0";
  }
};
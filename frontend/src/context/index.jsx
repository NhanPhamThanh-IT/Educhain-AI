import React, { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';


import {
    CHECK_WALLET_CONNECTED, CONNECT_WALLET,
    GET_BALANCE,
    CHECK_ACCOUNT_BALANCE,
    TOKEN_ICO_CONTRACT,
    ERC20,
    ERC20_CONTRACT,
    TOKEN_ADDRESS,
    addTokenToMetaMask,
} from './constants';

export const TOKEN_ICO_Context = React.createContext();
export const TOKEN_ICO_Provider = ({ children }) => {
    const DAPP_NAME = 'Token ICO ADAPP';
    const currency = "ETH";
    const network = "holesky"; // Default to Sepolia, or change to "holesky"
    const [loader, setLoader] = useState(false);
    const [account, setAccount] = useState('');
    const [claimedTokenBalance, setClaimedTokenBalance] = useState(0);

    const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
    const notifyError = (msg) => toast.error(msg, { duration: 2000 });

    const TOKEN_ICO = async () => {
        try {
            const address = await CHECK_WALLET_CONNECTED();
            if (!address) {
                notifyError("Please connect your wallet (MetaMask) and switch to the testnet.");
                return null;
            }
            setLoader(true);
            setAccount(address);
            const contract = await TOKEN_ICO_CONTRACT();
            const tokenDetails = await contract.getTokenDetails();
            const contractOwner = await contract.owner();
            const soldTokens = await contract.soldTokens();

            const ethBal = await GET_BALANCE();

            const token = {
                tokenBal: ethers.utils.formatEther(tokenDetails[2].toString()), // balanceOf(address(this))
                name: tokenDetails[0], // name
                symbol: tokenDetails[1], // symbol
                supply: ethers.utils.formatEther(tokenDetails[3].toString()), // totalSupply
                tokenPrice: ethers.utils.formatEther(tokenDetails[4].toString()), // tokeSalePrice
                tokenAddr: tokenDetails[5], // tokenAddress
                maticBal: ethBal,
                address: address.toLowerCase(),
                owner: contractOwner.toLowerCase(),
                soldTokens: soldTokens.toNumber(),
            };
            setLoader(false);
            return token;
        } catch (error) {
            console.log(error);
            notifyError(`Failed to load token data: ${error.message}`);
            setLoader(false);
            return null;
        }
    };

    const BUY_TOKEN = async (amount) => {
        try {
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if (!address) {
                notifyError("Please connect your wallet and switch to the testnet.");
                setLoader(false);
                return;
            }

            // Validate input
            const tokenAmount = Number(amount);
            if (isNaN(tokenAmount) || tokenAmount <= 0) {
                notifyError("Please enter a valid token amount.");
                setLoader(false);
                return;
            }

            const contract = await TOKEN_ICO_CONTRACT();
            const tokenDetails = await contract.getTokenDetails();
            const availableTokens = ethers.utils.formatEther(tokenDetails[2].toString());
            const pricePerToken = ethers.utils.formatEther(tokenDetails[4].toString());
            const totalCostEth = tokenAmount * pricePerToken;

            // Check available tokens
            if (tokenAmount > Number(availableTokens)) {
                notifyError(`Only ${availableTokens} tokens available.`);
                setLoader(false);
                return;
            }

            // Check user's ETH balance
            const ethBalance = await GET_BALANCE();
            if (Number(ethBalance) < totalCostEth) {
                notifyError("Insufficient ETH balance.");
                setLoader(false);
                return;
            }

            const payAmount = ethers.utils.parseEther(totalCostEth.toString());
            const transaction = await contract.buyTokens(
                tokenAmount,
                { value: payAmount, gasLimit: ethers.utils.hexlify(8000000) }
            );
            await transaction.wait();

            setLoader(false);
            notifySuccess('Token purchase completed successfully!');
            window.location.reload(); // Optional: Could use state update instead
        } catch (error) {
            console.error(error);
            const errorMsg = error.reason || error.message || "Transaction failed.";
            notifyError(`Error: ${errorMsg}`);
            setLoader(false);
        }
    };

    const TRANSFER_ETHER = async (transfer) => {
        try {
            setLoader(true);
            const { _receiver, _amount } = transfer;
            const address = await CHECK_WALLET_CONNECTED();

            if (address) {
                const contract = await TOKEN_ICO_CONTRACT();
                const payAmount = ethers.utils.parseEther(_amount.toString());
                const transaction = await contract.transferEther(_receiver, payAmount, {
                    value: payAmount.toString(),
                    gasLimit: ethers.utils.hexlify(8000000),
                });
                await transaction.wait();
                setLoader(false);
                notifySuccess('Transaction completed successfully');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            notifyError('Error, try again!');
            setLoader(false);
        }
    };

    const DONATE = async (AMOUNT) => {
        try {
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if (address) {
                const contract = await TOKEN_ICO_CONTRACT();
                const payAmount = ethers.utils.parseEther(AMOUNT.toString());
                const transaction = await contract.transferToOwner(payAmount, {
                    value: payAmount.toString(),
                    gasLimit: ethers.utils.hexlify(8000000),
                });
                await transaction.wait();
                setLoader(false);
                notifySuccess('Transaction completed successfully');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            notifyError('Error, try again!');
            setLoader(false);
        }
    };

    const UPDATE_TOKEN = async (_address) => {
        try {
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if (address) {
                const contract = await TOKEN_ICO_CONTRACT();
                const transaction = await contract.updateToken(_address);
                await transaction.wait();
                setLoader(false);
                notifySuccess('Transaction completed successfully');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            notifyError('Error, try again!');
            setLoader(false);
        }
    };

    const UPDATE_TOKEN_PRICE = async (price) => {
        try {
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if (address) {
                const contract = await TOKEN_ICO_CONTRACT();
                const payAmount = ethers.utils.parseEther(price.toString());
                const transaction = await contract.updateTokenSalePrice(payAmount);
                await transaction.wait();
                setLoader(false);
                notifySuccess('Transaction completed successfully');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            notifyError('Error, try again!');
            setLoader(false);
        }
    };

    const TOKEN_WITHDRAW = async () => {
        try {
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if (address) {
                const contract = await TOKEN_ICO_CONTRACT();
                const tokenDetails = await contract.getTokenDetails();
                const availableToken = ethers.utils.formatEther(tokenDetails[2].toString()); // balanceOf(address(this))

                if (Number(availableToken) > 0) {
                    const transaction = await contract.withdrawAllTokens();
                    await transaction.wait();
                    setLoader(false);
                    notifySuccess('Transaction completed successfully');
                    window.location.reload();
                }
            }
        } catch (error) {
            console.log(error);
            notifyError('Error, try again!');
            setLoader(false);
        }
    };

    const TRANSFER_TOKEN = async (transfer) => {
        try {
            setLoader(true);
            const { _tokenAddress, _sendTo, _amount } = transfer;
            const address = await CHECK_WALLET_CONNECTED();

            if (address) {
                const contract = await ERC20_CONTRACT(_tokenAddress);
                const payAmount = ethers.utils.parseEther(_amount.toString());
                const transaction = await contract.transfer(_sendTo, payAmount, {
                    gasLimit: ethers.utils.hexlify(8000000),
                });
                await transaction.wait();
                setLoader(false);
                notifySuccess('Transaction completed successfully');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            notifyError('Error, try again!');
            setLoader(false);
        }
    };

    const TRANSFER_FROM_SUPPLY = async (missionId, recipient, amount) => {
        try {
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if (!address) {
                notifyError("Please connect your wallet and switch to the testnet.");
                setLoader(false);
                return;
            }

            const contract = await ERC20_CONTRACT(TOKEN_ADDRESS);
            const supplyAccount = "0x5Ad474CdDd73F8A506C04A6ddAA23450D9611943"; // OWNER_ADDRESS from constants.js
            const payAmount = ethers.utils.parseEther(amount.toString());

            // Check supply account balance and allowance
            const balance = await contract.balanceOf(supplyAccount);
            if (balance.lt(payAmount)) {
                notifyError("Supply account has insufficient EDT.");
                setLoader(false);
                return;
            }

            const allowance = await contract.allowance(supplyAccount, address);
            if (allowance.lt(payAmount)) {
                notifyError("Supply account has not approved enough EDT. Please contact support.");
                setLoader(false);
                return;
            }

            // Transfer EDT from supply account to recipient
            const transaction = await contract.transferFrom(
                supplyAccount,
                recipient,
                payAmount,
                { gasLimit: ethers.utils.hexlify(8000000) }
            );
            await transaction.wait();

            setLoader(false);
            notifySuccess(`Claimed ${amount} EDT for Mission ${missionId} successfully!`);
        } catch (error) {
            console.error(error);
            const errorMsg = error.reason || error.message || "Claim failed.";
            notifyError(`Error: ${errorMsg}`);
            setLoader(false);
        }
    };

    const addClaimedTokens = (amount) => {
        setClaimedTokenBalance((prev) => prev + amount);
        notifySuccess(`Claimed ${amount} EDT!`);
    };

    return (
        <TOKEN_ICO_Context.Provider value={{
            TOKEN_ICO, BUY_TOKEN, TRANSFER_ETHER, DONATE,
            UPDATE_TOKEN, UPDATE_TOKEN_PRICE, TOKEN_WITHDRAW,
            TRANSFER_TOKEN, CONNECT_WALLET, ERC20,
            CHECK_ACCOUNT_BALANCE, setAccount, setLoader,
            addTokenToMetaMask, TOKEN_ADDRESS, loader, account, currency,
            TRANSFER_FROM_SUPPLY, addClaimedTokens, claimedTokenBalance,
        }}>{children}</TOKEN_ICO_Context.Provider>
    );
};
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
    handleNetworkSwitch,
} from './constants.jsx';

export const TOKEN_ICO_Context = React.createContext();
export const TOKEN_ICO_Provider = ({ children }) => {
    const DAPP_NAME = 'Educhain-AI';
    const currency = "ETH";
    const network = "Holesky";

    const [loader, setLoader] = useState(false);
    const [account, setAccount] = useState('');

    const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
    const notifyError = (msg) => toast.error(msg, { duration: 2000 });

    const TOKEN_ICO = async () => {
        try {
            const address = await CHECK_WALLET_CONNECTED();
            // // if (!address) {
            // //     notifyError("Please connect your wallet (MetaMask) and switch to the testnet.");
            // //     return null;
            // // }
            // setLoader(true);

            try {
                // Check network first
                await handleNetworkSwitch();
                const contract = await TOKEN_ICO_CONTRACT();
                if (!contract) {
                    throw new Error("Failed to initialize contract");
                }

                const contractOwner = await contract.owner();
                const soldTokens = await contract.soldTokens();
                const ethBal = await GET_BALANCE();

                const token = {
                    maticBal: ethBal,
                    address: address.toLowerCase(),
                    owner: contractOwner.toLowerCase(),
                    soldTokens: soldTokens.toNumber(),
                };

                setLoader(false);
                return token;
            } catch (contractError) {
                console.error("Contract interaction error:", contractError);
                notifyError(`Contract error: ${contractError.message}`);
                return null;
            }
        } catch (error) {
            console.error("Token ICO error:", error);
            notifyError(`Failed to load token data: ${error.message}`);
            return null;
        } finally {
            setLoader(false);
        }
    };

    const BUY_TOKEN = async (amount) => {
        try {
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            // if (!address) {
            //     notifyError("Please connect your wallet and switch to the testnet.");
            //     setLoader(false);
            //     return;
            // }

            // Validate input
            const tokenAmount = Number(amount);
            if (isNaN(tokenAmount) || tokenAmount <= 0) {
                notifyError("Please enter a valid token amount.");
                setLoader(false);
                return;
            }

            const contract = await TOKEN_ICO_CONTRACT();
            const erc20 = await ERC20(TOKEN_ADDRESS);

            const pricePerToken = 0.00001;
            const totalCostEth = pricePerToken * amount;
            const payAmount = ethers.utils.parseEther(totalCostEth.toString(), "ether");


            const ethBalance = await GET_BALANCE();
            if (Number(ethBalance) < totalCostEth) {
                notifyError("Insufficient ETH balance.");
                setLoader(false);
                return;
            }

            const transaction = await contract.buyTokens(
                Number(tokenAmount),
                { value: payAmount.toString(), gasLimit: ethers.utils.hexlify(8000000) }
            );
            await transaction.wait();
            console.log(transaction, 'BUY_TOKEN');
            setLoader(false);
            notifySuccess('Token purchase completed successfully!');
            window.location.reload(); // Optional: Could use state update instead
        } catch (error) {
            console.log(error, 'BUY_TOKEN Failed');
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
                const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");
                const transaction = await contract.transfer(_sendTo, payAmount, {
                    gasLimit: ethers.utils.hexlify(8000000),
                });
                await transaction.wait();
                setLoader(false);
                notifySuccess('Transaction completed successfully');
                console.log(transaction, 'TRANSFER_TOKEN');
                window.location.reload();
            }
        } catch (error) {
            console.log(error, 'TRANSFER_TOKEN Failed');
            notifyError('Error, try again!');
            setLoader(false);
        }
    };

    return (
        <TOKEN_ICO_Context.Provider value={{
            TOKEN_ICO, BUY_TOKEN, TRANSFER_ETHER, DONATE,
            UPDATE_TOKEN, UPDATE_TOKEN_PRICE, TOKEN_WITHDRAW,
            TRANSFER_TOKEN, CONNECT_WALLET, ERC20,
            CHECK_ACCOUNT_BALANCE, setAccount, setLoader,
            addTokenToMetaMask, TOKEN_ADDRESS, loader, account, currency, notifySuccess, notifyError,
        }}>{children}</TOKEN_ICO_Context.Provider>
    );
};
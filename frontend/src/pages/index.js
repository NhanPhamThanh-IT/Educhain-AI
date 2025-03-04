// frontend/pages/index.jsx
import React, { useState, useEffect } from "react";
import {
    Footer,
    Header,
    Loader,
    CourseCard,
    CourseList,
    Popup,
    TransferToken,
    Owner,
    TransferCurrency,
    Donate,
    UpdatePrice,
    UpdateAddress
} from "../components/index.js";
import {
    checkWalletConnected,
    connectWallet,
    getTokenDetails,
    buyTokens,
    withdrawAllTokens,
    updateToken,
    updateTokenSalePrice,
    transferToOwner,
    transferEther,
    transferToken,
    getBalance,
    checkAccountBalance,
    addTokenToMetaMask,
} from "../context/constants.js";
import { shortendAddress } from "../../../smart_contract/Utils/index.js";
import toast from 'react-hot-toast';

const Index = () => {
    const [account, setAccount] = useState(null);
    const [loader, setLoader] = useState(false);
    const [detail, setDetail] = useState(null);
    const currency = "ETH";

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const connectedAccount = await checkWalletConnected();
                if (connectedAccount) {
                    setAccount(connectedAccount);
                    const tokenDetails = await getTokenDetails();
                    const balance = await getBalance();
                    setDetail({
                        ...tokenDetails,
                        maticBal: balance,
                        address: connectedAccount.toLowerCase(),
                    });
                } else {
                    setDetail(null);
                    toast.error("Please connect your wallet and switch to the testnet.");
                }
            } catch (error) {
                console.error("Failed to fetch token data:", error);
                toast.error(`Failed to load token data: ${error.message}`);
                setDetail(null);
            } finally {
                setLoader(false);
            }
        };
        fetchData();

        // Listen for MetaMask account changes
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    setAccount(null);
                    setDetail(null);
                    toast.error("Wallet disconnected. Please reconnect.");
                }
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", (accounts) => {
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    } else {
                        setAccount(null);
                        setDetail(null);
                        toast.error("Wallet disconnected. Please reconnect.");
                    }
                });
            }
        };
    }, []);

    const handleConnectWallet = async () => {
        setLoader(true);
        try {
            const newAccount = await connectWallet();
            if (newAccount) {
                setAccount(newAccount);
                toast.success("Wallet connected successfully");
                const tokenDetails = await getTokenDetails();
                const balance = await getBalance();
                setDetail({
                    ...tokenDetails,
                    maticBal: balance,
                    address: newAccount.toLowerCase(),
                });
            } else {
                toast.error("Failed to connect wallet. Please ensure MetaMask is installed and on the testnet.");
            }
        } catch (error) {
            console.log("Connection failed:", error);
            toast.error("Failed to connect wallet. Please try again.");
        } finally {
            setLoader(false);
        }
    };

    const handleBuyTokens = async (amount) => {
        setLoader(true);
        try {
            if (!account) {
                toast.error("Please connect your wallet first.");
                return;
            }
            await buyTokens(amount);
            toast.success("Tokens purchased successfully");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("Error buying tokens. Try again!");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="body_wrap">
            {loader && <Loader />}
            <Header
                account={account}
                onConnectWallet={handleConnectWallet}
                setAccount={setAccount}
                setLoader={setLoader}
                shortendAddress={shortendAddress}
                detail={detail}
                currency={currency}
            />
            {/* Add SideBar, Hero, About, Features, Token, TokenInfo, Team, Contact as needed */}
            <Footer />
        </div>
    );
};

export default Index;
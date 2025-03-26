import React, { useState, useEffect, useContext, createContext } from "react";
import { TOKEN_ICO_Context } from './index.jsx';

// Create Router Context
export const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
    const {
        TOKEN_ICO, BUY_TOKEN, TRANSFER_ETHER, DONATE,
        UPDATE_TOKEN, UPDATE_TOKEN_PRICE, TOKEN_WITHDRAW,
        TRANSFER_TOKEN, CONNECT_WALLET, ERC20,
        CHECK_ACCOUNT_BALANCE, setAccount, setLoader,
        addTokenToMetaMask, TOKEN_ADDRESS, loader,
        account, currency, notifySuccess, notifyError
    } = useContext(TOKEN_ICO_Context);

    // State declarations
    const [ownerModel, setOwnerModel] = useState(false);
    const [buyModel, setBuyModel] = useState(false);
    const [transferModel, setTransferModel] = useState(false);
    const [transferCurrency, setTransferCurrency] = useState(false);
    const [openDonate, setOpenDonate] = useState(false);
    const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
    const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const ico = await TOKEN_ICO();
            console.log('items', ico);
            const erc20 = await ERC20(TOKEN_ADDRESS);
            console.log('erc20', erc20);
            setDetail(ico);
        };
        fetchData();
    }, [account]);

    const contextValue = {
        // State values
        ownerModel, setOwnerModel,
        buyModel, setBuyModel,
        transferModel, setTransferModel,
        transferCurrency, setTransferCurrency,
        openDonate, setOpenDonate,
        openUpdatePrice, setOpenUpdatePrice,
        openUpdateAddress, setOpenUpdateAddress,
        detail, setDetail,

        // Token ICO Context values
        TOKEN_ICO, BUY_TOKEN,
        account, setAccount,
        CONNECT_WALLET,
        ERC20, TOKEN_ADDRESS,
        setLoader, loader,
        currency,
        notifySuccess, notifyError
    };

    return (
        <RouterContext.Provider value={contextValue}>
            {children}
        </RouterContext.Provider>
    );
}; 
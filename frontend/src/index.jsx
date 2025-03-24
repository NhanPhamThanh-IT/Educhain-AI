import React, { useState, useEffect, useContext } from "react";
import toast from 'react-hot-toast';

import UserMenu from './components/Partials/Header/UserMenu.jsx';
import ExchangeCoin from './pages/ExchangeCoin.jsx';

import { TOKEN_ICO_Context } from './context/index.jsx';
import { shortendAddress, formatTime } from '../../smart_contract/Utils/index.jsx';

const Index = ({ children }) => {
    const { TOKEN_ICO, BUY_TOKEN, TRANSFER_ETHER, DONATE,
        UPDATE_TOKEN, UPDATE_TOKEN_PRICE, TOKEN_WITHDRAW,
        TRANSFER_TOKEN, CONNECT_WALLET, ERC20,
        CHECK_ACCOUNT_BALANCE, setAccount, setLoader,
        addTokenToMetaMask, TOKEN_ADDRESS, loader, account, currency, notifySuccess, notifyError, } = useContext(TOKEN_ICO_Context);

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
            const items = await TOKEN_ICO();
            console.log(items, 'items');
            setDetail(items);
        };
        fetchData();
    }, [account]);

    return (
        <>
            {buyModel && (
                <ExchangeCoin
                    setBuyModel={setBuyModel}
                    BUY_TOKEN={BUY_TOKEN}
                    currency={currency}
                    detail={detail}
                    account={account}
                    ERC20={ERC20}
                    TOKEN_ADDRESS={TOKEN_ADDRESS}
                    setLoader={setLoader}
                />
            )}

            {/* {transferModel && (<ExchangeCoin
                    setTransferModel={setTransferModel}
                    TRANSFER_TOKEN={TRANSFER_TOKEN}
                    ERC20={ERC20}
                    setLoader={setLoader}
                />)} */}

            <UserMenu
                account={account}
                CONNECT_WALLET={CONNECT_WALLET}
                setAccount={setAccount}
                setLoader={setLoader}
                setOwnerModel={setOwnerModel}
                shortendAddress={shortendAddress}
                detail={detail}
                currency={currency}
                ownerModel={ownerModel}
            />

            {children}
        </>
    );
};

export default Index;
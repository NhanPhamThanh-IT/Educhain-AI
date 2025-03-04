const index = () => {
    const {
        TOKEN_ICO,
        BUY_TOKEN,
        TRANSFER_ETHER,
        DONATE,
        UPDATE_TOKEN,
        UPDATE_TOKEN_PRICE,
        TOKEN_WITHDRAW,
        TRANSFER_TOKEN,
        CONNECT_WALLET,
        ERC20,
        CHECK_ACCOUNT_BALANCE,
        setAccount,
        setLoader,
        addtokenToMetaMask,
        TOKEN_ADDRESS,
        loader,
        account,
        currency,
    } = useContext(TOKEN_ICO_Context);

    const [ownerModel, setOwnerModel] = useState(false);
    const [buyModel, setBuyModel] = useState(false);
    const [transferModel, setTransferModel] = useState(false);
    const [TransferCurrency, setTransferCurrency] = useState(false);
    const [openDonate, setOpenDonate] = useState(false);
    const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
    const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
    const [detail, setDetail] = useState();
    const [openTransferCurrency, setOpenTransferCurrency] = useState(false);    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const items = await TOKEN_ICO();
            console.log(items);
            setDetail(items);
          } catch (error) {
            console.error("Failed to fetch token data:", error);
          }
        };
        fetchData();
      }, [account]);
    
    return <>
        <div className='body_wrap'>
            {ownerModel &&
                (
                    <Owner
                        setOwnerModel={setOwnerModel}
                        currency={currency}
                        detail={detail}
                        account={account}
                        setTransferModel={setTransferModel}
                        setTransferCurrency={setTransferCurrency}
                        setOpenDonate={setOpenDonate}
                        TOKEN_WITHDRAW={TOKEN_WITHDRAW}
                        setOpenUpdatePrice={setOpenUpdatePrice}
                        setOpenUpdateAddress={setOpenUpdateAddress}
                    />
                )

            }

            {
                buyModel &&
                (
                    <Popup
                        setBuyModel={setBuyModel}
                        BUY_TOKEN={BUY_TOKEN}
                        currency={currency}
                        detail={detail}
                        account={account}
                        ERC20={ERC20}
                        TOKEN_ADDRESS={TOKEN_ADDRESS}
                        setLoader={setLoader}
                    />
                )
            }

            {
                transferModel &&
                (
                    <TransferToken
                        setTransferModel={setTransferModel}
                        TRANSFER_TOKEN={TRANSFER_TOKEN}
                        ERC20={ERC20}
                        setLoader={setLoader}
                    />
                )
            }

            {
                openTransferCurrency &&
                (
                    <TransferCurrency
                        setTransferCurrency={setOpenTransferCurrency}
                        TRANSFER_ETHER={TRANSFER_ETHER}
                        detail={detail}
                        currency={currency}
                        CHECK_ACCOUNT_BALANCE={CHECK_ACCOUNT_BALANCE}
                        setLoader={setLoader}
                    />
                )
            }

            {
                openDonate &&
                (
                    <Donate
                        detail={detail}
                        setOpenDonate={setOpenDonate}
                        currency={currency}
                        DONATE={DONATE}
                    />
                )
            }

            {
                openUpdatePrice &&
                (
                    <UpdatePrice
                        detail={detail}
                        currency={currency}
                        setOpenUpdatePrice={setOpenUpdatePrice}
                        UPDATE_TOKEN_PRICE={UPDATE_TOKEN_PRICE}
                    />
                )
            }

            {
                openUpdateAddress &&
                (
                    <UpdateAddress
                        detail={detail}
                        currency={currency}
                        setOpenUpdateAddress={setOpenUpdateAddress}
                        UPDATE_TOKEN={UPDATE_TOKEN}
                        ERC20={ERC20}
                        setLoader={setLoader}
                    />
                )
            }

            {
                loader && <Loader />
            }

            <Header 
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

            <SideBar/>

            <Hero
                setBuyModel={setBuyModel}
                account={account}   
                CONNECT_WALLET={CONNECT_WALLET}
                setAccount={setAccount}
                setLoader={setLoader}
                detail={detail}
                addtokenToMetaMask={addtokenToMetaMask}
            />
            <About/>
            <Features/>
            <Token/>
            <TokenInfo
                detail={detail}    
            />
            <Team/>
            <Contact/>
            <Footer/>
        </div>
    </>;
};
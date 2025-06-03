module core::dex {
    use sui::coin;
    use sui::balance;
    use sui::sui::SUI;
    use edutoken::edutoken;      // module edutoken của bạn
    use core::treasury;

    // Ví dụ tỷ lệ 1 SUI = 100 EDUTOKEN (cố định)
    const RATE: u64 = 100;

    // Swap SUI thành EDUTOKEN
    public fun swap_sui_to_edutoken(
        edutokenTreasury: &mut edutoken::EDUTOKENTreasuryCoinfig,
        treasury: &mut treasury::Treasury,
        sui_coin: coin::Coin<SUI>,
        ctx: &mut tx_context::TxContext,
    ): coin::Coin<edutoken::EDUTOKEN> {
        let sui_amount = coin::value(&sui_coin);

        // 1. Gửi SUI vào treasury
        treasury::deposit<SUI>(treasury, sui_coin);

        // 2. Tính số lượng EDUTOKEN cần mint theo RATE
        let edutoken_amount = sui_amount * RATE;

        // 3. Mint EDUTOKEN trả cho người dùng
        edutoken::mint_edutoken(edutokenTreasury, edutoken_amount, ctx)
    }

    // Swap EDUTOKEN thành SUI
    public fun swap_edutoken_to_sui(
        edutokenTreasury: &mut edutoken::EDUTOKENTreasuryCoinfig,
        treasury: &mut treasury::Treasury,
        edutoken_coin: coin::Coin<edutoken::EDUTOKEN>,
        ctx: &mut tx_context::TxContext,
    ): coin::Coin<SUI> {
        let edutoken_amount = coin::value(&edutoken_coin);

        // 1. Burn EDUTOKEN
        edutoken::burn_edutoken(edutokenTreasury, edutoken_coin);

        // 2. Tính số lượng SUI cần trả theo RATE
        let sui_amount = edutoken_amount / RATE;

        // 3. Rút SUI từ treasury
        let total_sui_balance = treasury::borrow_from_treasury<SUI>(treasury);
        let sui_balance = balance::split<SUI>(total_sui_balance, sui_amount);

        // 4. Trả SUI cho người dùng
        coin::from_balance<SUI>(sui_balance, ctx)
    }
}
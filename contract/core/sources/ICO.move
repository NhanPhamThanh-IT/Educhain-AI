module core::ICO {
    use sui::coin;
    use edutoken::edutoken::{EDUTOKEN};
    use sui::sui::SUI;
    use sui::balance;
    use sui::tx_context;

    /// Cấu trúc pool lưu trữ reserve token
    public struct LiquidityPool has key {
        id: object::UID,
        reserve_edutoken: u64,
        reserve_sui: u64,
        token_edutoken: balance::Balance<EDUTOKEN>,
        token_sui: balance::Balance<SUI>,
    }

    /// Hàm tạo mới liquidity pool (cần gọi lần đầu)
    public fun init_pool(
        edutoken_coins: coin::Coin<EDUTOKEN>,
        sui_coins: coin::Coin<SUI>,
        ctx: &mut TxContext,
    ): LiquidityPool {
        let id = object::new(ctx);
        let mut token_edutoken = balance::zero<EDUTOKEN>();
        let mut token_sui = balance::zero<SUI>();

        balance::deposit(&mut token_edutoken, edutoken_coins);
        balance::deposit(&mut token_sui, sui_coins);
        LiquidityPool {
            id,
            reserve_edutoken: balance::value(&token_edutoken),
            reserve_sui: balance::value(&token_sui),
            token_edutoken,
            token_sui,
        }
    }

    /// Hàm tính toán theo constant product formula (k = x * y)
    fun get_amount_out(amount_in: u64, reserve_in: u64, reserve_out: u64): u64 {
        // Giả sử phí swap 0.3%
        let amount_in_with_fee = amount_in * 997 / 1000;
        let numerator = amount_in_with_fee * reserve_out;
        let denominator = reserve_in + amount_in_with_fee;
        numerator / denominator
    }

    /// Swap EDUTOKEN lấy SUI
    public fun swap_edutoken_for_sui(
        pool: &mut LiquidityPool,
        edutoken_in: coin::Coin<EDUTOKEN>,
        min_sui_out: u64,
        ctx: &mut tx_context::TxContext,
    ): coin::Coin<SUI> {
        let amount_in = coin::value(&edutoken_in);
        let sui_out_amount = get_amount_out(amount_in, pool.reserve_edutoken, pool.reserve_sui);
        assert!(sui_out_amount >= min_sui_out, 1);

        // Cập nhật reserve
        pool.reserve_edutoken = pool.reserve_edutoken + amount_in;
        pool.reserve_sui = pool.reserve_sui - sui_out_amount;

        // Cộng EDUTOKEN vào pool
        coin::join(&mut pool.token_edutoken, edutoken_in);
        // Rút SUI ra trả người swap
        let sui_out = coin::extract(&mut pool.token_sui, sui_out_amount);

        // Gọi event (nếu có module events)
        // core::events::emit_swap_completed_event(b"EDUTOKEN", amount_in, b"SUI", sui_out_amount, tx_context::sender(ctx), ctx);

        sui_out
    }

    /// Swap SUI lấy EDUTOKEN
    public fun swap_sui_for_edutoken(
        pool: &mut LiquidityPool,
        sui_in: coin::Coin<SUI>,
        min_edutoken_out: u64,
        ctx: &mut tx_context::TxContext,
    ): coin::Coin<EDUTOKEN> {
        let amount_in = coin::value(&sui_in);
        let edutoken_out_amount = get_amount_out(amount_in, pool.reserve_sui, pool.reserve_edutoken);
        assert!(edutoken_out_amount >= min_edutoken_out, 1);

        // Cập nhật reserve
        pool.reserve_sui = pool.reserve_sui + amount_in;
        pool.reserve_edutoken = pool.reserve_edutoken - edutoken_out_amount;

        // Cộng SUI vào pool
        coin::join(&mut pool.token_sui, sui_in);
        // Rút EDUTOKEN ra trả người swap
        let edutoken_out = coin::extract(&mut pool.token_edutoken, edutoken_out_amount);

        // Gọi event (nếu có module events)
        // core::events::emit_swap_completed_event(b"SUI", amount_in, b"EDUTOKEN", edutoken_out_amount, tx_context::sender(ctx), ctx);

        edutoken_out
    }
}

module TokenICO::ICO {
    use sui::coin::{Coin, TreasuryCap, Self};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID};
    use sui::option;

    struct IcoInfo has key, store {
        id: UID,
        admin: address,
        price_per_token: u64, // số token / 1 SUI
        sold: u64,
        treasury_cap: TreasuryCap<edutoken::EDUTOKEN::COIN>
    }

    public entry fun init_ico(
        treasury_cap: TreasuryCap<edutoken::EDUTOKEN::COIN>,
        price_per_token: u64,
        ctx: &mut TxContext
    ) {
        let ico = IcoInfo {
            id: object::new(ctx),
            admin: TxContext::sender(ctx),
            price_per_token,
            sold: 0,
            treasury_cap
        };
        transfer::transfer(ico, TxContext::sender(ctx));
    }

    public entry fun update_price(
        ico: &mut IcoInfo,
        new_price: u64,
        ctx: &TxContext
    ) {
        assert!(TxContext::sender(ctx) == ico.admin, b"Only owner");
        ico.price_per_token = new_price;
    }

    public entry fun buy_tokens(
        ico: &mut IcoInfo,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let buyer = TxContext::sender(ctx);
        let sui_amount = coin::value(&payment);
        assert!(sui_amount > 0, b"Payment too low");
        let token_amount = sui_amount * ico.price_per_token;

        let token_coin = coin::mint(&mut ico.treasury_cap, token_amount, ctx);
        transfer::transfer(token_coin, buyer);
        transfer::transfer(payment, ico.admin);
        ico.sold = ico.sold + token_amount;
    }

    public fun get_price(ico: &IcoInfo): u64 {
        ico.price_per_token
    }

    public fun get_sold(ico: &IcoInfo): u64 {
        ico.sold
    }

    public entry fun withdraw_all(ico: &mut IcoInfo, ctx: &mut TxContext) {
        assert!(TxContext::sender(ctx) == ico.admin, b"Only owner");
        let all = coin::take_all(&mut ico.treasury_cap);
        transfer::transfer(all, ico.admin);
    }
}

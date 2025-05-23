module edutoken::EDUTOKEN {
    use sui::tx_context::{Self, TxContext};
    use sui::option;
    use sui::transfer;
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::event;
    use sui::object::{Self, UID};

    public struct COIN has key, store, drop {}

    /// Admin quyền mint/burn
    public struct AdminCap has key, store {
        id: UID,
        admin: address,
    }

    struct InitFlag has key{}

    /// Event logs
    struct MintEvent has drop, store {
        recipient: address,
        amount: u64,
    }

    struct BurnEvent has drop, store {
        owner: address,
        amount: u64,
    }

    public entry fun init(witness: COIN, ctx: &mut TxContext): (AdminCap, TreasuryCap<COIN>) {
        assert!(
            !exists<InitFlag>(TxContext::sender(ctx)),
            b"EDUTOKEN: Already initialized"
        );
        
        let (treasury_cap, metadata) = coin::create_currency<COIN>(
            witness, 9, b"COIN", b"First Coin", b"This is my first coin", option::none(), ctx
        );

        let admin = TxContext::sender(ctx);
        let admin_cap = AdminCap {
            id: object::new(ctx),
            admin,
        };

        transfer::public_freeze_object(metadata);
        /// Lưu InitFlag vào storage để đánh dấu đã init
        move_to<InitFlag>(&admin, InitFlag{});
        (admin_cap, treasury_cap)
    }

    fun assert_admin(admin_cap: &AdminCap, ctx: &TxContext) {
        assert!(TxContext::sender(ctx) == admin_cap.admin, b"Unauthorized");
    }

    public entry fun mint(
        admin_cap: &AdminCap,
        treasury_cap: &mut TreasuryCap<COIN>, 
        amount: u64,
        ctx: &mut TxContext
    ): Coin<COIN> {
        assert_admin(admin_cap, ctx);
        coin::mint(treasury_cap, amount, ctx)
    }

    public entry fun mint_and_transfer(
        admin_cap: &AdminCap, 
        treasury_cap: &mut TreasuryCap<COIN>, 
        amount: u64, 
        recipient: address, 
        ctx: &mut TxContext
    ) {
        assert_admin(admin_cap, ctx);
        coin::mint_and_transfer(treasury_cap, amount, recipient, ctx);
        event::emit(MintEvent { recipient, amount });
    }

    public entry fun burn(treasury_cap: &mut TreasuryCap<COIN>, coin: Coin<COIN>, ctx: &mut TxContext) {
        let amount = coin::value(&coin);
        let owner = TxContext::sender(ctx);
        coin::burn(treasury_cap, coin);
        event::emit(BurnEvent { owner, amount });
    }

    public entry fun register(ctx: &mut TxContext) {
        coin::register<COIN>(TxContext::sender(ctx));
    }

    public entry fun check_balance(owner: address): u64 {
        coin::balance<COIN>(owner)
    }

    public entry fun transfer_token(coin: Coin<COIN>, recipient: address) {
        transfer::transfer(coin, recipient);
    }

    public entry fun destroy_admincap(admin_cap: AdminCap, ctx: &TxContext) {
        assert!(TxContext::sender(ctx) == admin_cap.admin, b"Unauthorized");
        // drop admin_cap
    }
}

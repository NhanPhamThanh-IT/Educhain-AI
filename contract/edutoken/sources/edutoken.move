module edutoken::edutoken {
    use sui::coin;
    use std::ascii;
    use sui::url;

    const TOTAL_SUPPLY: u64 = 100000000000000;

    const URL: vector<u8> = b"https://drive.google.com/file/d/15AeEWJpe7e7dwZRyGg5H0ljevvKaKfc9/view?usp=sharing";

    public struct EDUTOKEN has drop {}

	public struct EDUTOKENTreasuryCoinfig has key, store{
		id: object::UID,
		treasuryCap: coin::TreasuryCap<EDUTOKEN>
	}

	public fun mint_edutoken(
		eDUTOKENTreasuryCoinfig: &mut EDUTOKENTreasuryCoinfig,
		amount: u64,
		ctx: &mut tx_context::TxContext
	): coin::Coin<EDUTOKEN>{
		coin::mint<EDUTOKEN>(&mut eDUTOKENTreasuryCoinfig.treasuryCap, amount, ctx)
	}

	public fun burn_edutoken(
        eDUTOKENTreasuryCoinfig: &mut EDUTOKENTreasuryCoinfig,
        coin: coin::Coin<EDUTOKEN>
    ) {
        coin::burn<EDUTOKEN>(&mut eDUTOKENTreasuryCoinfig.treasuryCap, coin);
    }

    fun init(witness: EDUTOKEN, ctx: &mut tx_context::TxContext) {
		let (mut treasuryCap, coinMetadata) = coin::create_currency<EDUTOKEN>(
				witness,
				6,
				b"EDUTOKEN",
				b"EDUTOKEN PROTOCOL",
				b"edutoken protocol's native token",
				option::some<url::Url>(url::new_unsafe(ascii::string(URL))),
				ctx,
		);
		transfer::public_freeze_object<coin::CoinMetadata<EDUTOKEN>>(coinMetadata);
		let init_supply = coin::mint<EDUTOKEN>(&mut treasuryCap, TOTAL_SUPPLY, ctx);
    	transfer::public_transfer<coin::Coin<EDUTOKEN>>(init_supply, tx_context::sender(ctx));

		let eDUTOKENTreasuryCoinfig = EDUTOKENTreasuryCoinfig{
            id: object::new(ctx), 
            treasuryCap: treasuryCap,
        };
        transfer::public_share_object<EDUTOKENTreasuryCoinfig>(eDUTOKENTreasuryCoinfig);
    }
}
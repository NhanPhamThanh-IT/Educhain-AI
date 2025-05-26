module edutoken::edutoken {
    use sui::coin;
    use std::ascii;
    use sui::url;

    const TOTAL_SUPPLY: u64 = 100000000000000;

    const URL: vector<u8> = b"https://drive.google.com/file/d/15AeEWJpe7e7dwZRyGg5H0ljevvKaKfc9/view?usp=sharing";

    public struct EDUTOKEN has drop {}

    fun init(witness: EDUTOKEN, ctx: &mut tx_context::TxContext) {
		let (treasuryCap, coinMetadata) = coin::create_currency<EDUTOKEN>(
				witness,
				6,
				b"EDUTOKEN",
				b"EDUTOKEN PROTOCOL",
				b"edutoken protocol's native token",
				option::some<url::Url>(url::new_unsafe(ascii::string(URL))),
				ctx,
		);
		transfer::public_freeze_object<coin::CoinMetadata<EDUTOKEN>>(coinMetadata);
		let mut treasuryCap_ref = treasuryCap;
                transfer::public_transfer<coin::Coin<EDUTOKEN>>(coin::mint<EDUTOKEN>(&mut treasuryCap_ref, TOTAL_SUPPLY, ctx), tx_context::sender(ctx));
                transfer::public_transfer<coin::TreasuryCap<EDUTOKEN>>(treasuryCap_ref, @0x0);
    }
}
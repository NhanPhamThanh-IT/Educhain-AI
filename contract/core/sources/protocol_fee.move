module core::protocol_fee {
    use sui::types;
    use sui::coin::{Self, Coin};

    use core::admin;
    use core::treasury;
    use core::version;

    const TEST_WALLET: address = 0xfc25a4a794e71c27a6abe43920682dc31a2f8d28758e67bfd439523765f5b342;
    
    public struct ProtocolFeeConfig has store, key {
        id: object::UID,
        version: u64,
        test_wallet: address,
        total_protocol_fee_percent_base_18: u64,
        treasury_fee_percent_base_18: u64,
        test_wallet_fee_percent_base_18: u64,
        referee_discount: u64,
    }
    
    fun check_version(protocolFeeConfig: &ProtocolFeeConfig) {
        version::check_version(protocolFeeConfig.version);
    }
    
    #[allow(unused_variable)]
    public fun change_fee_percentages(
        adminCap: &admin::AdminCap,
        protocolFeeConfig: &mut ProtocolFeeConfig, 
        version: &mut option::Option<u64>,
        protocol_fee: &mut option::Option<u64>, 
        treasury_fee: &mut option::Option<u64>, 
        test_wallet_fee: &mut option::Option<u64>, 
        referee_discount: &mut option::Option<u64>,
    ) {
        if (option::is_some<u64>(freeze(version))) {
            protocolFeeConfig.version = option::extract<u64>(version);
        };
        if (option::is_some<u64>(freeze(protocol_fee))) {
            protocolFeeConfig.total_protocol_fee_percent_base_18 = option::extract<u64>(protocol_fee);
        };
        if (option::is_some<u64>(freeze(treasury_fee))) {
            protocolFeeConfig.treasury_fee_percent_base_18 = option::extract<u64>(treasury_fee);
        };
        if (option::is_some<u64>(freeze(test_wallet_fee))) {
            protocolFeeConfig.test_wallet_fee_percent_base_18 = option::extract<u64>(test_wallet_fee);
        };
        assert!(protocolFeeConfig.treasury_fee_percent_base_18 + protocolFeeConfig.test_wallet_fee_percent_base_18 == 1000000000000000000, 3);
        if (option::is_some<u64>(freeze(referee_discount))) {
            protocolFeeConfig.referee_discount = option::extract<u64>(referee_discount);
        };
    }
    
    public(package) fun create_config<T0: drop>(
        witness: &T0, 
        ctx: &mut tx_context::TxContext
    ) : ProtocolFeeConfig {
        assert!(types::is_one_time_witness<T0>(witness), 1);
        let protocolFeeConfig = ProtocolFeeConfig{
            id                                 : object::new(ctx), 
            version                            : version::current_version(), 
            test_wallet                         : TEST_WALLET, 
            total_protocol_fee_percent_base_18 : 0, //0%
            treasury_fee_percent_base_18       : 1000000000000000000, 
            test_wallet_fee_percent_base_18     : 0, //0%
            referee_discount                   : 0, //0%
        };
        protocolFeeConfig
    }
    
    public fun test_wallet_fee(protocolFeeConfig: &ProtocolFeeConfig) : u64 {
        protocolFeeConfig.test_wallet_fee_percent_base_18
    }
    
    #[allow(unused_variable)]
    public fun distribute_protocol_fees<T0>(
        protocolFeeConfig: &ProtocolFeeConfig, 
        treasury: &mut treasury::Treasury, 
        coin: &mut Coin<T0>, 
        ctx: &mut tx_context::TxContext
    ) {
        check_version(protocolFeeConfig);
        if (protocolFeeConfig.total_protocol_fee_percent_base_18 == 0) {
            return
        };
        let total_protocol_fee = take_percent_base_18(
            coin::value<T0>(freeze(coin)), 
            protocolFeeConfig.total_protocol_fee_percent_base_18
        );
        let treasury_fee = take_percent_base_18(
            total_protocol_fee, 
            protocolFeeConfig.treasury_fee_percent_base_18
        );
        if (treasury_fee > 0) {
            treasury::deposit<T0>(
                treasury, 
                coin::split<T0>(coin, treasury_fee, ctx)
            );
        };
        let test_wallet_fee = take_percent_base_18(
            total_protocol_fee, 
            protocolFeeConfig.test_wallet_fee_percent_base_18
        );
        if (test_wallet_fee > 0) {
            transfer::public_transfer<Coin<T0>>(
                coin::split<T0>(coin, test_wallet_fee, ctx), 
                protocolFeeConfig.test_wallet
            );
        };
    }
    
    public fun referee_discount(protocolFeeConfig: &ProtocolFeeConfig) : u64 {
        protocolFeeConfig.referee_discount
    }
    
    public fun take_percent_base_18(value: u64, percent_base_18: u64) : u64 {
        ((value as u128) * (percent_base_18 as u128) / (1000000000000000000 as u128)) as u64
    }
    
    public fun total_protocol_fee(protocolFeeConfig: &ProtocolFeeConfig) : u64 {
        protocolFeeConfig.total_protocol_fee_percent_base_18
    }
    
    public fun treasury_fee(protocolFeeConfig: &ProtocolFeeConfig) : u64 {
        protocolFeeConfig.treasury_fee_percent_base_18
    }
    
    #[allow(unused_variable)]
    public fun update_test_wallet_address(
        adminCap: &admin::AdminCap, 
        protocolFeeConfig: &mut ProtocolFeeConfig, 
        test_wallet: address
    ) {
        check_version(protocolFeeConfig);
        protocolFeeConfig.test_wallet = test_wallet;
    }
}
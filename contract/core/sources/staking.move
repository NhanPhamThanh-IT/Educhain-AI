module core::staking {
    use sui::types;
    use sui::clock;
    use sui::coin;
    use sui::balance;
    use sui::sui::SUI;

    use edutoken::edutoken;

    use core::admin;
    use core::treasury;
    use core::protocol_fee;
    use core::events;
    use core::version;

    const TGE_TIME: u64 = 1746057600000;
    const RATIO_BASE_18: u64 = 25000000000000000;
    const MS_PER_YEAR: u64= 31536000000;

    public struct StakeConfig has store, key {
        id: object::UID,
        version: u64,
        tge_time: u64,
        ratio_base_18: u64,
        max_stake_limit: u64,
        total_staked: u64,
    }

    fun check_version(stakeConfig: &StakeConfig) {
        version::check_version(stakeConfig.version);
    }
    
    #[allow(unused_variable)]
    public fun change_stake_config(
        adminCap: &admin::AdminCap,
        stakeConfig: &mut StakeConfig, 
        version: &mut option::Option<u64>,
        tge_time: &mut option::Option<u64>, 
        ratio_base_18: &mut option::Option<u64>,
        max_stake_limit: &mut option::Option<u64>,
    ) {
        if (option::is_some<u64>(freeze(version))) {
            stakeConfig.version = option::extract<u64>(version);
        };
        if (option::is_some<u64>(freeze(tge_time))) {
            stakeConfig.tge_time = option::extract<u64>(tge_time);
        };
        if (option::is_some<u64>(freeze(ratio_base_18))) {
            stakeConfig.ratio_base_18 = option::extract<u64>(ratio_base_18);
        };
        if (option::is_some<u64>(freeze(max_stake_limit))) {
            stakeConfig.max_stake_limit = option::extract<u64>(max_stake_limit);
        };
    }

    public(package) fun create_config<T0: drop>(
        witness: &T0, 
        ctx: &mut tx_context::TxContext
    ) : StakeConfig {
        assert!(types::is_one_time_witness<T0>(witness), 1);
        let stakeConfig = StakeConfig{
            id                          : object::new(ctx), 
            version                     : version::current_version(), 
            tge_time                    : TGE_TIME, 
            ratio_base_18               : RATIO_BASE_18,
            max_stake_limit             : 180000000000000,
            total_staked                : 0,
        };
        stakeConfig
    }
    
    public fun stake(
        cSUITreasuryCoinfig: &mut csui::CSUITreasuryCoinfig,
        stakeConfig: &mut StakeConfig,
        treasury: &mut treasury::Treasury,
        coin: coin::Coin<SUI>,
        clock: &clock::Clock, 
        ctx: &mut tx_context::TxContext,
    ): coin::Coin<csui::CSUI>
    {   
        check_version(stakeConfig);
        let anual_interest = protocol_fee::take_percent_base_18(
            1000000000, 
            stakeConfig.ratio_base_18
        );
        let interest = anual_interest * (clock::timestamp_ms(clock) - stakeConfig.tge_time) / MS_PER_YEAR;
        let amount_u128 = (coin::value(&coin) as u128) * (1000000000 as u128) / ((1000000000 as u128) + (interest as u128));
        let amount_u64 = amount_u128 as u64;
        stakeConfig.total_staked = coin::value(&coin) + stakeConfig.total_staked;
        assert!( stakeConfig.total_staked <= stakeConfig.max_stake_limit, 0);
        treasury::deposit<SUI>(treasury, coin);
        let coin_out = csui::mint_csui(cSUITreasuryCoinfig, amount_u64, ctx);
        events::emit_stake_event(amount_u64, ctx);
        coin_out
    }  

    public fun unstake(
        cSUITreasuryCoinfig: &mut csui::CSUITreasuryCoinfig,
        stakeConfig: &mut StakeConfig,
        treasury: &mut treasury::Treasury,
        coin: coin::Coin<csui::CSUI>,
        clock: &clock::Clock, 
        ctx: &mut tx_context::TxContext,
    ): coin::Coin<SUI>
    {   
        check_version(stakeConfig);
        let anual_interest = protocol_fee::take_percent_base_18(
            1000000000, 
            stakeConfig.ratio_base_18
        );
        let interest = anual_interest * (clock::timestamp_ms(clock) - stakeConfig.tge_time) / MS_PER_YEAR;
        let amount_u128 = (coin::value(&coin) as u128) * ((1000000000 as u128) + (interest as u128)) / (1000000000 as u128);
        let amount_u64 = amount_u128 as u64;
        stakeConfig.total_staked = stakeConfig.total_staked - amount_u64;
        assert!(stakeConfig.total_staked >= amount_u64, 0);
        csui::burn_csui(cSUITreasuryCoinfig, coin);
        let total_balance = treasury::borrow_from_treasury<SUI>(treasury);
        let balance = balance::split<SUI>(total_balance, amount_u64);
        events::emit_unstake_event(amount_u64, ctx);
        coin::from_balance<SUI>(balance, ctx)
    }  
}
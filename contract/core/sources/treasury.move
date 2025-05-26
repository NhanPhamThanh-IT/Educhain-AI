module core::treasury {
    use std::type_name;
    use sui::coin::{Self, Coin};
    use sui::balance;
    use sui::bag;
    
    use core::admin;
    use core::version;
    use core::events;

    public struct Treasury has store, key {
        id: object::UID,
        version: u64,
        funds: bag::Bag,
    }
    
    fun check_version(treasury: &Treasury) {
        version::check_version(treasury.version);
    }
    
    public fun balance_of<T0>(treasury: &mut Treasury) : u64 {
        check_version(treasury);
        balance::value<T0>(bag::borrow<type_name::TypeName, balance::Balance<T0>>(&treasury.funds, type_name::get<T0>()))
    }
    
    public(package) fun create_treasury(ctx: &mut tx_context::TxContext) : Treasury {
        Treasury{
            id      : object::new(ctx), 
            version : version::current_version(), 
            funds   : bag::new(ctx),
        }
    }
    
    public fun deposit<T0>(treasury: &mut Treasury, coin: Coin<T0>) {
        check_version(treasury);
        if (!bag::contains(&treasury.funds, type_name::get<T0>())) {
            bag::add(
                &mut treasury.funds, 
                type_name::get<T0>(), 
                coin::into_balance<T0>(coin)
            );
        } else {
            let fund = bag::borrow_mut(
                &mut treasury.funds, 
                type_name::get<T0>()
            );
            balance::join<T0>(fund, coin::into_balance<T0>(coin));
        }
    }

    #[allow(lint(self_transfer), unused_variable)]
    public fun withdraw<T0>( 
        admin_cap: &admin::AdminCap,
        treasury: &mut Treasury,
        ctx: &mut tx_context::TxContext
    ) {
        check_version(treasury);
        let balance = bag::remove<type_name::TypeName, balance::Balance<T0>>(&mut treasury.funds, type_name::get<T0>());
        let amount = balance::value<T0>(&balance);
        events::emit_withdraw_event<T0>(amount);
        transfer::public_transfer<Coin<T0>>(coin::from_balance<T0>(balance, ctx), tx_context::sender(ctx));
    }

    #[allow(unused_variable)]
    public fun withdraw_some<T0>(
        admin_cap: &admin::AdminCap,
        treasury: &mut Treasury,
        amount: u64,
        ctx: &mut tx_context::TxContext
    ): coin::Coin<T0>{
        check_version(treasury);
        let balance = bag::borrow_mut<type_name::TypeName, balance::Balance<T0>>(&mut treasury.funds, type_name::get<T0>());
        coin::from_balance<T0>(balance::split<T0>(balance, amount), ctx)
    }

    public(package) fun borrow_from_treasury<T0>(
        treasury: &mut Treasury, 
    ): &mut balance::Balance<T0>{
        check_version(treasury);
        bag::borrow_mut<type_name::TypeName, balance::Balance<T0>>(&mut treasury.funds, type_name::get<T0>())
    }
}
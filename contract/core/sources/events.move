module core::events {
    use std::type_name;
    use std::ascii;
    use sui::event;

    public struct SwapCompletedEvent has copy, drop {
        sender: address,
        type_in: ascii::String,
        amount_in: u64,
        type_out: ascii::String,
        amount_out: u64,
        referral: address,
    }
    
    public(package) fun emit_swap_completed_event(
        type_in: vector<u8>, 
        amount_in: u64, 
        type_out: vector<u8>, 
        amount_out: u64, 
        referral: address,
        ctx: &tx_context::TxContext
    ) {
        let swapCompletedEvent = SwapCompletedEvent{
            sender         : tx_context::sender(ctx), 
            type_in        : ascii::string(type_in), 
            amount_in      : amount_in, 
            type_out       : ascii::string(type_out), 
            amount_out     : amount_out,
            referral   :referral,
        };
        event::emit<SwapCompletedEvent>(swapCompletedEvent);
    }

    public struct StakeCompletedEvent has copy, drop {
        sender: address,
        type_in: ascii::String,
        amount_in: u64,
        type_out: ascii::String,
        amount_out: u64,
        referral: address,
    }
    
    public(package) fun emit_stake_completed_event(
        type_in: vector<u8>, 
        amount_in: u64, 
        type_out: vector<u8>, 
        amount_out: u64, 
        referral: address,
        ctx: &tx_context::TxContext
    ) {
        let stakeCompletedEvent = StakeCompletedEvent{
            sender    : tx_context::sender(ctx), 
            type_in              : ascii::string(type_in), 
            amount_in      : amount_in, 
            type_out             : ascii::string(type_out), 
            amount_out     : amount_out,
            referral   :referral,
        };
        event::emit<StakeCompletedEvent>(stakeCompletedEvent);
    }

    public struct UnstakeCompletedEvent has copy, drop {
        sender: address,
        type_in: ascii::String,
        amount_in: u64,
        type_out: ascii::String,
        amount_out: u64,
        referral: address,
    }

    public(package) fun emit_unstake_completed_event(
        type_in: vector<u8>, 
        amount_in: u64, 
        type_out: vector<u8>, 
        amount_out: u64, 
        referral: address,
        ctx: &tx_context::TxContext
    ) {
        let unstakeCompletedEvent = UnstakeCompletedEvent{
            sender    : tx_context::sender(ctx), 
            type_in              : ascii::string(type_in), 
            amount_in      : amount_in, 
            type_out             : ascii::string(type_out), 
            amount_out     : amount_out,
            referral   :referral,
        };
        event::emit<UnstakeCompletedEvent>(unstakeCompletedEvent);
    }

    public struct FlashloanEvent has copy, drop {
        sender: address,
        type_name: ascii::String,
        amount: u64,
    }
    
    public(package) fun emit_flashloan_event(type_name: vector<u8>, amount: u64, ctx: &tx_context::TxContext) {
        let flashloanEvent = FlashloanEvent{
            sender      : tx_context::sender(ctx),
            type_name             : ascii::string(type_name), 
            amount          : amount,
        };
        event::emit<FlashloanEvent>(flashloanEvent);
    }

    public struct StakeEvent has copy, drop {
        sender: address,
        amount: u64,
    }
    
    public(package) fun emit_stake_event(amount: u64, ctx: &tx_context::TxContext) {
        let stakeEvent = StakeEvent{
            sender      : tx_context::sender(ctx),
            amount          : amount,
        };
        event::emit<StakeEvent>(stakeEvent);
    }

    public struct UnstakeEvent has copy, drop {
        sender: address,
        amount: u64,
    }
    
    public(package) fun emit_unstake_event(amount: u64, ctx: &tx_context::TxContext) {
        let unstakeEvente = UnstakeEvent{
            sender      : tx_context::sender(ctx),
            amount          : amount,
        };
        event::emit<UnstakeEvent>(unstakeEvente);
    }

    public struct ZeroObjectEvent has copy, drop {
        sender: address,
    }
    
    public(package) fun emit_zero_object_event(ctx: &tx_context::TxContext) {
        let zeroObjectEvent = ZeroObjectEvent{
            sender      : tx_context::sender(ctx),
        };
        event::emit<ZeroObjectEvent>(zeroObjectEvent);
    }

    public struct MultiZeroObjectEvent has copy, drop {
        sender: address,
        amount: u64,
    }

    public(package) fun emit_multi_zero_object_event(amount: u64, ctx: &tx_context::TxContext) {
        let zeroObjectEvent = MultiZeroObjectEvent{
            sender      : tx_context::sender(ctx),
            amount      : amount,
        };
        event::emit<MultiZeroObjectEvent>(zeroObjectEvent);
    }

    public struct ClaimCroEvent has copy, drop {
        sender: address,
        amount: u64,
    }
    
    public(package) fun emit_claim_cro_event(amount: u64, ctx: &tx_context::TxContext) {
        let claimCroEvent = ClaimCroEvent{
            sender      : tx_context::sender(ctx),
            amount          : amount,
        };
        event::emit<ClaimCroEvent>(claimCroEvent);
    }

    public struct AddPointsEvent has copy, drop {
        sender: address,
        amount: u64,
    }
    
    public(package) fun emit_add_points_event(amount: u64, ctx: &tx_context::TxContext) {
        let adPointsEvent = AddPointsEvent{
            sender      : tx_context::sender(ctx),
            amount          : amount,
        };
        event::emit<AddPointsEvent>(adPointsEvent);
    }

    public struct RemovePointsEvent has copy, drop {
        sender: address,
        amount: u64,
    }
    
    public(package) fun emit_remove_points_event(amount: u64, ctx: &tx_context::TxContext) {
        let removePointsEvent = RemovePointsEvent{
            sender      : tx_context::sender(ctx),
            amount          : amount,
        };
        event::emit<RemovePointsEvent>(removePointsEvent);
    }

    public struct WithdrawEvent has copy, drop {
        typeName: type_name::TypeName,
        amount: u64,
    }
    
    public(package) fun emit_withdraw_event<T0>(amount: u64) {
        let withdrawEvent = WithdrawEvent{
            typeName      : type_name::get<T0>(),
            amount          : amount,
        };
        event::emit<WithdrawEvent>(withdrawEvent);
    }
}
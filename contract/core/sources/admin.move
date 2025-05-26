module core::admin {

    public struct AdminCap has store, key {
        id: object::UID,
    }
    
    public(package) fun create_admin_cap(ctx: &mut tx_context::TxContext) : AdminCap {
        AdminCap{id: object::new(ctx)}
    }
}
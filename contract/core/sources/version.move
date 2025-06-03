module core::version {
    
    public(package) fun check_version(version: u64) {
        assert!(0 != current_version(), 0);
        assert!(version == current_version(), 0);
    }
    
    public(package) fun current_version() : u64 {
        1
    }
}
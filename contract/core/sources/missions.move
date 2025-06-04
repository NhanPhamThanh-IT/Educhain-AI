module core::missions {
    use sui::table;
    use sui::coin;
    use std::hash;
    use std::bcs;
    use edutoken::edutoken;
    use core::admin;

    /// Thông tin mission
    public struct Mission has key, store {
        id: object::UID,
        description: vector<u8>,
        reward: u64,
        mission_type: u8, // 0: swap, 1: stake, 2: online, ...
        start_time: u64,
        end_time: u64,
    }

    /// Kho mission
    public struct MissionsTable has key, store {
        id: object::UID,
        missions: table::Table<u64, Mission>,
        mission_ids: vector<u64>, // Lưu tất cả id để random
    }

    /// Key cho Table user_missions
    public struct UserMissionKey has copy, drop, store {
        user: address,
        mission_id: u64,
    }

    /// Trạng thái từng mission của user
    public struct UserMission has key, store {
        id: object::UID,
        user: address,
        mission_id: u64,
        progress: u64,
        claimed: bool,
        completed: bool,
        last_reset: u64,
    }

    /// Danh sách 6 mission của user mỗi 2 tuần
    public struct UserMissionSet has key, store {
        id: object::UID,
        user: address,
        missions: vector<u64>, // 6 mission_id
        last_reset: u64,
    }

    /// Table lưu trạng thái mission của user
    public struct UserMissionsTable has key, store {
        id: object::UID,
        user_missions: table::Table<UserMissionKey, UserMission>,
        user_sets: table::Table<address, UserMissionSet>,
    }

    /// Random 6 mission_id từ kho (pseudo-random, không bảo mật)
    fun random_6_missions(
        missions_table: &MissionsTable,
        user: address,
        now: u64
    ): vector<u64> {
        let total = vector::length(&missions_table.mission_ids);
        assert!(total >= 6, 1000);
        let mut missions = vector::empty<u64>();
        let user_bytes = bcs::to_bytes(&user);
        let hash_bytes = hash::sha3_256(user_bytes);
        let mut base: u64 = 0;
        let len = vector::length(&hash_bytes);
        let mut i = 0;
        while (i < len && i < 8) {
            let byte = *vector::borrow(&hash_bytes, i);
            base = base * 256 + (byte as u64);
            i = i + 1;
        };
        base = (base + now) % total;
        let mut j = 0;
        while (vector::length(&missions) < 6) {
            let idx = (base + j) % total;
            let mission_id = vector::borrow(&missions_table.mission_ids, idx);
            if (!vector::contains(&missions, mission_id)) {
                vector::push_back(&mut missions, *mission_id);
            };
            j = j + 1;
        };
        missions
    }

    /// Đảm bảo user có UserMissionSet, random lại nếu hết 2 tuần
    public fun ensure_user_mission_set(
        user_missions_table: &mut UserMissionsTable,
        missions_table: &MissionsTable,
        user: address,
        now: u64,
        ctx: &mut tx_context::TxContext
    ) {
        if (!table::contains(&user_missions_table.user_sets, user)) {
            let id = object::new(ctx);
            let missions = random_6_missions(missions_table, user, now);
            let set = UserMissionSet { id, user, missions, last_reset: now };
            table::add(&mut user_missions_table.user_sets, user, set);
        } else {
            let set = table::borrow_mut(&mut user_missions_table.user_sets, user);
            if (now > set.last_reset + 1209600000) {
                set.missions = random_6_missions(missions_table, user, now);
                set.last_reset = now;
            }
        }
    }

    /// Kiểm tra mission_id có nằm trong danh sách 6 mission của user không
    fun is_user_mission_active(
        user_missions_table: &UserMissionsTable,
        user: address,
        mission_id: u64
    ): bool {
        if (!table::contains(&user_missions_table.user_sets, user)) {
            false
        } else {
            let set = table::borrow(&user_missions_table.user_sets, user);
            vector::contains(&set.missions, &mission_id)
        }
    }

    /// Cập nhật tiến độ mission cho user (chỉ nếu mission nằm trong danh sách 6 mission)
    public fun update_user_mission_on_action(
        missions_table: &MissionsTable,
        user_missions_table: &mut UserMissionsTable,
        user: address,
        mission_id: u64,
        progress: u64,
        now: u64,
        ctx: &mut tx_context::TxContext
    ) {
        ensure_user_mission_set(user_missions_table, missions_table, user, now, ctx);
        assert!(is_user_mission_active(user_missions_table, user, mission_id), 1001);

        let mission = table::borrow(&missions_table.missions, mission_id);
        assert!(now >= mission.start_time, 100);
        assert!(now <= mission.end_time, 101);

        let key = UserMissionKey { user, mission_id };
        if (!table::contains(&user_missions_table.user_missions, key)) {
            let id = object::new(ctx);
            let user_mission = UserMission {
                id, user, mission_id,
                progress: 0, claimed: false, completed: false, last_reset: now
            };
            table::add(&mut user_missions_table.user_missions, key, user_mission);
            let user_mission_ref = table::borrow_mut(&mut user_missions_table.user_missions, key);
            // cập nhật user_mission_ref ở đây nếu cần
            if (mission.mission_type == 2) {
                user_mission_ref.progress = user_mission_ref.progress + progress;
                if (user_mission_ref.progress >= 7200) {
                    user_mission_ref.completed = true;
                }
            }
            // ... các loại mission khác
        } else {
            let user_mission_ref = table::borrow_mut(&mut user_missions_table.user_missions, key);
            // cập nhật user_mission_ref ở đây nếu cần
            if (mission.mission_type == 2) {
                user_mission_ref.progress = user_mission_ref.progress + progress;
                if (user_mission_ref.progress >= 7200) {
                    user_mission_ref.completed = true;
                }
            }
            // ... các loại mission khác
        }
    }
    /// Admin tạo mission mới
    public fun create_mission(
        _admin: &admin::AdminCap,
        missions_table: &mut MissionsTable,
        id: u64,
        description: vector<u8>,
        reward: u64,
        mission_type: u8,
        start_time: u64,
        end_time: u64,
        ctx: &mut tx_context::TxContext
    ) {
        let mission_id = id;
        let mission = Mission { id: object::new(ctx), description, reward, mission_type, start_time, end_time };
        table::add(&mut missions_table.missions, mission_id, mission);
        vector::push_back(&mut missions_table.mission_ids, mission_id);
    }

    /// User nhận thưởng mission
    public fun claim_mission_reward(
        missions_table: &MissionsTable,
        user_missions_table: &mut UserMissionsTable,
        edutoken_treasury: &mut edutoken::EDUTOKENTreasuryCoinfig,
        mission_id: u64,
        now: u64,
        ctx: &mut tx_context::TxContext
    ): coin::Coin<edutoken::EDUTOKEN> {
        let sender = tx_context::sender(ctx);

        ensure_user_mission_set(user_missions_table, missions_table, sender, now, ctx);
        assert!(is_user_mission_active(user_missions_table, sender, mission_id), 1001);

        let mission = table::borrow(&missions_table.missions, mission_id);
        assert!(now >= mission.start_time, 100);
        assert!(now <= mission.end_time, 101);

        let key = UserMissionKey { user: sender, mission_id };
        assert!(table::contains(&user_missions_table.user_missions, key), 0);
        let user_mission = table::borrow_mut(&mut user_missions_table.user_missions, key);
        assert!(user_mission.completed, 2);
        assert!(!user_mission.claimed, 1);

        // Đánh dấu đã nhận thưởng
        user_mission.claimed = true;

        // Mint EDUTOKEN thưởng
        edutoken::mint_edutoken(edutoken_treasury, mission.reward, ctx)
    }
}
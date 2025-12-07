module sui_you_there::game {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::sui::SUI;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui::event;

    // --- HATA KODLARI ---
    const EGameAlreadyClaimed: u64 = 101;
    const ETooFarFromLocation: u64 = 102; // "Konumdasın ama uzaksın" hatası
    const EUserAlreadyRegistered: u64 = 103;
    const EUserNotVerified: u64 = 104;

    // --- SİZİN CÜZDAN ADRESİNİZ (KASA) ---
    const FEE_ADDRESS: address = @0xSeninCuzdanAdresin; 

    // --- KULLANICI KİMLİK OBJESİ ---
    struct UserIdentity has key, store {
        id: UID,
        wallet_address: address,
        registered_at: u64,    // Unix timestamp
        is_verified: bool,
        display_name: vector<u8>,
    }

    // --- KAYIT OLAYI ---
    struct UserRegisteredEvent has copy, drop {
        user_address: address,
        registered_at: u64,
    }

    // --- OYUN OBJESİ ---
    struct GamePool has key, store {
        id: UID,
        balance: Balance<SUI>,
        
        // HEDEF KOORDİNATLAR (1 Milyon ile çarpılmış hali)
        // Örn: 41.0082 -> 41008200 olarak saklanacak
        target_lat: u64,
        target_long: u64,
        
        is_claimed: bool,
    }

    // --- KULLANICI KAYIT FONKSİYONU ---
    // Kullanıcı cüzdan bağladıktan sonra bu fonksiyonu çağırarak kendini kaydeder
    public entry fun register_user(
        display_name: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);
        
        let identity = UserIdentity {
            id: object::new(ctx),
            wallet_address: sender,
            registered_at: current_time,
            is_verified: true, // Kayıt olduğunda otomatik doğrulanmış sayılır
            display_name: display_name,
        };

        // Event yayınla
        event::emit(UserRegisteredEvent {
            user_address: sender,
            registered_at: current_time,
        });

        // Kimlik objesini kullanıcıya transfer et
        transfer::transfer(identity, sender);
    }

    // --- KULLANICI DOĞRULAMA SORGULAMA ---
    // Frontend'den kullanıcının kayıtlı olup olmadığını kontrol etmek için
    public fun is_user_verified(identity: &UserIdentity): bool {
        identity.is_verified
    }

    // --- KULLANICI BİLGİSİ SORGULAMA ---
    public fun get_user_info(identity: &UserIdentity): (address, u64, bool) {
        (identity.wallet_address, identity.registered_at, identity.is_verified)
    }

    // 1. OYUN KURMA
    // Kurucu hedef koordinatları girer
    public entry fun create_game(
        lat: u64,           // Hedef Enlem (x 1.000.000)
        long: u64,          // Hedef Boylam (x 1.000.000)
        payment: Coin<SUI>,     
        ctx: &mut TxContext
    ) {
        let game = GamePool {
            id: object::new(ctx),
            balance: coin::into_balance(payment),
            target_lat: lat,
            target_long: long,
            is_claimed: false,
        };
        transfer::share_object(game);
    }

    // 2. OYUNA KATILMA 
    public entry fun join_game(
        game: &mut GamePool, 
        payment: Coin<SUI>, 
        _ctx: &mut TxContext
    ) {
        assert!(game.is_claimed == false, EGameAlreadyClaimed);
        let payment_balance = coin::into_balance(payment);
        balance::join(&mut game.balance, payment_balance);
    }

    // 3. ÖDÜLÜ ÇEKME (Konum Kontrollü)
    // Frontend kullanıcının o anki koordinatını parametre olarak yollar
    public entry fun claim_winner(
        game: &mut GamePool,
        user_lat: u64,   // Kullanıcının Enlemi (x 1.000.000)
        user_long: u64,  // Kullanıcının Boylamı (x 1.000.000)
        ctx: &mut TxContext
    ) {
        assert!(game.is_claimed == false, EGameAlreadyClaimed);

        // --- KONUM HESAPLAMA MANTIĞI ---
        // Basit Matematik: Farkı al (Mutlak Değer)
        // Move'da negatif sayı olmadığı için if/else ile büyükten küçüğü çıkarıyoruz.
        
        let diff_lat = if (user_lat > game.target_lat) { 
            user_lat - game.target_lat 
        } else { 
            game.target_lat - user_lat 
        };

        let diff_long = if (user_long > game.target_long) { 
            user_long - game.target_long 
        } else { 
            game.target_long - user_long 
        };

        // TOLERANS: 0.0005 derece (Yaklaşık 50-60 metre)
        // 1.000.000 ile çarptığımız için tolerans değeri = 500
        let tolerance: u64 = 500;

        // Eğer fark toleranstan büyükse işlemi reddet
        assert!(diff_lat < tolerance && diff_long < tolerance, ETooFarFromLocation);

        // --- ÖDEME KISMI ---
        game.is_claimed = true;

        let total_value = balance::value(&game.balance);
        let fee_value = (total_value * 5) / 100; // %5 Fee
        
        let fee_balance = balance::split(&mut game.balance, fee_value);
        let reward_balance = balance::withdraw_all(&mut game.balance);

        transfer::public_transfer(coin::from_balance(fee_balance, ctx), FEE_ADDRESS);
        transfer::public_transfer(coin::from_balance(reward_balance, ctx), tx_context::sender(ctx));
    }
}

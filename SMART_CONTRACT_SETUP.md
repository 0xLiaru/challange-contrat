## 🚀 Sui Smart Contract Integration Guide

Bu belge, Lock Friend uygulamasına Sui blockchain smart contract'ının nasıl deploy edileceğini ve entegre edileceğini açıklar.

### 📋 İçindekiler
1. [Ön Gereksinimler](#ön-gereksinimler)
2. [Smart Contract Deploy Adımları](#smart-contract-deploy-adımları)
3. [Uygulamayı Yapılandırma](#uygulamayı-yapılandırma)
4. [Test Etme](#test-etme)
5. [Sorun Giderme](#sorun-giderme)

---

## ✅ Ön Gereksinimler

1. **Sui CLI Kurulu** (https://docs.sui.io/guides/developer/getting-started/sui-install)
   ```bash
   curl -sSL https://sui-releases.s3-accelerate.amazonaws.com/latest/sui-macos-latest.tar.gz | tar -xz
   ```

2. **Sui Testnet Cüzdan Adresi**
   - Testnet'te cüzdan oluştur:
   ```bash
   sui client new
   ```

3. **Test SUI Coin'i**
   - Faucet'ten al: https://faucet.testnet.sui.io/

4. **Node.js & npm**
   - v16+ versiyonu gereklidir

---

## 🔧 Smart Contract Deploy Adımları

### 1. Contract Dosyasını Yayınlayın

Contract dosyası şurada: `sui-contracts/game.move`

### 2. Move Cümlelerini Düzenleyin

`sui-contracts/game.move` dosyasında aşağıdaki satırı bulup kendi adresinizle güncelleyin:

```move
// ÖNCESİ:
const FEE_ADDRESS: address = @0xSeninCuzdanAdresin;

// SONRASI (örnek):
const FEE_ADDRESS: address = @0x1234567890abcdef1234567890abcdef12345678;
```

Kendi Sui cüzdan adresinizi almak için:
```bash
sui client active-address
```

### 3. Contract'ı Deploy Edin

Terminal'de şu komutu çalıştırın:

```bash
cd sui-contracts
sui client publish --gas-budget 50000000 game.move
```

**Başarılı çıktı örneği:**
```
Successfully published: 0x1234567890abcdef1234567890abcdef12345678
```

Bu "Package ID"yi kopyalayın - sonra ihtiyacımız olacak!

---

## ⚙️ Uygulamayı Yapılandırma

### 1. Contract Constantlarını Güncelleyin

`src/contractInteraction.ts` dosyasını açın ve aşağıdaki satırları düzenleyin:

```typescript
// ÖNCESİ:
const GAME_CONTRACT_PACKAGE = "0xYourPackageId";
const FEE_ADDRESS = "0xSeninCuzdanAdresin";

// SONRASI (örnek):
const GAME_CONTRACT_PACKAGE = "0x1234567890abcdef1234567890abcdef12345678";
const FEE_ADDRESS = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd";
```

### 2. Sui Client Yapılandırması

Uygulamada Sui client'ı şu şekilde kullanılır:

```typescript
import { SuiClient } from "@mysten/sui.js/client";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig } = createNetworkConfig();
const client = new SuiClient({
  url: networkConfig.testnet.fullnode,
});
```

### 3. Environment Değişkenleri (İsteğe bağlı)

`.env.local` dosyası oluşturun:

```env
VITE_GAME_CONTRACT_PACKAGE=0x1234567890abcdef...
VITE_FEE_ADDRESS=0xabcdefabcdefabcdef...
VITE_RPC_URL=https://fullnode.testnet.sui.io:443
```

Sonra `contractInteraction.ts`'de:

```typescript
const GAME_CONTRACT_PACKAGE = import.meta.env.VITE_GAME_CONTRACT_PACKAGE;
const FEE_ADDRESS = import.meta.env.VITE_FEE_ADDRESS;
```

---

## 🧪 Test Etme

### 1. Uygulamayı Başlatın

```bash
npm run dev
```

### 2. GamePage'e Gidin

- Landing page'de "🎮 Blockchain Oyunu" bölümünü açın
- Cüzdanınızı bağlayın

### 3. Testler

#### Test 1: Oyun Oluşturma
1. "Oyun Oluştur" sekmesine gidin
2. Aşağıdaki bilgileri girin:
   - **Oyun Adı:** "Test Oyunu"
   - **Hedef Enlem:** 41.0082 (Taksim'e yakın)
   - **Hedef Boylam:** 28.9784
   - **Oyun Stake:** 1 SUI
3. "Oyunu Oluştur" butonuna tıklayın

**Beklenen Sonuç:**
- Blockchain'de işlem onaylanır
- Başarı mesajı gösterilir
- İşlem hash'i loglanır

#### Test 2: Oyuna Katılma
1. "Oyuna Katıl" sekmesine gidin
2. Önceki test'ten aldığınız Game ID'sini yapıştırın
3. Katılım stake'i girin (0.5 SUI)
4. "Oyuna Katıl" butonuna tıklayın

#### Test 3: Konum Kontrollü Ödül Talep Etme
1. "Oyna" sekmesine gidin
2. "📍 Konumu Güncelle" butonuna tıklayın
3. İzin verdiğinizde cihazınızın konumu alınır
4. Hedef konuma yaklaşın (100m içinde)
5. Mesafe göstergesini kontrol edin
6. "🎉 Ödülü Talep Et" butonuna tıklayın

**Beklenen Sonuç:**
- Mesafe doğrulanır
- Smart contract otomatik ceza dağıtımı yapar
- Ödül kazananın cüzdanına SUI gönderilir
- %5 fee sizin cüzdanına gönderilir

---

## 📱 GPS Özelliği (Web'de)

Lock Friend GPS özelliğini `Geolocation API` ile kullanır:

### Tarayıcı Uyumluluğu
- ✅ Chrome/Edge (99+)
- ✅ Firefox (115+)
- ✅ Safari (16+)
- ✅ Opera (85+)

### İzin İsteme
Uygulamada `"📍 Konumu Güncelle"` butonuna tıklandığında:
1. Tarayıcı "Konum İzni" popup'ını gösterir
2. Kullanıcı "İzin Ver" veya "Reddet" seçer
3. İzin verilirse, GPS koordinatları alınır

### Doğruluk
- **Açık alanda:** ±5-10 metre
- **Kapalı alanda:** ±20-50 metre (zayıf sinyal)

---

## 🔗 Smart Contract Fonksiyonları

### 1. `create_game`
Yeni bir oyun pool'u oluşturur.

**Parametreler:**
- `lat: u64` - Hedef enlem (1.000.000 ile çarpılmış)
- `long: u64` - Hedef boylam (1.000.000 ile çarpılmış)
- `payment: Coin<SUI>` - Oyun stake'i

**Örnek:**
```typescript
// Frontend
const targetLat = 41.0082; // Taksim
const targetLong = 28.9784;

await createGame(
  client,
  senderAddress,
  targetLat,
  targetLong,
  1.0 // 1 SUI
);
```

### 2. `join_game`
Mevcut oyuna katılır.

**Parametreler:**
- `game: GamePool` - Oyun pool'u objesi
- `payment: Coin<SUI>` - Katılım stake'i

### 3. `claim_winner`
Konum doğrulamasıyla ödülü talep eder.

**Parametreler:**
- `game: GamePool` - Oyun pool'u
- `user_lat: u64` - Kullanıcının enlemi (1.000.000 ile çarpılmış)
- `user_long: u64` - Kullanıcının boylamı (1.000.000 ile çarpılmış)

**İş Mantığı:**
1. Kullanıcının konumunu hedefle karşılaştırır
2. Tolerans: ±50-60 metre (0.0005 derece)
3. Doğrulanırsa:
   - Pool'u "claimed" işaretler
   - %5 fee ayırır
   - Kalanını kazanana gönderir

---

## ❌ Sorun Giderme

### "Package ID not found"
**Sebep:** Contract deploy edilmemiş veya yanlış Package ID

**Çözüm:**
```bash
# Yeniden deploy edin
sui client publish --gas-budget 50000000 game.move

# Çıktıdan Package ID'yi kopyalayın
# contractInteraction.ts'de güncelleyin
```

### "Insufficient gas"
**Sebep:** Gas budget yetersiz

**Çözüm:**
```bash
# Gas budget'ı artırın
sui client publish --gas-budget 100000000 game.move
```

### "Transaction failed: TOO_FAR_FROM_LOCATION"
**Sebep:** Kullanıcı hedef konumdan 100m+'da

**Çözüm:**
- Hedef konuma daha yaklaşın
- GPS doğruluğunu kontrol edin
- İndoor ise dışarı çıkın

### GPS çalışmıyor
**Sebep:** İzin verilmedi veya HTTPS değil

**Çözüm:**
1. HTTPS kullanın (http://localhost tamam)
2. Tarayıcı ayarlarında izni kontrol edin
3. Incognito modu deneyin

### Contract erroru: "EGameAlreadyClaimed"
**Sebep:** Oyun zaten talep edilmiş

**Çözüm:**
- Yeni bir oyun oluşturun
- Game ID'nin doğru olduğunu kontrol edin

---

## 📚 Faydalı Kaynaklar

- [Sui Docs](https://docs.sui.io)
- [Move Language](https://move-language.github.io)
- [@mysten/sui.js](https://github.com/mysten/sui/tree/main/sdk/typescript)
- [Sui Testnet Faucet](https://faucet.testnet.sui.io)

---

## 💡 İleri Kullanım

### Custom Tolerance Ayarlama

`locationUtils.ts`'de `validateLocation` fonksiyonunu özelleştirin:

```typescript
const validation = validateLocation(
  userLocation.latitude,
  userLocation.longitude,
  targetLat,
  targetLong,
  0.001 // 100+ metre (varsayılan: 0.0005 = 50m)
);
```

### Multi-Location Games

Contract'ı genişleterek birden fazla lokasyon desteği ekleyebilirsiniz:

```move
struct GamePool {
    // ... diğer alanlar
    locations: vector<Location>,
}

struct Location {
    lat: u64,
    long: u64,
}
```

### Leaderboard Ekleme

Winner'ları izlemek için Move struct'ına ekleyin:

```move
struct Winner {
    address: address,
    amount: u64,
    timestamp: u64,
}
```

---

**Son Güncelleme:** Aralık 6, 2025

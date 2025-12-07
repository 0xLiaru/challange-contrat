// Type imports for reference
// import type { Transaction } from "@mysten/sui.js/transactions";
// import type { SuiClient } from "@mysten/sui.js/client";

// Kontrat sabitesi (Deploy sonrası güncelleme gerekir)
const GAME_CONTRACT_PACKAGE = "0xYourPackageId"; // Deploy sonrası değiştir
const GAME_MODULE = "game";
// const FEE_ADDRESS = "0xSeninCuzdanAdresin"; // Deploy sonrası değiştir

// Sui Clock Object ID (testnet/mainnet için sabit)
const SUI_CLOCK_OBJECT_ID = "0x0000000000000000000000000000000000000000000000000000000000000006";

interface GamePool {
  id: string;
  balance: number;
  target_lat: number;
  target_long: number;
  is_claimed: boolean;
}

interface UserIdentity {
  id: string;
  wallet_address: string;
  registered_at: number;
  is_verified: boolean;
  display_name: string;
}

interface LocationCoords {
  latitude: number;
  longitude: number;
}

/**
 * Koordinatı 1.000.000 ile çarparak u64 formatına dönüştür
 * Örn: 41.0082 -> 41008200
 */
export function encodeCoordinate(coord: number): number {
  return Math.round(coord * 1_000_000);
}

/**
 * u64 formatını geri koordinata dönüştür
 * Örn: 41008200 -> 41.0082
 */
export function decodeCoordinate(encoded: number): number {
  return encoded / 1_000_000;
}

/**
 * Yeni bir oyun pool'u oluştur
 * @param client - Sui istemcisi
 * @param sender - Gönderici adresi
 * @param targetLat - Hedef enlem (normal float)
 * @param targetLong - Hedef boylam (normal float)
 */
export async function createGame(
  client: any,
  sender: string,
  targetLat: number,
  targetLong: number
): Promise<string> {
  try {
    // Transaction yapısı dinamik olarak oluşturuluyor
    const tx = {
      pure: (value: any) => value,
      moveCall: (config: any) => config,
    };

    // Smart contract fonksiyonunu çağır
    tx.moveCall({
      target: `${GAME_CONTRACT_PACKAGE}::${GAME_MODULE}::create_game`,
      arguments: [
        tx.pure(encodeCoordinate(targetLat)),
        tx.pure(encodeCoordinate(targetLong)),
      ],
    });

    // İşlemi gönder
    const result = await client.signAndExecuteTransaction?.({
      transaction: tx,
      signer: sender,
      chain: "sui:testnet",
    });

    console.log("Oyun oluşturuldu:", result);
    return result?.digest || "success";
  } catch (error) {
    console.error("Oyun oluşturma hatası:", error);
    throw error;
  }
}

/**
 * Mevcut oyuna katıl
 * @param client - Sui istemcisi
 * @param sender - Gönderici adresi
 * @param gameId - Oyun pool'u ID'si
 */
export async function joinGame(
  client: any,
  sender: string,
  gameId: string,
  // amountSui: number
): Promise<string> {
  try {
    const tx = {
      pure: (value: any) => value,
      moveCall: (config: any) => config,
      object: (id: string) => id,
    };

    // Smart contract fonksiyonunu çağır
    tx.moveCall({
      target: `${GAME_CONTRACT_PACKAGE}::${GAME_MODULE}::join_game`,
      arguments: [
        tx.object(gameId),
        // coinSplit reference removed
      ],
    });

    // İşlemi gönder
    const result = await client.signAndExecuteTransaction?.({
      transaction: tx,
      signer: sender,
      chain: "sui:testnet",
    });

    console.log("Oyuna katıldı:", result);
    return result?.digest || "success";
  } catch (error) {
    console.error("Oyuna katılma hatası:", error);
    throw error;
  }
}

/**
 * Ödülü talep et (Konum Kontrollü)
 * @param client - Sui istemcisi
 * @param sender - Gönderici adresi
 * @param gameId - Oyun pool'u ID'si
 * @param userLocation - Kullanıcının mevcut konumu
 */
export async function claimWinner(
  client: any,
  sender: string,
  gameId: string,
  userLocation: LocationCoords
): Promise<string> {
  try {
    const tx = {
      pure: (value: any) => value,
      moveCall: (config: any) => config,
      object: (id: string) => id,
    };

    // Konum koordinatlarını encode et
    const encodedLat = encodeCoordinate(userLocation.latitude);
    const encodedLong = encodeCoordinate(userLocation.longitude);

    // Smart contract fonksiyonunu çağır
    tx.moveCall({
      target: `${GAME_CONTRACT_PACKAGE}::${GAME_MODULE}::claim_winner`,
      arguments: [
        tx.object(gameId),
        tx.pure(encodedLat),
        tx.pure(encodedLong),
      ],
    });

    // İşlemi gönder
    const result = await client.signAndExecuteTransaction?.({
      transaction: tx,
      signer: sender,
      chain: "sui:testnet",
    });

    console.log("Ödül başarıyla talep edildi:", result);
    return result?.digest || "success";
  } catch (error) {
    console.error("Ödül talep hatası:", error);
    throw error;
  }
}

/**
 * Oyun pool'u bilgisini sorgula
 */
export async function getGameInfo(
  client: any,
  gameId: string
): Promise<GamePool | null> {
  try {
    const obj = await client.getObject({
      id: gameId,
      options: {
        showContent: true,
      },
    });

    if (obj.data?.content && "fields" in obj.data.content) {
      const fields = obj.data.content.fields as any;
      return {
        id: gameId,
        balance: parseInt(fields.balance?.value || "0"),
        target_lat: decodeCoordinate(parseInt(fields.target_lat || "0")),
        target_long: decodeCoordinate(parseInt(fields.target_long || "0")),
        is_claimed: fields.is_claimed || false,
      };
    }

    return null;
  } catch (error) {
    console.error("Oyun bilgisi sorgu hatası:", error);
    return null;
  }
}

/**
 * Konum doğrula (Frontend tarafında)
 * Kullanıcının hedef konumdan tolerans içinde olup olmadığını kontrol et
 */
export function validateLocation(
  userLat: number,
  userLong: number,
  targetLat: number,
  targetLong: number,
  toleranceDegrees: number = 0.0005 // Yaklaşık 50-60 metre
): { isValid: boolean; distanceMeters: number } {
  const R = 6371000; // Dünya yarıçapı metre cinsinden

  const lat1 = (userLat * Math.PI) / 180;
  const lat2 = (targetLat * Math.PI) / 180;
  const deltaLat = ((targetLat - userLat) * Math.PI) / 180;
  const deltaLong = ((targetLong - userLong) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
    Math.cos(lat2) *
    Math.sin(deltaLong / 2) *
    Math.sin(deltaLong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceMeters = R * c;

  const toleranceMeters = toleranceDegrees * 111000; // 1 derece ≈ 111 km

  return {
    isValid: distanceMeters <= toleranceMeters,
    distanceMeters: Math.round(distanceMeters),
  };
}

/**
 * Kullanıcıyı akıllı kontrat ile kaydet
 * Cüzdan bağlandıktan sonra kimlik doğrulama için çağrılır
 * @param client - Sui istemcisi
 * @param sender - Gönderici adresi
 * @param displayName - Kullanıcının görünen adı
 */
export async function registerUser(
  client: any,
  sender: string,
  displayName: string = "Lock Friend User"
): Promise<string> {
  try {
    const tx = {
      pure: (value: any) => value,
      moveCall: (config: any) => config,
      object: (id: string) => id,
    };

    // Display name'i byte array'e dönüştür
    const displayNameBytes = Array.from(new TextEncoder().encode(displayName));

    // Smart contract fonksiyonunu çağır
    tx.moveCall({
      target: `${GAME_CONTRACT_PACKAGE}::${GAME_MODULE}::register_user`,
      arguments: [
        tx.pure(displayNameBytes),
        tx.object(SUI_CLOCK_OBJECT_ID), // Clock objesi
      ],
    });

    // İşlemi gönder
    const result = await client.signAndExecuteTransaction?.({
      transaction: tx,
      signer: sender,
      chain: "sui:testnet",
    });

    console.log("Kullanıcı kaydedildi:", result);
    return result?.digest || "success";
  } catch (error) {
    console.error("Kullanıcı kayıt hatası:", error);
    throw error;
  }
}

/**
 * Kullanıcının kayıtlı kimlik objesini kontrol et
 * @param client - Sui istemcisi
 * @param userAddress - Kullanıcı cüzdan adresi
 */
export async function checkUserIdentity(
  client: any,
  userAddress: string
): Promise<UserIdentity | null> {
  try {
    // Kullanıcının sahip olduğu objeleri sorgula
    const objects = await client.getOwnedObjects({
      owner: userAddress,
      filter: {
        StructType: `${GAME_CONTRACT_PACKAGE}::${GAME_MODULE}::UserIdentity`,
      },
      options: {
        showContent: true,
      },
    });

    if (objects.data && objects.data.length > 0) {
      const obj = objects.data[0];
      if (obj.data?.content && "fields" in obj.data.content) {
        const fields = obj.data.content.fields as any;

        // Display name byte array'den string'e dönüştür
        const displayNameBytes = fields.display_name || [];
        const displayName = new TextDecoder().decode(new Uint8Array(displayNameBytes));

        return {
          id: obj.data.objectId,
          wallet_address: fields.wallet_address,
          registered_at: parseInt(fields.registered_at || "0"),
          is_verified: fields.is_verified || false,
          display_name: displayName,
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Kullanıcı kimlik sorgu hatası:", error);
    return null;
  }
}

export default {
  encodeCoordinate,
  decodeCoordinate,
  createGame,
  joinGame,
  claimWinner,
  getGameInfo,
  validateLocation,
  registerUser,
  checkUserIdentity,
};

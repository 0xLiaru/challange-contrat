import { useState } from 'react';
import { useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
import { Button, Flex, Text, Box } from '@radix-ui/themes';

// Deploy ettiğiniz Kontratın ID'si
const PACKAGE_ID = "0x...SİZİN_PACKAGE_ID..."; 
const MODULE_NAME = "game";
const FUNCTION_NAME = "claim_winner";

interface ClaimButtonProps {
  gameId: string;
  onSuccess?: (digest: string) => void;
  onError?: (error: string) => void;
}

export const ClaimButton = ({ gameId, onSuccess, onError }: ClaimButtonProps) => {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Konum Alma Fonksiyonu
  const getCurrentLocation = (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Tarayıcı konum özelliğini desteklemiyor."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          if (err.code === 1) {
            reject(new Error("Konum erişimine izin verilmedi. Tarayıcı ayarlarını kontrol edin."));
          } else if (err.code === 2) {
            reject(new Error("Konum alınamadı. İnternet bağlantınızı kontrol edin."));
          } else if (err.code === 3) {
            reject(new Error("Konum istek süresi aşıldı. Lütfen tekrar deneyin."));
          } else {
            reject(new Error("Konum alınamadı."));
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const handleClaim = async () => {
    if (!account) {
      const errMsg = "Lütfen önce cüzdan bağlayın!";
      setError(errMsg);
      onError?.(errMsg);
      return;
    }

    if (PACKAGE_ID === "0x...SİZİN_PACKAGE_ID...") {
      const errMsg = "Lütfen PACKAGE_ID'yi güncelleyin!";
      setError(errMsg);
      onError?.(errMsg);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Konumu Al
      console.log("📍 Konum alınıyor...");
      const location = await getCurrentLocation();
      
      console.log(`Ham Konum: ${location.latitude}, ${location.longitude}`);

      // 2. Koordinatları Sui formatına dönüştür (× 1,000,000)
      const lat = Math.round(location.latitude * 1_000_000);
      const long = Math.round(location.longitude * 1_000_000);

      console.log(`Sui Formatı: ${lat}, ${long}`);

      // 3. Transaction oluştur
      // Not: signAndExecute SDK otomatik olarak Transaction bloğu oluşturur
      // Biz sadece yapı sunmamız yeterli
      const txPayload = {
        target: `${PACKAGE_ID}::${MODULE_NAME}::${FUNCTION_NAME}`,
        arguments: [gameId, lat.toString(), long.toString()],
      };

      console.log("🚀 Transaction gönderiliyor...", txPayload);

      // 4. İşlemi imzala ve gönder
      signAndExecute(
        {
          transaction: txPayload as any,
        },
        {
          onSuccess: (result: any) => {
            console.log("✅ İşlem Başarılı!", result);
            const digest = result.digest || result.transactionDigest || "Unknown";
            const successMsg = `🎉 Ödülü kazandınız! Tx: ${digest.slice(0, 12)}...`;
            setSuccess(successMsg);
            onSuccess?.(digest);
          },
          onError: (err: any) => {
            console.error("❌ Hata:", err);
            let errorMsg = "İşlem başarısız oldu.";
            
            if (err.code === 1001) {
              errorMsg = "Konum çok uzak! Hedef konuma daha yaklaşmalısınız.";
            } else if (err.code === 102) {
              errorMsg = "Oyun zaten kazanılmış veya sona ermiş.";
            } else if (err.message) {
              errorMsg = err.message;
            }
            
            setError(errorMsg);
            onError?.(errorMsg);
          },
        }
      );

    } catch (err: any) {
      console.error("⚠️ Hata:", err);
      const errorMsg = err.message || "Konum alınamadı veya işlem iptal edildi.";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="3" style={{ width: "100%" }}>
      <Button
        size="3"
        onClick={handleClaim}
        disabled={loading || !account}
        style={{
          padding: '12px 24px',
          background: loading ? '#9ca3af' : '#10b981',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: loading || !account ? 'not-allowed' : 'pointer',
          opacity: loading || !account ? 0.6 : 1,
          width: '100%',
          border: 'none',
        }}
      >
        {loading ? "📍 Konum Doğrulanıyor..." : "🎉 Ben Geldim! (Ödülü Al)"}
      </Button>

      {error && (
        <Box
          style={{
            padding: '12px 16px',
            background: '#fee2e2',
            borderRadius: '6px',
            border: '1px solid #fca5a5',
            width: '100%',
          }}
        >
          <Text size="2" style={{ color: '#dc2626' }}>
            ❌ {error}
          </Text>
        </Box>
      )}

      {success && (
        <Box
          style={{
            padding: '12px 16px',
            background: '#dcfce7',
            borderRadius: '6px',
            border: '1px solid #86efac',
            width: '100%',
          }}
        >
          <Text size="2" style={{ color: '#16a34a' }}>
            ✅ {success}
          </Text>
        </Box>
      )}
    </Flex>
  );
};

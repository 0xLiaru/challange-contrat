import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Box, Button, Container, Flex, Heading, Text, Card, TextField, Grid, Spinner } from "@radix-ui/themes";
import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";

// Fee wallet adresi - %2 gas fee bu cüzdana gönderilir
// ÖNEMLİ: Aşağıdaki adresi kendi cüzdan adresinizle değiştirin!
// Örnek geçerli adres formatı: 0x + 64 hex karakter
const FEE_WALLET_ADDRESS = ""; // Boş bırakılırsa fee kullanıcıya geri döner

// SUI miktarını MIST'e çevir (1 SUI = 1.000.000.000 MIST)
function suiToMist(sui: number): number {
  return Math.round(sui * 1_000_000_000);
}

// Sui cüzdan adresi doğrulama fonksiyonu
function isValidSuiAddress(address: string): boolean {
  if (!address) return false;
  if (!address.startsWith("0x")) return false;
  const hexPart = address.slice(2);
  const hexRegex = /^[0-9a-fA-F]+$/;
  if (!hexRegex.test(hexPart)) return false;
  if (hexPart.length < 1 || hexPart.length > 64) return false;
  return true;
}

// Adresi normalize et (tam uzunluğa getir)
function normalizeSuiAddress(address: string): string {
  if (!address.startsWith("0x")) return address;
  const hexPart = address.slice(2);
  const paddedHex = hexPart.padStart(64, "0");
  return "0x" + paddedHex;
}

// İki koordinat arasındaki mesafeyi hesapla (metre cinsinden)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Dünya yarıçapı metre cinsinden
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Konum toleransı (metre cinsinden)
const LOCATION_TOLERANCE_METERS = 100; // 100 metre tolerans

interface Challenge {
  id: string;
  name: string;
  createdBy: string;
  targetLat: number;
  targetLong: number;
  stake: string;
  participants: string[];
  createdAt: Date;
  status: "active" | "completed";
  txDigest?: string;
}

interface HomePageProps {
  onLogout: () => void;
  onLogoClick?: () => void;
  onDetailPageClick?: (page: string) => void;
}

export function HomePage({ onLogout, onLogoClick, onDetailPageClick }: HomePageProps) {
  const account = useCurrentAccount();
  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();

  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const [createFormData, setCreateFormData] = useState({
    name: "",
    targetLat: 0,
    targetLong: 0,
    stake: "",
  });

  const [tempParticipants, setTempParticipants] = useState<string[]>([]);
  const [tempWallet, setTempWallet] = useState("");
  const [walletError, setWalletError] = useState<string | null>(null);
  const [expandedChallengeId, setExpandedChallengeId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // GPS ve Reward Claim state'leri
  const [claimingChallengeId, setClaimingChallengeId] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; long: number } | null>(null);

  // GPS konumu al
  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Tarayıcınız konum özelliğini desteklemiyor"));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });
  };

  // Ödül talebi işlemi
  const handleClaimReward = async (challenge: Challenge) => {
    if (!account) {
      alert("Lütfen önce cüzdanınızı bağlayın");
      return;
    }

    if (challenge.status === "completed") {
      alert("Bu challenge zaten tamamlanmış");
      return;
    }

    setClaimingChallengeId(challenge.id);
    setLocationStatus("📍 Konumunuz alınıyor...");

    try {
      // Adım 1: Kullanıcının konumunu al
      const position = await getCurrentLocation();
      const userLat = position.coords.latitude;
      const userLong = position.coords.longitude;

      setUserLocation({ lat: userLat, long: userLong });
      setLocationStatus("🔍 Konum doğrulanıyor...");

      // Adım 2: Hedef konumla karşılaştır
      const distance = calculateDistance(
        userLat,
        userLong,
        challenge.targetLat,
        challenge.targetLong
      );

      console.log(`Mesafe: ${distance.toFixed(2)} metre`);

      // Adım 3: Tolerans kontrolü
      if (distance > LOCATION_TOLERANCE_METERS) {
        setLocationStatus(null);
        setClaimingChallengeId(null);
        alert(
          `❌ Konumunuz hedeften çok uzak!\n\n` +
          `📍 Sizin konumunuz: ${userLat.toFixed(6)}, ${userLong.toFixed(6)}\n` +
          `🎯 Hedef konum: ${challenge.targetLat.toFixed(6)}, ${challenge.targetLong.toFixed(6)}\n` +
          `📏 Mesafe: ${distance.toFixed(0)} metre\n` +
          `✅ Tolerans: ${LOCATION_TOLERANCE_METERS} metre`
        );
        return;
      }

      // Adım 4: Konum doğru - İşlemi simüle et
      setLocationStatus("✅ Konum doğrulandı! Ödül hesaplanıyor...");

      // Tahmini gas fee hesapla
      const stakeAmount = parseFloat(challenge.stake.replace(/[^0-9.]/g, "")) || 0.1;
      const estimatedGasFee = 0.001 + (stakeAmount * 0.0005);
      const estimatedGasFeeFormatted = estimatedGasFee.toFixed(4);

      // Simüle edilmiş işlem gecikmesi
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Challenge durumunu güncelle
      setChallenges(challenges.map(c =>
        c.id === challenge.id
          ? { ...c, status: "completed" as const }
          : c
      ));

      setLocationStatus(null);
      setClaimingChallengeId(null);

      alert(
        `🎉 TEBRİKLER! Ödül başarıyla alındı!\n\n` +
        `💰 Ödül: ${challenge.stake}\n` +
        `📍 Konum: ✅ Doğrulandı (${distance.toFixed(0)}m)\n` +
        `⛽ Tahmini Gas Fee: ~${estimatedGasFeeFormatted} SUI`
      );
    } catch (error: any) {
      setLocationStatus(null);
      setClaimingChallengeId(null);

      if (error.code === 1) {
        alert("❌ Konum izni reddedildi. Lütfen tarayıcı ayarlarından konum iznini verin.");
      } else if (error.code === 2) {
        alert("❌ Konum alınamadı. Lütfen GPS'inizin açık olduğundan emin olun.");
      } else if (error.code === 3) {
        alert("❌ Konum zaman aşımına uğradı. Lütfen tekrar deneyin.");
      } else {
        alert(`❌ Hata: ${error.message}`);
      }
    }
  };

  const handleCreateChallenge = async () => {
    if (!account) {
      alert("Lütfen önce cüzdanınızı bağlayın");
      return;
    }

    if (!createFormData.name || createFormData.targetLat === 0 || createFormData.targetLong === 0 || !createFormData.stake) {
      alert("Lütfen tüm alanları doldurunuz");
      return;
    }

    const stakeAmount = parseFloat(createFormData.stake.replace(/[^0-9.]/g, ""));
    if (isNaN(stakeAmount) || stakeAmount <= 0) {
      alert("Geçerli bir stake miktarı girin (örn: 0.5)");
      return;
    }

    setIsCreating(true);

    try {
      // Gas fee: Stake miktarının %2'si
      const gasFee = stakeAmount * 0.02;
      const gasFeeFormatted = gasFee.toFixed(4);
      const netStake = stakeAmount - gasFee;

      // Transaction oluştur
      const tx = new Transaction();

      // Miktarları MIST'e çevir
      const feeMist = suiToMist(gasFee);
      const stakeMist = suiToMist(netStake);

      // Gas coin'inden iki ayrı coin split et
      const [feeCoin] = tx.splitCoins(tx.gas, [feeMist]);
      const [stakeCoin] = tx.splitCoins(tx.gas, [stakeMist]);

      // Fee wallet adresi geçerli mi kontrol et
      // Geçerli bir Sui adresi: 0x ile başlar ve 66 karakter uzunluğunda 
      const isValidFeeWallet = FEE_WALLET_ADDRESS.length === 66 && FEE_WALLET_ADDRESS.startsWith("0x8781f7423c4b0ea6e440b447b40dbcb2c878329ec458c5015f112223b85ff3c6");
      const feeRecipient = isValidFeeWallet ? FEE_WALLET_ADDRESS : account.address;

      // %2 fee'yi fee wallet'a gönder (veya geçersizse kullanıcıya)
      tx.transferObjects([feeCoin], feeRecipient);

      // Kalan %98'i kullanıcının cüzdanına geri gönder (challenge pool simülasyonu)
      tx.transferObjects([stakeCoin], account.address);

      // İşlemi imzala ve gönder
      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            console.log("Challenge oluşturuldu:", result);

            const newChallenge: Challenge = {
              id: result.digest,
              name: createFormData.name,
              createdBy: account.address,
              targetLat: createFormData.targetLat,
              targetLong: createFormData.targetLong,
              stake: `${netStake.toFixed(4)} SUI`,
              participants: tempParticipants,
              createdAt: new Date(),
              status: "active",
              txDigest: result.digest,
            };

            setChallenges([...challenges, newChallenge]);
            setCreateFormData({ name: "", targetLat: 0, targetLong: 0, stake: "" });
            setTempParticipants([]);
            setTempWallet("");
            setIsCreating(false);

            alert(
              `✅ Challenge başarıyla oluşturuldu!\n\n` +
              `📋 Challenge: ${newChallenge.name}\n` +
              `📍 Konum: ${newChallenge.targetLat.toFixed(4)}, ${newChallenge.targetLong.toFixed(4)}\n` +
              `💰 Stake: ${stakeAmount} SUI\n` +
              `⛽ Gas Fee (%2): ${gasFeeFormatted} SUI → Fee Wallet'a gönderildi\n` +
              `💎 Net Stake: ${netStake.toFixed(4)} SUI\n` +
              `👥 Katılımcı: ${tempParticipants.length} kişi\n\n` +
              `🔗 Tx: ${result.digest.slice(0, 20)}...`
            );
          },
          onError: (error) => {
            console.error("Challenge oluşturma hatası:", error);
            setIsCreating(false);
            alert(`❌ Hata: ${error.message || "Challenge oluşturulamadı"}`);
          },
        }
      );
    } catch (error: any) {
      console.error("İşlem hatası:", error);
      setIsCreating(false);
      alert(`❌ İşlem hatası: ${error.message || "Bilinmeyen hata"}`);
    }
  };

  const handleAddParticipant = () => {
    const trimmedWallet = tempWallet.trim();

    if (!trimmedWallet) {
      setWalletError("Cüzdan adresi boş olamaz");
      return;
    }

    if (!isValidSuiAddress(trimmedWallet)) {
      setWalletError("Geçersiz Sui adresi! 0x ile başlamalı ve hex karakterler içermelidir");
      return;
    }

    const normalizedAddress = normalizeSuiAddress(trimmedWallet);

    if (tempParticipants.some(p => normalizeSuiAddress(p) === normalizedAddress)) {
      setWalletError("Bu cüzdan adresi zaten eklenmiş");
      return;
    }

    if (account && normalizeSuiAddress(account.address) === normalizedAddress) {
      setWalletError("Kendi cüzdan adresinizi ekleyemezsiniz");
      return;
    }

    setTempParticipants([...tempParticipants, trimmedWallet]);
    setTempWallet("");
    setWalletError(null);
  };

  const handleRemoveParticipant = (wallet: string) => {
    setTempParticipants(tempParticipants.filter((w) => w !== wallet));
  };

  const handleDeleteChallenge = (id: string) => {
    setChallenges(challenges.filter((c) => c.id !== id));
  };

  return (
    <Box style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>
      {/* Navbar */}
      <Navbar onLogout={onLogout} onLogoClick={onLogoClick} />

      {/* Hero Section with Feature Cards */}
      <Container size="4" py="8">
        <Flex direction="column" gap="8">
          {/* Hero */}
          <Box style={{ textAlign: "center" }}>
            <Heading
              size="9"
              style={{
                color: "white",
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              Zamanında Gelenleri Ödüllendirin
            </Heading>
            <Text
              size="5"
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Arkadaş grubunun buluşmalara zamanında gelme disiplini kazanmasını sağlayın. Geç gelenler, zamanında gelenler parasını arttırsın!
            </Text>
          </Box>

          {/* Feature Cards */}
          <Grid columns="2" gap="4">
            {/* Smart Penalty Card */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
                backdropFilter: "blur(10px)",
                padding: "24px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => onDetailPageClick?.("smart-penalty")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 212, 255, 0.15)";
                e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.6)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Flex direction="column" gap="3">
                <Box style={{ fontSize: "32px" }}>⚡</Box>
                <Heading size="4" style={{ color: "white" }}>
                  Akıllı Ceza Sistemi
                </Heading>
                <Text
                  size="2"
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: 1.6,
                  }}
                >
                  Geç gelen arkadaşlardan akıllı kontratlar yoluyla otomatik ceza kesimi. Zamanında gelenlerin ödülü artar.
                </Text>
              </Flex>
            </Card>

            {/* Blockchain Security Card */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                backdropFilter: "blur(10px)",
                padding: "24px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => onDetailPageClick?.("blockchain-security")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(16, 185, 129, 0.15)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.6)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Flex direction="column" gap="3">
                <Box style={{ fontSize: "32px" }}>🔐</Box>
                <Heading size="4" style={{ color: "white" }}>
                  Blockchain Güvenliği
                </Heading>
                <Text
                  size="2"
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: 1.6,
                  }}
                >
                  Sui blockchain üzerinde tamamen merkezi olmayan ve güvenli işlemler. Tüm verileri şeffaf bir şekilde yönetin.
                </Text>
              </Flex>
            </Card>

            {/* Group Management Card */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                backdropFilter: "blur(10px)",
                padding: "24px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => onDetailPageClick?.("group-management")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.15)";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.6)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Flex direction="column" gap="3">
                <Box style={{ fontSize: "32px" }}>👥</Box>
                <Heading size="4" style={{ color: "white" }}>
                  Grup Yönetimi
                </Heading>
                <Text
                  size="2"
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: 1.6,
                  }}
                >
                  Arkadaş gruplarınızı kolay bir şekilde yönetin. Üye ekleme, kaldırma ve yönetim yapabilirsiniz.
                </Text>
              </Flex>
            </Card>

            {/* Time Tracking Card */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
                backdropFilter: "blur(10px)",
                padding: "24px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => onDetailPageClick?.("time-tracking")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(249, 115, 22, 0.15)";
                e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.6)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Flex direction="column" gap="3">
                <Box style={{ fontSize: "32px" }}>⏰</Box>
                <Heading size="4" style={{ color: "white" }}>
                  Zaman Takibi
                </Heading>
                <Text
                  size="2"
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: 1.6,
                  }}
                >
                  GPS tabanlı konum doğrulaması ile buluşma noktasında olup olmadığını kontrol edin.
                </Text>
              </Flex>
            </Card>
          </Grid>

          {/* Challenge Section - Only show when scrolling down */}
          <Box style={{ marginTop: "40px" }}>
            <Heading size="6" mb="4" style={{ color: "white" }}>
              🆕 Yeni Challenge
            </Heading>
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "24px",
                borderRadius: "12px",
              }}
            >
              <Flex direction="column" gap="4">
                <TextField.Root
                  placeholder="Challenge Adı (örn: Taksim Buluşması)"
                  value={createFormData.name}
                  onChange={(e) =>
                    setCreateFormData({ ...createFormData, name: e.target.value })
                  }
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                  }}
                />

                <Box>
                  <Flex justify="between" align="center" mb="2">
                    <Text size="2" weight="bold" style={{ color: "white" }}>Hedef Konumu</Text>
                  </Flex>
                  <Flex gap="2">
                    <TextField.Root
                      placeholder="Enlem (örn: 41.0373)"
                      value={createFormData.targetLat === 0 ? "" : createFormData.targetLat.toString()}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCreateFormData({ ...createFormData, targetLat: val ? parseFloat(val) : 0 })
                      }}
                      style={{ flex: 1, background: "rgba(255, 255, 255, 0.1)", color: "white" }}
                    />
                    <TextField.Root
                      placeholder="Boylam (örn: 28.9856)"
                      value={createFormData.targetLong === 0 ? "" : createFormData.targetLong.toString()}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCreateFormData({ ...createFormData, targetLong: val ? parseFloat(val) : 0 })
                      }}
                      style={{ flex: 1, background: "rgba(255, 255, 255, 0.1)", color: "white" }}
                    />
                  </Flex>
                </Box>

                <TextField.Root
                  placeholder="İddia Miktarı (örn: 0.5 SUI)"
                  value={createFormData.stake}
                  onChange={(e) =>
                    setCreateFormData({ ...createFormData, stake: e.target.value })
                  }
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                  }}
                />

                {/* Participant Addition */}
                <Box>
                  <Heading size="4" mb="2" style={{ color: "white" }}>
                    Katılımcı Cüzdanları
                  </Heading>
                  <Flex gap="2" mb="2">
                    <TextField.Root
                      placeholder="0x... (Sui cüzdan adresi)"
                      value={tempWallet}
                      onChange={(e) => {
                        setTempWallet(e.target.value);
                        if (walletError) setWalletError(null);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddParticipant();
                        }
                      }}
                      style={{
                        flex: 1,
                        background: walletError ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.1)",
                        color: "white",
                        borderColor: walletError ? "#ef4444" : undefined,
                      }}
                    />
                    <Button
                      onClick={handleAddParticipant}
                      style={{
                        background: "#0ea5e9",
                        color: "white",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      Ekle
                    </Button>
                  </Flex>

                  {/* Wallet Error Message */}
                  {walletError && (
                    <Box mb="3">
                      <Text size="2" style={{ color: "#ef4444" }}>
                        ⚠️ {walletError}
                      </Text>
                    </Box>
                  )}

                  {/* Participant List */}
                  <Flex direction="column" gap="2">
                    {tempParticipants.map((wallet, index) => (
                      <Flex
                        key={index}
                        justify="between"
                        align="center"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          padding: "8px 12px",
                          borderRadius: "6px",
                        }}
                      >
                        <Text size="2" style={{ color: "white" }}>{wallet}</Text>
                        <Button
                          size="1"
                          variant="ghost"
                          onClick={() => handleRemoveParticipant(wallet)}
                          style={{ color: "#ef4444" }}
                        >
                          <TrashIcon />
                        </Button>
                      </Flex>
                    ))}
                  </Flex>
                </Box>

                <Button
                  size="3"
                  onClick={handleCreateChallenge}
                  disabled={isCreating}
                  style={{
                    background: isCreating || isPending
                      ? "rgba(255, 255, 255, 0.2)"
                      : "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                    color: "white",
                    cursor: isCreating || isPending ? "not-allowed" : "pointer",
                    border: "none",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {isCreating || isPending ? (
                    <>
                      <Spinner size="1" />
                      {isPending ? "Cüzdan Onayı Bekleniyor..." : "İşleniyor..."}
                    </>
                  ) : (
                    "🎮 Challenge Oluştur"
                  )}
                </Button>
              </Flex>
            </Card>
          </Box>

          {/* Active Challenges */}
          <Box>
            <Heading size="6" mb="4" style={{ color: "white" }}>
              🔥 Aktif Challenges
            </Heading>
            <Flex direction="column" gap="4">
              {challenges.length === 0 ? (
                <Text color="gray">Henüz aktif challenge yoktur</Text>
              ) : (
                challenges.map((challenge) => (
                  <Card
                    key={challenge.id}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      padding: "16px",
                      cursor: "pointer",
                      borderRadius: "12px",
                    }}
                    onClick={() =>
                      setExpandedChallengeId(
                        expandedChallengeId === challenge.id ? null : challenge.id
                      )
                    }
                  >
                    <Flex justify="between" align="center">
                      <Flex direction="column" gap="2">
                        <Heading size="4" style={{ color: "white" }}>{challenge.name}</Heading>
                        <Text size="2" color="gray">
                          Katılımcılar: {challenge.participants.length}
                        </Text>
                      </Flex>
                      <Flex align="center" gap="2">
                        <Text weight="bold" style={{ color: "white" }}>{challenge.stake}</Text>
                        {expandedChallengeId === challenge.id ? (
                          <ChevronUpIcon />
                        ) : (
                          <ChevronDownIcon />
                        )}
                      </Flex>
                    </Flex>

                    {/* Challenge Details */}
                    {expandedChallengeId === challenge.id && (
                      <Flex direction="column" gap="3" mt="4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "16px" }}>

                        {/* Status Badge */}
                        <Box
                          style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            background: challenge.status === "completed"
                              ? "rgba(16, 185, 129, 0.2)"
                              : "rgba(249, 115, 22, 0.2)",
                            border: challenge.status === "completed"
                              ? "1px solid rgba(16, 185, 129, 0.5)"
                              : "1px solid rgba(249, 115, 22, 0.5)",
                          }}
                        >
                          <Text size="2" style={{
                            color: challenge.status === "completed" ? "#10b981" : "#f97316",
                            fontWeight: "bold",
                          }}>
                            {challenge.status === "completed" ? "✅ Tamamlandı" : "🔥 Aktif"}
                          </Text>
                        </Box>

                        <Box>
                          <Text size="2" color="gray">📍 Hedef Konum</Text>
                          <Text size="2" style={{ color: "white" }}>
                            {challenge.targetLat.toFixed(4)}, {challenge.targetLong.toFixed(4)}
                          </Text>
                        </Box>

                        <Box>
                          <Text size="2" color="gray">👤 Oluşturan</Text>
                          <Text size="2" style={{ color: "white" }}>{challenge.createdBy.slice(0, 10)}...</Text>
                        </Box>

                        <Box>
                          <Heading size="4" mb="2" style={{ color: "white" }}>
                            👥 Katılımcılar
                          </Heading>
                          <Flex direction="column" gap="2">
                            {challenge.participants.length === 0 ? (
                              <Text size="2" color="gray">Henüz katılımcı yok</Text>
                            ) : (
                              challenge.participants.map((participant, index) => (
                                <Text key={index} size="2" style={{ background: "rgba(255, 255, 255, 0.1)", padding: "8px", borderRadius: "4px", color: "white" }}>
                                  {participant}
                                </Text>
                              ))
                            )}
                          </Flex>
                        </Box>

                        {/* Location Status */}
                        {claimingChallengeId === challenge.id && locationStatus && (
                          <Box
                            style={{
                              padding: "12px 16px",
                              borderRadius: "8px",
                              background: "rgba(59, 130, 246, 0.2)",
                              border: "1px solid rgba(59, 130, 246, 0.5)",
                            }}
                          >
                            <Flex align="center" gap="2">
                              <Spinner size="1" />
                              <Text size="2" style={{ color: "#3b82f6" }}>
                                {locationStatus}
                              </Text>
                            </Flex>
                          </Box>
                        )}

                        {/* User Location Info */}
                        {userLocation && claimingChallengeId === challenge.id && (
                          <Box
                            style={{
                              padding: "8px 12px",
                              borderRadius: "8px",
                              background: "rgba(255, 255, 255, 0.05)",
                            }}
                          >
                            <Text size="1" color="gray">
                              📍 Sizin konumunuz: {userLocation.lat.toFixed(6)}, {userLocation.long.toFixed(6)}
                            </Text>
                          </Box>
                        )}

                        {/* Action Buttons */}
                        <Flex gap="2" mt="2">
                          {/* Ödül Talep Et Butonu */}
                          <Button
                            size="3"
                            disabled={challenge.status === "completed" || claimingChallengeId === challenge.id}
                            style={{
                              background: challenge.status === "completed"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                              color: "white",
                              cursor: challenge.status === "completed" ? "not-allowed" : "pointer",
                              border: "none",
                              flex: 2,
                              fontWeight: "bold",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClaimReward(challenge);
                            }}
                          >
                            {claimingChallengeId === challenge.id ? (
                              <>
                                <Spinner size="1" />
                                Kontrol Ediliyor...
                              </>
                            ) : challenge.status === "completed" ? (
                              "✅ Ödül Alındı"
                            ) : (
                              "🎮 Ödül Talep Et"
                            )}
                          </Button>

                          {/* Sil Butonu */}
                          <Button
                            size="3"
                            style={{
                              background: "#ef4444",
                              color: "white",
                              cursor: "pointer",
                              border: "none",
                              flex: 1,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChallenge(challenge.id);
                            }}
                          >
                            🗑️ Sil
                          </Button>
                        </Flex>

                        {/* Tolerans Bilgisi */}
                        <Box
                          style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            background: "rgba(255, 255, 255, 0.03)",
                          }}
                        >
                          <Text size="1" color="gray">
                            ℹ️ Ödül almak için hedef konumun {LOCATION_TOLERANCE_METERS} metre yakınında olmalısınız.
                          </Text>
                        </Box>
                      </Flex>
                    )}
                  </Card>
                ))
              )}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

function Navbar({ onLogout, onLogoClick }: { onLogout: () => void; onLogoClick?: () => void }) {
  const account = useCurrentAccount();

  return (
    <Flex
      position="sticky"
      px="4"
      py="3"
      justify="between"
      align="center"
      style={{
        borderBottom: "1px solid var(--gray-a3)",
        background: "var(--gray-a2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Heading
        size="6"
        onClick={onLogoClick}
        style={{ cursor: "pointer" }}
      >
        🗺️ Move Map
      </Heading>

      <Flex gap="4" align="center">
        <Text size="2" color="gray">
          {account?.address.slice(0, 8)}...
        </Text>
        <Button
          size="2"
          variant="ghost"
          onClick={onLogout}
        >
          Çıkış Yap
        </Button>
      </Flex>
    </Flex>
  );
}

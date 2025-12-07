import { ConnectButton } from "@mysten/dapp-kit";
import { useCurrentAccount } from "@mysten/dapp-kit";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";

interface LandingPageProps {
  onGameClick?: () => void;
}

export function LandingPage({ onGameClick }: LandingPageProps) {
  const account = useCurrentAccount();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box>
          <Heading size="6" style={{ color: "white" }}>
            🗺️ Move Map
          </Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      {/* Main Content */}
      <Container size="4" style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: "40px", paddingBottom: "60px" }}>
        {/* Hero Section */}
        <Flex direction="column" gap="6" align="center" style={{ textAlign: "center" }}>
          <Heading
            size="9"
            style={{
              color: "white",
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            Buluşmalarınızı Blockchain ile Yönetin
          </Heading>

          <Text
            size="5"
            style={{
              color: "rgba(255, 255, 255, 0.95)",
              maxWidth: "700px",
              lineHeight: 1.6,
            }}
          >
            Move Map, arkadaş gruplarının buluşmalarını Sui blockchain üzerinde yöneten,
            GPS tabanlı konum doğrulaması ve akıllı ödül sistemi sunan Web3 uygulamasıdır.
          </Text>

          {/* How It Works Section */}
          <Box style={{ width: "100%", marginTop: "40px" }}>
            <Heading size="6" mb="4" style={{ color: "white" }}>
              📖 Nasıl Çalışır?
            </Heading>
            <Grid columns="4" gap="3">
              <Card style={{ background: "rgba(255, 255, 255, 0.05)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Flex direction="column" gap="2" align="center">
                  <Box style={{ fontSize: "36px" }}>1️⃣</Box>
                  <Text size="2" weight="bold" style={{ color: "white" }}>Challenge Oluştur</Text>
                  <Text size="1" style={{ color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
                    Buluşma yeri ve stake miktarını belirle
                  </Text>
                </Flex>
              </Card>
              <Card style={{ background: "rgba(255, 255, 255, 0.05)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Flex direction="column" gap="2" align="center">
                  <Box style={{ fontSize: "36px" }}>2️⃣</Box>
                  <Text size="2" weight="bold" style={{ color: "white" }}>Arkadaşları Ekle</Text>
                  <Text size="1" style={{ color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
                    Katılımcı cüzdan adreslerini gir
                  </Text>
                </Flex>
              </Card>
              <Card style={{ background: "rgba(255, 255, 255, 0.05)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Flex direction="column" gap="2" align="center">
                  <Box style={{ fontSize: "36px" }}>3️⃣</Box>
                  <Text size="2" weight="bold" style={{ color: "white" }}>Konuma Git</Text>
                  <Text size="1" style={{ color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
                    Belirtilen buluşma noktasına git
                  </Text>
                </Flex>
              </Card>
              <Card style={{ background: "rgba(255, 255, 255, 0.05)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Flex direction="column" gap="2" align="center">
                  <Box style={{ fontSize: "36px" }}>4️⃣</Box>
                  <Text size="2" weight="bold" style={{ color: "white" }}>Ödül Al</Text>
                  <Text size="1" style={{ color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
                    GPS doğrulaması ile ödülünü talep et
                  </Text>
                </Flex>
              </Card>
            </Grid>
          </Box>

          {/* Feature Cards */}
          <Box style={{ width: "100%", marginTop: "40px" }}>
            <Heading size="6" mb="4" style={{ color: "white" }}>
              ✨ Özellikler
            </Heading>
            <Grid columns="2" gap="4">
              {/* GPS Location Card */}
              <Card
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  backdropFilter: "blur(10px)",
                  padding: "24px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59, 130, 246, 0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Flex direction="column" gap="3">
                  <Box style={{ fontSize: "32px" }}>📍</Box>
                  <Heading size="4" style={{ color: "white" }}>
                    GPS Konum Doğrulaması
                  </Heading>
                  <Text
                    size="2"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.6,
                    }}
                  >
                    100 metre tolerans ile hassas konum kontrolü. Buluşma noktasında olduğunuzu kanıtlayın.
                  </Text>
                </Flex>
              </Card>

              {/* Sui Blockchain Card */}
              <Card
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  backdropFilter: "blur(10px)",
                  padding: "24px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(16, 185, 129, 0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Flex direction="column" gap="3">
                  <Box style={{ fontSize: "32px" }}>⛓️</Box>
                  <Heading size="4" style={{ color: "white" }}>
                    Sui Blockchain
                  </Heading>
                  <Text
                    size="2"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.6,
                    }}
                  >
                    Hızlı, güvenli ve düşük maliyetli işlemler. Tüm challenge'lar blockchain'de kayıtlı.
                  </Text>
                </Flex>
              </Card>

              {/* Smart Rewards Card */}
              <Card
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(249, 115, 22, 0.3)",
                  backdropFilter: "blur(10px)",
                  padding: "24px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(249, 115, 22, 0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Flex direction="column" gap="3">
                  <Box style={{ fontSize: "32px" }}>💰</Box>
                  <Heading size="4" style={{ color: "white" }}>
                    SUI Token Ödülleri
                  </Heading>
                  <Text
                    size="2"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.6,
                    }}
                  >
                    Zamanında gelen katılımcılar stake edilen SUI tokenlarını ödül olarak alır.
                  </Text>
                </Flex>
              </Card>

              {/* Wallet Integration Card */}
              <Card
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  backdropFilter: "blur(10px)",
                  padding: "24px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Flex direction="column" gap="3">
                  <Box style={{ fontSize: "32px" }}>👛</Box>
                  <Heading size="4" style={{ color: "white" }}>
                    Cüzdan Entegrasyonu
                  </Heading>
                  <Text
                    size="2"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.6,
                    }}
                  >
                    Sui Wallet, Suiet ve diğer Sui cüzdanlarla kolay bağlantı. Tek tıkla işlem onayı.
                  </Text>
                </Flex>
              </Card>
            </Grid>
          </Box>

          {/* Stats Section */}
          <Box style={{ width: "100%", marginTop: "40px" }}>
            <Grid columns="3" gap="4">
              <Card style={{ background: "rgba(16, 185, 129, 0.1)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                <Flex direction="column" align="center" gap="2">
                  <Text size="8" weight="bold" style={{ color: "#10b981" }}>100m</Text>
                  <Text size="2" style={{ color: "rgba(255,255,255,0.8)" }}>GPS Toleransı</Text>
                </Flex>
              </Card>
              <Card style={{ background: "rgba(59, 130, 246, 0.1)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                <Flex direction="column" align="center" gap="2">
                  <Text size="8" weight="bold" style={{ color: "#3b82f6" }}>~0.01</Text>
                  <Text size="2" style={{ color: "rgba(255,255,255,0.8)" }}>SUI Gas Fee</Text>
                </Flex>
              </Card>
              <Card style={{ background: "rgba(249, 115, 22, 0.1)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(249, 115, 22, 0.3)" }}>
                <Flex direction="column" align="center" gap="2">
                  <Text size="8" weight="bold" style={{ color: "#f97316" }}>Web3</Text>
                  <Text size="2" style={{ color: "rgba(255,255,255,0.8)" }}>Merkeziyetsiz</Text>
                </Flex>
              </Card>
            </Grid>
          </Box>

          {/* Action Buttons */}
          <Flex gap="4" direction="column" align="center" style={{ width: "100%", marginTop: "40px" }}>
            {!account && (
              <Box style={{ textAlign: "center" }}>
                <Text size="3" mb="3" style={{ color: "rgba(255,255,255,0.8)", display: "block", marginBottom: "12px" }}>
                  Başlamak için cüzdanınızı bağlayın 👇
                </Text>
                <ConnectButton />
              </Box>
            )}

            {account && (
              <Flex direction="column" gap="3" align="center" style={{ width: "100%" }}>
                <Box
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <Text size="2" style={{ color: "#10b981" }}>
                    ✅ Cüzdan bağlı: {account.address.slice(0, 8)}...{account.address.slice(-6)}
                  </Text>
                </Box>
                <Button
                  size="4"
                  onClick={onGameClick}
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: "400px",
                    padding: "16px 32px",
                    border: "none",
                    fontSize: "18px",
                  }}
                >
                  🚀 Uygulamaya Gir
                </Button>
              </Flex>
            )}
          </Flex>

          {/* Footer Info */}
          <Box style={{ marginTop: "40px", textAlign: "center" }}>
            <Text size="1" style={{ color: "rgba(255,255,255,0.5)" }}>
              Move Map — Sui Blockchain üzerinde çalışan merkeziyetsiz buluşma uygulaması
            </Text>
          </Box>
        </Flex>
      </Container>
    </div>
  );
}

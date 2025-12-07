import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

interface GroupManagementDetailPageProps {
  onBack: () => void;
}

export function GroupManagementDetailPage({ onBack }: GroupManagementDetailPageProps) {
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
        py="3"
        justify="between"
        align="center"
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <Heading size="6" style={{ color: "white" }}>
          🔒 Lock Friend
        </Heading>
        <Button
          onClick={onBack}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            cursor: "pointer",
          }}
        >
          ← Geri
        </Button>
      </Flex>

      {/* Main Content */}
      <Container size="3" py="8">
        <Flex direction="column" gap="6">
          <Box>
            <Flex align="center" gap="3" mb="4">
              <Box style={{ fontSize: "48px" }}>👥</Box>
              <Heading size="8" style={{ color: "white" }}>
                Grup Yönetimi
              </Heading>
            </Flex>
            <Text
              size="5"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.8,
              }}
            >
              Lock Friend ile arkadaş gruplarınızı kolayca yönetin, challenge oluşturun ve herkesi disipline edin.
            </Text>
          </Box>

          <Box
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              padding: "24px",
              borderRadius: "12px",
            }}
          >
            <Heading size="5" style={{ color: "#a78bfa", marginBottom: "12px" }}>
              Temel Özellikler
            </Heading>
            <Text
              size="3"
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 2,
              }}
            >
              • <strong>Challenge Oluştur:</strong> Buluşma yeri ve saati belirleyerek challenge başlat<br/>
              • <strong>Katılımcı Yönetimi:</strong> Cüzdan adreslerini girerek katılımcı ekle<br/>
              • <strong>Para Kilitleme:</strong> Herkes belirtilen miktarı kilitler<br/>
              • <strong>Sonuçları Takip Et:</strong> Kim zamanında geldi, kim geç kaldı görebilirsin<br/>
              • <strong>Ödülleri Dağıt:</strong> Sistem otomatik olarak ödülleri dağıtır
            </Text>
          </Box>

          <Box>
            <Heading size="5" style={{ color: "white", marginBottom: "16px" }}>
              Nasıl Kullanılır?
            </Heading>
            <Flex direction="column" gap="3">
              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #a78bfa",
                }}
              >
                <Heading size="4" style={{ color: "#a78bfa" }}>
                  1️⃣ Challenge Adı Belirle
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Challenge'a anlamlı bir ad verin. Örneğin: "Cuma Akşamı Taksim Buluşması"
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #a78bfa",
                }}
              >
                <Heading size="4" style={{ color: "#a78bfa" }}>
                  2️⃣ Konum Belirle
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Enlem ve Boylam koordinatlarını girin. GPS tarafından konum doğrulama yapılacak.
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #a78bfa",
                }}
              >
                <Heading size="4" style={{ color: "#a78bfa" }}>
                  3️⃣ Stake Miktarı Belirle
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Her katılımcının kaç SUI kilitleyeceğini belirle. Örneğin: 0.5 SUI
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #a78bfa",
                }}
              >
                <Heading size="4" style={{ color: "#a78bfa" }}>
                  4️⃣ Katılımcıları Ekle
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Arkadaşlarının Sui cüzdan adreslerini girerek onları challenge'a davet et.
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #a78bfa",
                }}
              >
                <Heading size="4" style={{ color: "#a78bfa" }}>
                  5️⃣ Challenge Başlat
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Challenge'ı oluştur ve tüm katılımcılara bildir. Herkes bunu hazır mısın bilsin.
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Heading size="5" style={{ color: "white", marginBottom: "16px" }}>
              Örnek Senaryo
            </Heading>
            <Box
              style={{
                background: "rgba(249, 115, 22, 0.1)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <Text
                size="3"
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 2,
                }}
              >
                <strong>Grup:</strong> "Cuma Akşamı Arkadaşları" (Ali, Ayşe, Mehmet, Fatma)<br/>
                <br/>
                <strong>Challenge:</strong> Taksim'de buluşma, saat 19:00<br/>
                <strong>Konum:</strong> 41.0373 N, 28.9856 E<br/>
                <strong>Stake:</strong> Her biri 0.5 SUI (toplam 2 SUI)<br/>
                <br/>
                <strong>Sonuç:</strong> Ali, Ayşe ve Mehmet 19:00'de vardı. Fatma 30 dakika geç geldi.<br/>
                <strong>Otomatik Ödüllendirme:</strong> Zamanında gelenler 0.65 SUI, Fatma 0 SUI aldı.<br/>
                <strong>Dersi:</strong> Fatma: "Bir daha geç gelmem!"
              </Text>
            </Box>
          </Box>

          <Button
            onClick={onBack}
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              padding: "12px 32px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              marginTop: "32px",
            }}
          >
            ← Anasayfaya Dön
          </Button>
        </Flex>
      </Container>
    </div>
  );
}

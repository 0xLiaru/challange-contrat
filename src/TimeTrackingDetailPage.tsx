import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

interface TimeTrackingDetailPageProps {
  onBack: () => void;
}

export function TimeTrackingDetailPage({ onBack }: TimeTrackingDetailPageProps) {
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
              <Box style={{ fontSize: "48px" }}>⏰</Box>
              <Heading size="8" style={{ color: "white" }}>
                Zaman Takibi
              </Heading>
            </Flex>
            <Text
              size="5"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.8,
              }}
            >
              GPS teknolojisi ile kesin konum doğrulaması yaparak kim zamanında geldiğini ve kim geç kaldığını belirler.
            </Text>
          </Box>

          <Box
            style={{
              background: "rgba(249, 115, 22, 0.1)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
              padding: "24px",
              borderRadius: "12px",
            }}
          >
            <Heading size="5" style={{ color: "#f97316", marginBottom: "12px" }}>
              GPS Doğrulama Nasıl Çalışır?
            </Heading>
            <Text
              size="3"
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 2,
              }}
            >
              1. Challenge saati başladığında, katılımcılar uygulamada "Reward Talebi" butonuna tıklarlar.<br/>
              2. Uygulama cihazın GPS konumunu alır.<br/>
              3. GPS konumu belirtilen hedef konumu ile karşılaştırılır.<br/>
              4. Eğer kişi 50-60 metre içinde ise "zamanında" olarak kaydedilir.<br/>
              5. Farklı bir konumda ise talep reddedilir.<br/>
              6. Sistem otomatik olarak ödülleri dağıtır.
            </Text>
          </Box>

          <Box>
            <Heading size="5" style={{ color: "white", marginBottom: "16px" }}>
              Hassasiyet ve Güvenlik
            </Heading>
            <Flex direction="column" gap="3">
              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #f97316",
                }}
              >
                <Heading size="4" style={{ color: "#f97316" }}>
                  📍 50-60m Tolerans Alanı
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  GPS'nin doğal hatası göz önüne alınarak, 50-60 metre içinde olan herkes zamanında sayılır.
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #f97316",
                }}
              >
                <Heading size="4" style={{ color: "#f97316" }}>
                  🔒 Özel Bir Şey Açıklanmaz
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Cihazınızın GPS konumu yalnızca doğrulama için kullanılır, hiçbir yerde kaydedilmez.
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #f97316",
                }}
              >
                <Heading size="4" style={{ color: "#f97316" }}>
                  🚫 Sahte Konum Engelleme
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Sistem sahte konumu tespit etmeye çalışır. İşletim sistemi izni olmadan GPS sıklaştırılamaz.
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #f97316",
                }}
              >
                <Heading size="4" style={{ color: "#f97316" }}>
                  ⏱️ Zaman Aşımı Koruması
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Challenge saatinden sonra belirli bir süre içinde GPS doğrulaması yapılması gerekir.
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Heading size="5" style={{ color: "white", marginBottom: "16px" }}>
              Uygulamada Kullanım
            </Heading>
            <Box
              style={{
                background: "rgba(6, 182, 212, 0.1)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
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
                <strong>Adım 1:</strong> Challenge'ın başlama saati geldiğinde, uygulamayı açarsınız.<br/>
                <br/>
                <strong>Adım 2:</strong> "🎮 Reward Talebi" butonuna tıklarsınız.<br/>
                <br/>
                <strong>Adım 3:</strong> Uygulama konumunuzu ister.<br/>
                <br/>
                <strong>Adım 4:</strong> Eğer doğru konumda iseniz, işlem onaylanır ve cüzdanınızda ödül görünür.<br/>
                <br/>
                <strong>Adım 5:</strong> Eğer yanlış konumda iseniz, hata mesajı alırsınız.
              </Text>
            </Box>
          </Box>

          <Box>
            <Heading size="5" style={{ color: "white", marginBottom: "16px" }}>
              Gerçek Hayat Örnekleri
            </Heading>
            <Flex direction="column" gap="2">
              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                <Text style={{ color: "#10b981" }}>
                  ✓ <strong>Başarı:</strong> Ali tam Taksim'de olduğu için ödülünü almış.
                </Text>
              </Box>
              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                <Text style={{ color: "#ef4444" }}>
                  ✗ <strong>Başarısız:</strong> Mehmet 200 metre uzakta olduğu için ödülü alamadı.
                </Text>
              </Box>
              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                <Text style={{ color: "#f59e0b" }}>
                  ⏱️ <strong>Gecikmiş:</strong> Ayşe 30 dakika sonra geldi, ödülü azalmış.
                </Text>
              </Box>
            </Flex>
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

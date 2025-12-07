import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

interface BlockchainSecurityDetailPageProps {
  onBack: () => void;
}

export function BlockchainSecurityDetailPage({ onBack }: BlockchainSecurityDetailPageProps) {
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
              <Box style={{ fontSize: "48px" }}>🔐</Box>
              <Heading size="8" style={{ color: "white" }}>
                Blockchain Güvenliği
              </Heading>
            </Flex>
            <Text
              size="5"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.8,
              }}
            >
              Lock Friend, Sui blockchain üzerine inşa edilen tamamen merkezi olmayan bir protokoldür. Verileriniz güvende, işlemleri şeffaf.
            </Text>
          </Box>

          <Box
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              padding: "24px",
              borderRadius: "12px",
            }}
          >
            <Heading size="5" style={{ color: "#10b981", marginBottom: "12px" }}>
              Neden Sui Blockchain?
            </Heading>
            <Text
              size="3"
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 2,
              }}
            >
              • <strong>Hızlı İşlemler:</strong> Saniyeler içinde işlemler tamamlanır<br/>
              • <strong>Düşük Maliyetler:</strong> Gas ücretleri çok düşüktür<br/>
              • <strong>Merkezi Olmayan:</strong> Hiçbir merkezi otorite tarafından kontrol edilmez<br/>
              • <strong>Güvenli:</strong> Move dilinde yazılan akıllı kontratlar, Rust benzeri güvenlik özellikleri sunar
            </Text>
          </Box>

          <Box>
            <Heading size="5" style={{ color: "white", marginBottom: "16px" }}>
              Güvenlik Özellikleri
            </Heading>
            <Flex direction="column" gap="3">
              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <Heading size="4" style={{ color: "#10b981" }}>
                  🔏 Kriptografik İmzalar
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Her işlem kriptografik imzalarla doğrulanır. Sahte işlem yapılamaz.
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <Heading size="4" style={{ color: "#10b981" }}>
                  ⛓️ Blockchain Tarafından Doğrulama
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Tüm işlemler binlerce doğrulayıcı (validator) tarafından kontrol edilir.
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <Heading size="4" style={{ color: "#10b981" }}>
                  📝 Değişmez Kayıt
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Blockchain'e yazıldıktan sonra hiçbir şey değiştirilemez veya silinmez.
                </Text>
              </Box>

              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <Heading size="4" style={{ color: "#10b981" }}>
                  🔓 Özel Anahtar Kontrolü
                </Heading>
                <Text style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: "8px" }}>
                  Sizin özel anahtarınız yalnızca sizin kontrolünüzdedir. Hiç kimse sizin parasına erişemez.
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Heading size="5" style={{ color: "white", marginBottom: "16px" }}>
              Şeffaflık ve Kontrol
            </Heading>
            <Box
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
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
                Lock Friend'de tüm işlemler açık bir şekilde blockchain'de kaydedilir. Herhangi birinin:<br/>
                <br/>
                ✓ Ne zaman challenge oluşturulduğunu<br/>
                ✓ Kim katılmış olduğunu<br/>
                ✓ Kaç para kilitlendiğini<br/>
                ✓ Kim zamanında geldiğini<br/>
                ✓ Cezaların nasıl dağıtıldığını<br/>
                <br/>
                ...görmesi ve doğrulaması mümkündür. Tamamen şeffaf bir sistem.
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

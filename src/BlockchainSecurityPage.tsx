import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface BlockchainSecurityPageProps {
  onBack: () => void;
}

export function BlockchainSecurityPage({ onBack }: BlockchainSecurityPageProps) {
  return (
    <Box style={{ minHeight: "100vh", background: "var(--gray-1)" }}>
      {/* Header */}
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
        <Button
          variant="ghost"
          size="2"
          onClick={onBack}
        >
          <ArrowLeftIcon width="20" height="20" />
          Geri Dön
        </Button>
        <Heading size="6">🔒 Blockchain Güvenliği</Heading>
        <Box style={{ width: "40px" }} />
      </Flex>

      {/* Main Content */}
      <Container size="3" py="6">
        <Flex direction="column" gap="8">
          {/* Introduction */}
          <Box>
            <Heading size="5" mb="3">
              Blockchain Güvenliği Nedir?
            </Heading>
            <Text size="4" style={{ lineHeight: "1.8", color: "var(--gray-11)" }}>
              Lock Friend, tüm ceza ve ödül işlemlerini Sui blockchain'i üzerinde gerçekleştirerek en yüksek seviye güvenlik sağlar. Blockchain, merkezi bir yetkiliye ihtiyaç duymaksızın işlemleri şeffaf, değiştirilemez ve doğrulanabilir hale getirir.
            </Text>
          </Box>

          {/* What is Blockchain */}
          <Box>
            <Heading size="5" mb="3">
              Blockchain Nedir?
            </Heading>
            <Box
              style={{
                padding: "20px",
                background: "var(--gray-a3)",
                borderRadius: "8px",
                border: "1px solid var(--gray-a4)",
              }}
            >
              <Text size="3" style={{ lineHeight: "1.8", color: "var(--gray-11)" }} mb="3">
                Blockchain, dağıtılmış bir defter teknolojisidir. İşlemler "bloklar"a yazılır ve bu bloklar matematiksel olarak bir zincirde birbirine bağlanır. Her blok, önceki bloğun özet bilgisini (hash) içerir, bu da değiştirmeyi imkansız hale getirir.
              </Text>
              <Text size="3" style={{ lineHeight: "1.8", color: "var(--gray-11)" }}>
                <strong>Basit Açıklama:</strong> Bir defter sayfasına işlem yazarsınız. Sayfayı koyun, mühürleyin, ve artık değiştiremezsiniz. Hatta onu değiştirmeye çalışsanız, herkes fark eder çünkü mühür bozulur.
              </Text>
            </Box>
          </Box>

          {/* Why Blockchain for Lock Friend */}
          <Box>
            <Heading size="5" mb="3">
              Neden Lock Friend'de Blockchain Kullanıyoruz?
            </Heading>
            <Flex direction="column" gap="3">
              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  🔐
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Taklit Edilemez</Heading>
                  <Text size="3" color="gray">
                    Bir kez blockchain'e kaydedildikten sonra, hiç kimse işlemleri değiştiremez veya silemez
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  ✅
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Şeffaf ve Doğrulanabilir</Heading>
                  <Text size="3" color="gray">
                    Tüm işlemler herkes tarafından görülebilir ve doğrulanabilir
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  ⚡
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Hızlı ve Ucuz</Heading>
                  <Text size="3" color="gray">
                    Sui blockchain çok hızlı işlem hızına ve düşük ücretlere sahip
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  🌍
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Merkezi Olmayan</Heading>
                  <Text size="3" color="gray">
                    Hiçbir merkez, banka veya şirket kontrolünde değildir. Siz kontrol edersiniz
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>

          {/* Security Features */}
          <Box>
            <Heading size="5" mb="3">
              Lock Friend'in Güvenlik Özellikleri
            </Heading>
            <Flex direction="column" gap="4">
              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  borderRadius: "8px",
                  border: "1px solid var(--gray-a4)",
                }}
              >
                <Heading size="4" mb="2">
                  1️⃣ Kriptografik Hash
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Her işlem bir matematiksel "parmak izi" (hash) alır. Bu parmak izi öyle karmaşıktır ki, bir kelimeyi değiştirsen bile parmak izi tamamen farklı olur. Herkes bunu görebilir ve "burası değiştirilmiş" diye anlayabilir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  borderRadius: "8px",
                  border: "1px solid var(--gray-a4)",
                }}
              >
                <Heading size="4" mb="2">
                  2️⃣ Blok Zinciri
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Her blok kendinden sonraki bloğun hash'ini içerir. Bir bloğu değiştirmeye çalışsanız, tüm sonraki bloklar bozulur. Bu da değiştirmeyi imkansız hale getirir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  borderRadius: "8px",
                  border: "1px solid var(--gray-a4)",
                }}
              >
                <Heading size="4" mb="2">
                  3️⃣ Dağıtılmış Ağ
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Blockchain binlerce bilgisayarda kopya olarak çalışır. Bir bilgisayarı hack'lesek bile, diğer binlercesi doğruyu barındırır. Hacker'ın hepsiyi aynı anda hack'lemesi imkansızdır.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  borderRadius: "8px",
                  border: "1px solid var(--gray-a4)",
                }}
              >
                <Heading size="4" mb="2">
                  4️⃣ Fikir Birliği Mekanizması (Consensus)
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Yeni işlemler ancak ağdaki çoğunluğu onayladıktan sonra blockchain'e eklenir. Birkaç hacker'ın çoğunluğu aldaması imkansızdır çünkü binlerce node vardır.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  borderRadius: "8px",
                  border: "1px solid var(--gray-a4)",
                }}
              >
                <Heading size="4" mb="2">
                  5️⃣ Kriptografik İmzalar
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Her işlem cüzdan sahibinin özel anahtarı ile imzalanır. Bu imza, işlemin gerçekten o kişi tarafından yapıldığını kanıtlar. Sadece sizin özel anahtarla işlem yapılabilir.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Sui Blockchain Advantages */}
          <Box>
            <Heading size="5" mb="3">
              Neden Sui Blockchain?
            </Heading>
            <Box
              style={{
                padding: "20px",
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.2)",
              }}
            >
              <Flex direction="column" gap="4">
                <Box>
                  <Heading size="4" mb="2">
                    ⚡ Yüksek Hız
                  </Heading>
                  <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                    Sui blockchain saniyede binlerce işlemi işleyebilir. Bitcoin saniyede 7 işlem, Ethereum 15 işlem yapabilirse, Sui 10.000+ işlem yapabilir!
                  </Text>
                </Box>

                <Box>
                  <Heading size="4" mb="2">
                    💰 Düşük Ücretler
                  </Heading>
                  <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                    Her işlem milyarda bir dolardan az maliyetli. Bu da grup işlemleri çok ucuz hale getiriyor.
                  </Text>
                </Box>

                <Box>
                  <Heading size="4" mb="2">
                    🛡️ Güvenli Mimarı
                  </Heading>
                  <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                    Sui, Move programlama dilini kullanır. Bu dil blockchain için özel tasarlanmış ve güvenlik açığına karşı korumalıdır.
                  </Text>
                </Box>

                <Box>
                  <Heading size="4" mb="2">
                    🌐 Geleceğin Blockchain'i
                  </Heading>
                  <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                    Meta (Facebook) ve diğer büyük şirketler tarafından geliştirilmiş. Endüstri standardı olma yolunda.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Box>

          {/* Security Comparison */}
          <Box>
            <Heading size="5" mb="3">
              Geleneksel Sistem vs Blockchain
            </Heading>
            <Box
              style={{
                overflowX: "auto",
                padding: "16px",
                background: "var(--gray-a3)",
                borderRadius: "8px",
              }}
            >
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--gray-a6)" }}>
                    <th style={{ padding: "12px", textAlign: "left", color: "var(--gray-11)" }}>Özellik</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "var(--gray-11)" }}>Geleneksel Sistem</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "var(--gray-11)" }}>Blockchain</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--gray-a4)" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>Merkezi Kontrol</td>
                    <td style={{ padding: "12px" }}>Evet (Banka/Şirket)</td>
                    <td style={{ padding: "12px" }}>Hayır (Dağıtılmış)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--gray-a4)" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>Değiştirilebilirlik</td>
                    <td style={{ padding: "12px" }}>Kolay (Yönetici değiştirebilir)</td>
                    <td style={{ padding: "12px" }}>Neredeyse İmkansız</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--gray-a4)" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>Şeffaflık</td>
                    <td style={{ padding: "12px" }}>Sınırlı</td>
                    <td style={{ padding: "12px" }}>Tam Şeffaf</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--gray-a4)" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>Hız</td>
                    <td style={{ padding: "12px" }}>Orta (Çalışma saatleri)</td>
                    <td style={{ padding: "12px" }}>Çok Hızlı (24/7)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--gray-a4)" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>Ücret</td>
                    <td style={{ padding: "12px" }}>Yüksek</td>
                    <td style={{ padding: "12px" }}>Çok Düşük</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>Kesintisiz Hizmet</td>
                    <td style={{ padding: "12px" }}>Sorulara Bağlı</td>
                    <td style={{ padding: "12px" }}>Garantili</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>

          {/* Common Misconceptions */}
          <Box>
            <Heading size="5" mb="3">
              Yaygın Yanılgılar
            </Heading>
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="4" mb="2">
                  ❌ "Blockchain tamamen anonim midir?"
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  ✅ <strong>Hayır.</strong> Blockchain psödonym'dir. Cüzdan adresi görünür ancak kişi kimliği gizli kalabilir. Lock Friend'de ise kimlik doğrulandığı için daha şeffaftır.
                </Text>
              </Box>

              <Box>
                <Heading size="4" mb="2">
                  ❌ "Blockchain'e kaydedilen veriler silinemiyor mu?"
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  ✅ <strong>Doğru.</strong> Blockchain'deki veriler kalıcıdır. Bu, işlemlerin güvenliğini sağlar ama aynı zamanda sorumluluk da getirir.
                </Text>
              </Box>

              <Box>
                <Heading size="4" mb="2">
                  ❌ "Blockchain tamamen hacklenmiş midir?"
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  ✅ <strong>Hayır.</strong> Blockchain'in kendisi çok güvenlidir. Ama cüzdan yönetimi veya kullanıcı hatası riskler oluşturabilir. Lock Friend bu riskleri en aza indirir.
                </Text>
              </Box>

              <Box>
                <Heading size="4" mb="2">
                  ❌ "Blockchain çok yavaş ve pahalı mıdır?"
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  ✅ <strong>Eski blockchainler için doğru, yeni olanlar için hayır.</strong> Sui gibi yeni nesil blockchainler çok hızlı ve ucuzdur. Bitcoin ve Ethereum pahalıdır, Sui değildir.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Security Best Practices */}
          <Box>
            <Heading size="5" mb="3">
              Lock Friend'de Güvenliğinizi Nasıl Korumalısınız
            </Heading>
            <Flex direction="column" gap="3">
              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  🔑
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Özel Anahtarınızı Saklayın</Heading>
                  <Text size="3" color="gray">
                    Özel anahtarınızı hiç kimseyle paylaşmayın. Bunun eşdeğeri cüzdanınızın PIN'idir
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  💻
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Güvenli Cüzdan Kullanın</Heading>
                  <Text size="3" color="gray">
                    Sui Wallet veya Mysten Labs tarafından önerilen cüzdanları kullanın
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  ✔️
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">İşlemleri Kontrol Edin</Heading>
                  <Text size="3" color="gray">
                    Onaylamadan önce işlem detaylarını her zaman kontrol edin
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  🌐
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Resmi Siteyi Kullanın</Heading>
                  <Text size="3" color="gray">
                    Sahte sitelere dikkat edin. Bookmark'leyin ve oradan girin
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  📱
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">2FA Etkinleştirin</Heading>
                  <Text size="3" color="gray">
                    Eğer cüzdan sağlayıcısı sunuyorsa, 2FA etkinleştirin
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>

          {/* Conclusion */}
          <Box
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Heading size="4" style={{ color: "white", marginBottom: "12px" }}>
              Güvende Kalın, Rahat Oynayın
            </Heading>
            <Text size="3" style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "16px" }}>
              Lock Friend'in blockchain teknolojisi sayesinde, paranız güvende ve tüm işlemler şeffaftır. Grup yönetiminde endişe duymayın, sistem sizi korur.
            </Text>
            <Button
              onClick={onBack}
              style={{
                background: "white",
                color: "#667eea",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Geri Dön
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface SmartPenaltyPageProps {
  onBack: () => void;
}

export function SmartPenaltyPage({ onBack }: SmartPenaltyPageProps) {
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
        <Heading size="6">🔒 Akıllı Ceza Sistemi</Heading>
        <Box style={{ width: "40px" }} />
      </Flex>

      {/* Main Content */}
      <Container size="3" py="6">
        <Flex direction="column" gap="8">
          {/* Introduction */}
          <Box>
            <Heading size="5" mb="3">
              Akıllı Ceza Sistemi Nedir?
            </Heading>
            <Text size="4" style={{ lineHeight: "1.8", color: "var(--gray-11)" }}>
              Lock Friend'in kalbi olan akıllı ceza sistemi, arkadaş gruplarının buluşmalara zamanında gelme disiplinini sağlamak için blockchain teknolojisini kullanır. Geç gelenler ceza öder, zamanında gelenler ise bu cezaları ödül olarak kazanırlar.
            </Text>
          </Box>

          {/* How It Works */}
          <Box>
            <Heading size="5" mb="3">
              Nasıl Çalışır?
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
                  1️⃣ Grup Kurulumu
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Bir grup oluştururken, buluşma saati ve ceza miktarını belirlersiniz. Örneğin, "Cuma 19:00'de buluşacağız ve geç gelenler 5 SUI ceza ödeckler" şeklinde.
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
                  2️⃣ Üye Katılımı
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Grup üyeleri gruba katılır ve cüzdanlarını bağlarlar. Tüm işlemler blockchain üzerinde güvenli bir şekilde kaydedilir.
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
                  3️⃣ Buluşma Zamanında Kontrol
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Buluşma saati geldiğinde, uygulamada check-in yapılır. Konum doğrulaması yapılarak katılımcıların gerçekten buluşma yerinde olduğu kontrol edilir.
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
                  4️⃣ Otomatik Ceza Dağıtımı
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Buluşma saati kapandıktan sonra:
                  <br />• <strong>Zamanında Gelenler:</strong> Ceza miktarını ödül olarak kazanırlar
                  <br />• <strong>Geç Gelenler:</strong> Belirlenen cezayı öderler
                  <br />• <strong>Katılmayanlar:</strong> Ceza miktarının iki katını öderler
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Example */}
          <Box>
            <Heading size="5" mb="3">
              Örnek Senaryo
            </Heading>
            <Box
              style={{
                padding: "20px",
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.2)",
              }}
            >
              <Heading size="4" mb="3">
                Cuma Buluşmaları
              </Heading>
              <Text size="3" style={{ lineHeight: "1.8", color: "var(--gray-11)" }} mb="3">
                <strong>Ayarlar:</strong> Buluşma Saati: Cuma 19:00 | Ceza: 5 SUI | Üye Sayısı: 5
              </Text>
              <Text size="3" style={{ lineHeight: "1.8", color: "var(--gray-11)" }} mb="3">
                <strong>Sonuç:</strong>
                <br />• Ahmet (19:00 de geldi): +5 SUI kazandı ✅
                <br />• Mehmet (19:15 te geldi): -5 SUI ceza önerdi ❌
                <br />• Ayşe (18:50 de geldi): +5 SUI kazandı ✅
                <br />• Fatih (Gelmedi): -10 SUI ceza önerdi ❌
                <br />• Zeynep (19:05 te geldi): +5 SUI kazandı ✅
              </Text>
              <Text size="3" style={{ lineHeight: "1.8", color: "var(--gray-11)" }}>
                <strong>Toplam Kilitli Para:</strong> 10 SUI (Mehmet ve Fatih'in cezaları)
              </Text>
            </Box>
          </Box>

          {/* Benefits */}
          <Box>
            <Heading size="5" mb="3">
              Akıllı Ceza Sisteminin Avantajları
            </Heading>
            <Flex direction="column" gap="3">
              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  ✨
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Otomatik ve Şeffaf</Heading>
                  <Text size="3" color="gray">
                    Tüm işlemler blockchain üzerinde kaydedilir, kimse değiştiremez
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  💪
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Disiplin Sağlar</Heading>
                  <Text size="3" color="gray">
                    Gerçek parayla ilgili olduğu için insanlar zamanında gelmeyi daha ciddiye alırlar
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  🎁
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Ödüllendirici</Heading>
                  <Text size="3" color="gray">
                    Zamanında gelenler sadece ceza yemekle kalmaz, para da kazanırlar
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  🔒
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Güvenli</Heading>
                  <Text size="3" color="gray">
                    Sui blockchain'in güvenliği ve hızı ile işlemler anlık gerçekleşir
                  </Text>
                </Flex>
              </Box>

              <Box style={{ display: "flex", gap: "12px" }}>
                <Text size="5" style={{ minWidth: "24px" }}>
                  🌍
                </Text>
                <Flex direction="column" gap="1">
                  <Heading size="4">Küresel Erişim</Heading>
                  <Text size="3" color="gray">
                    Herhangi bir ülkede, herhangi bir zaman diliminde çalışır
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>

          {/* Penalty Distribution */}
          <Box>
            <Heading size="5" mb="3">
              Ceza Dağıtım Mantığı
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
                Cezalar otomatik olarak şu şekilde dağıtılır:
              </Text>
              <Text size="3" style={{ lineHeight: "1.8", color: "var(--gray-11)" }} mb="2">
                <strong>Zamanında Gelenler İçin:</strong>
                <br />
                Dağıtılacak ödül = (Geç Gelenlerin Cezaları + Katılmayanların Cezaları) / Zamanında Gelenler Sayısı
              </Text>
              <Text size="3" style={{ lineHeight: "1.8", color: "var(--gray-11)" }}>
                <strong>Örnek:</strong> 5 kişi buluşacak, 2 kişi geç gelse (her biri 5 SUI = toplam 10 SUI)
                <br />
                Zamanında 3 kişi geldiyse, her biri 10 ÷ 3 = 3.33 SUI bonus kazanır
              </Text>
            </Box>
          </Box>

          {/* Rules */}
          <Box>
            <Heading size="5" mb="3">
              Önemli Kurallar
            </Heading>
            <Flex direction="column" gap="2">
              <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                • Buluşma saati grupta belirlenir ve değiştirilemez
              </Text>
              <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                • Ceza miktarı grup yöneticisi tarafından ayarlanabilir (ancak buluşmadan önce)
              </Text>
              <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                • Konum doğrulaması yapılmayan check-in'ler geçersiz sayılır
              </Text>
              <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                • Tüm işlemler blockchain üzerinde kalıcı olarak kaydedilir
              </Text>
              <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                • Üyeler istediği zaman gruptan ayrılabilir (yalnızca sonraki buluşmadan itibaren)
              </Text>
            </Flex>
          </Box>

          {/* FAQ */}
          <Box>
            <Heading size="5" mb="3">
              Sıkça Sorulan Sorular
            </Heading>
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="4" mb="2">
                  Paran nereye gidiyor?
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Geç gelen veya katılmayan kişilerin cezaları otomatik olarak zamanında gelen kişilere dağıtılır. Hiçbir para kaybolmaz veya harcamazdan gider.
                </Text>
              </Box>

              <Box>
                <Heading size="4" mb="2">
                  Gruptan ayrılırsam ne olur?
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Gruptan ayrıldıktan sonra o grup için artık ceza veya ödül almaz. Ancak önceki buluşmalardan alacağınız/ödeyeceğiniz cezalar elinizdedir.
                </Text>
              </Box>

              <Box>
                <Heading size="4" mb="2">
                  Harita göstererek kandırabilir miyim?
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Hayır! Konum doğrulaması GPS ve blockchain teknolojisini birlikte kullanır, spoofing imkansızdır.
                </Text>
              </Box>

              <Box>
                <Heading size="4" mb="2">
                  Minimum/Maksimum ceza var mı?
                </Heading>
                <Text size="3" style={{ lineHeight: "1.6", color: "var(--gray-11)" }}>
                  Hayır, tamamen size kalmış. 0.1 SUI ile başlayabilir veya 100 SUI ayarlayabilirsiniz. Grup yöneticisi kararı önemlidir.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* CTA */}
          <Box
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Heading size="4" style={{ color: "white", marginBottom: "12px" }}>
              Haydi Başlayalım!
            </Heading>
            <Text size="3" style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "16px" }}>
              Lock Friend ile arkadaş gruplarının zamanında gelme disiplinini sağlayın ve eğlenceli bir sistem kurun.
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

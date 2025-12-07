import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface GroupManagementPageProps {
  onBack: () => void;
}

export function GroupManagementPage({ onBack }: GroupManagementPageProps) {
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
          top: 0,
          zIndex: 100,
        }}
      >
        <Button
          size="2"
          variant="ghost"
          onClick={onBack}
          style={{ cursor: "pointer" }}
        >
          <ArrowLeftIcon width="20" height="20" />
        </Button>
        <Heading size="6">👥 Grup Yönetimi</Heading>
        <Box style={{ width: "32px" }} />
      </Flex>

      {/* Main Content */}
      <Container size="4" py="6">
        <Flex direction="column" gap="8">
          {/* Introduction */}
          <Box>
            <Heading size="7" mb="3">
              Grup Yönetimi Nedir?
            </Heading>
            <Text size="4" style={{ lineHeight: 1.8, color: "var(--gray-11)" }}>
              Lock Friend'de grup yönetimi, arkadaş gruplarınızı organize etmek ve zamanında gelme disiplini oluşturmak için tasarlanmış güçlü bir sistemdir. Sui blockchain güvenliğiyle desteklenen bu sistem, tüm işlemlerin şeffaf, güvenli ve değiştirilemez olmasını sağlar. Her grubun kendi kuralları, üyeleri ve ceza sistemi vardır ve tüm bunlar blockchain'de kalıcı olarak kaydedilir.
            </Text>
          </Box>

          {/* Why Group Management Matters */}
          <Box>
            <Heading size="6" mb="4">
              🎯 Grup Yönetimi Neden Önemli?
            </Heading>
            <Flex direction="column" gap="3">
              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  borderLeft: "4px solid #3b82f6",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  📋 Düzen ve Planlama
                </Heading>
                <Text size="3" color="gray">
                  Grup yönetimi sistemi, buluşmaların sistematik bir şekilde organize edilmesini sağlar. Buluşma saatleri, yerleri, katılımcılar ve kurallar önceden belirlenir ve herkes bunlara uymalıdır. Bu sayede hiç kimse neyin bekleneceğinden emin olmaz.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  borderLeft: "4px solid #10b981",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  💰 Adil Ekonomi
                </Heading>
                <Text size="3" color="gray">
                  Tüm üyeler aynı kurallar altında çalışır. Zamanında gelen millet ödül alırken, geç gelen ceza öder. Blockchain'in şeffaflığı sayesinde hiç kimse bu sistemi hile yaparak bozamaz. Her para hareketi kayıt altında ve herkes tarafından doğrulanabilir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  borderLeft: "4px solid #f59e0b",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  🤝 Güven ve Hesap Verebilirlik
                </Heading>
                <Text size="3" color="gray">
                  Blockchain tarafından desteklenen sistem, her işlemin kaydı tutulduğu için tam hesap verebilirlik sağlar. Kimse kural değiştirerek veya veri silerek hile yapamaz. Herkes işlemlerin tarihi, miktarları ve sonuçlarını görebilir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  borderLeft: "4px solid #8b5cf6",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  🌐 Küresel Erişim
                </Heading>
                <Text size="3" color="gray">
                  Sui blockchain üzerinde çalıştığı için, üyeler dünyanın herhangi bir yerinden katılabilir. Fiziksel sınırlamalar olmaz; sadece internet bağlantısı yeterlidir.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Group Management Features */}
          <Box>
            <Heading size="6" mb="4">
              ⚙️ Grup Yönetiminin Temel Özellikleri
            </Heading>
            <Flex direction="column" gap="3">
              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  1️⃣ Grup Oluşturma
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Yeni bir grup oluşturmak çok kolaydır. Sadece grup adını, buluşma saatini, buluşma yerini ve ceza miktarını belirleyin. Sistem otomatik olarak blockchain'de bir akıllı kontrat oluşturur. Bu kontrat, grubun tüm işlemlerini yönetecek ve saydıracak olan merkez olmayan bir bilgisayardır.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  2️⃣ Üye Yönetimi
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Gruptan üyeleri ekleyebilir, çıkarabilir veya rol değiştirebilirsiniz. Her üye blockchain'de kayıtlı bir cüzdan adresiyle tanımlanır. Bu, hiç kimsenin başkası adına hareket edemeyeceğini ve tüm işlemlerin doğru kişiye atanacağını garantiler. Üyeler girebilir, çıkabilir ama tüm geçmiş kayıtları kalıcı olarak blockchain'de kalır.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 146, 60, 0.1))",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  3️⃣ Kurallar Belirleme
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Her grup kendi kurallarını belirleyebilir: ceza miktarı, maksimum üye sayısı, buluşma saati vb. Kurallar belirlendikten sonra blockchain'de yazılı hale gelir ve değiştirilemez olur. Bu, herkesin ne bekleneceğini önceden bilmesini ve hiç şaşkınlığa uğramayacağını sağlar.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  4️⃣ Para Yönetimi
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Tüm üyelerin paraları blockchain'de saklanır ve akıllı kontrat tarafından otomatik olarak yönetilir. Zamanında gelenler para kazanır, geç gelenler ceza öder. Hiç kimse parayı çalıp kaçıramaz; sistem otomatik olarak hesaplaması yaparak dağıtır. Tüm para hareketleri blockchain'de kalıcı kayıt olarak kalır.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(244, 63, 94, 0.1))",
                  border: "1px solid rgba(236, 72, 153, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  5️⃣ Raporlama ve İstatistikler
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Grubun tüm geçmişi, istatistikleri ve raporları blockchain'den okunur ve görüntülenebilir. Herkes kimlerin ne kadar zamanında/geç geldiğini, kaç ceza aldığını görebilir. Bu şeffaflık, herkesin doğru muamele gördüğünü ve hiç kimsenin discriminate edilmediğini garantiler.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Group Management Workflow */}
          <Box>
            <Heading size="6" mb="4">
              🔄 Grup Yönetimi Adımları
            </Heading>
            <Flex direction="column" gap="4">
              <Box
                style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, rgba(51, 65, 85, 0.5), rgba(71, 85, 105, 0.5))",
                  border: "2px solid var(--gray-a4)",
                  borderRadius: "8px",
                  borderLeft: "4px solid #3b82f6",
                }}
              >
                <Heading size="5" mb="2">
                  Adım 1: Grup Oluşturmak
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Uygulamada "Yeni Grup Oluştur" butonuna tıklayın. Grup adı (örneğin: "Cuma Buluşmaları"), buluşma zamanı, buluşma yeri ve ceza miktarını girin. Sistem blockchain'de bu grup için bir akıllı kontrat oluşturur. Artık bu grup resmi ve güvenlidir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, rgba(51, 65, 85, 0.5), rgba(71, 85, 105, 0.5))",
                  border: "2px solid var(--gray-a4)",
                  borderRadius: "8px",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <Heading size="5" mb="2">
                  Adım 2: Üyeler Davet Etmek
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Grupta yer alan "Üye Ekle" butonuna tıklayın. Kişinin adını ve Sui cüzdan adresini girin. Blockchain'de bu kişi artık grubun üyesi olarak kaydedilir. Üyeler kendi cüzdanlarından parayla katılmayı onaylamaları gerekir (bu güvenlik mekanizmasıdır).
                </Text>
              </Box>

              <Box
                style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, rgba(51, 65, 85, 0.5), rgba(71, 85, 105, 0.5))",
                  border: "2px solid var(--gray-a4)",
                  borderRadius: "8px",
                  borderLeft: "4px solid #f59e0b",
                }}
              >
                <Heading size="5" mb="2">
                  Adım 3: Kurallar Belirlemek
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Grup ayarlarından ceza miktarını, maksimum üye sayısını ve diğer kuralları belirleyin. Bu kurallar blockchain'e yazılır ve sonra değiştirilemez. Herkes bu kuralları görür ve kabul eder.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, rgba(51, 65, 85, 0.5), rgba(71, 85, 105, 0.5))",
                  border: "2px solid var(--gray-a4)",
                  borderRadius: "8px",
                  borderLeft: "4px solid #8b5cf6",
                }}
              >
                <Heading size="5" mb="2">
                  Adım 4: Buluşma Zamanı ve Check-in
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Belirlenen buluşma saati geldiğinde, üyeler uygulamada check-in yaparlar (konumlarını doğruyla). GPS teknolojisi sayesinde sistem otomatik olarak kimin zamanında gelip gelmediğini kontrol eder. Blockchain'de bu bilgi kaydedilir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, rgba(51, 65, 85, 0.5), rgba(71, 85, 105, 0.5))",
                  border: "2px solid var(--gray-a4)",
                  borderRadius: "8px",
                  borderLeft: "4px solid #ef4444",
                }}
              >
                <Heading size="5" mb="2">
                  Adım 5: Otomatik Ceza Dağıtımı
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Check-in kapatıldıktan sonra akıllı kontrat otomatik olarak hesaplaması yapar: zamanında gelen +ceza miktarı SUI kazanır, geç gelen -ceza miktarı SUI kaybeder. Tüm bu işlemler blockchain'de kalıcı olarak kaydedilir ve hiç kimse bunu değiştiremez.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Sui Security Benefits */}
          <Box>
            <Heading size="6" mb="4">
              🔐 Sui Blockchain ile Grup Yönetimi Güvenliği
            </Heading>
            <Flex direction="column" gap="3">
              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  ✅ Değişmezlik (Immutability)
                </Heading>
                <Text size="3" color="gray">
                  Blockchain'e yazılan tüm grup kuralları, üye kayıtları ve işlemler sonsuza kadar değiştirilemez. Bunu hiçbir admin, yönetici veya başka biri yapamaz. İşlemler bir kez onaylandıktan sonra taş gibi sertleşir. Bu, hiçbir hile veya yolsuzluğun mümkün olmadığını garantiler.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  🔍 Şeffaflık (Transparency)
                </Heading>
                <Text size="3" color="gray">
                  Grubun tüm işlemleri, kuralları ve üyelerinin para hareketleri herkes tarafından görülebilir. Hiç kimse "ben ne yaptım bilemiyorum" diyemez. Herkes herkesin hesabını kontrol edebilir ve sistem tarafından hile yapıldığı tespit edilebilir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  🚀 Yüksek Performans
                </Heading>
                <Text size="3" color="gray">
                  Sui blockchain saniyede 10,000+ işlemi işleyebilir. Bu, siz grup kurduğunuzda, üye eklediğinizde, para dağıtıldığında işlemler anında gerçekleşir. Hiç beklemeye gerek yoktur. Bitcoin gibi saatler harcamamanız gerekir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  💰 Düşük Ücret
                </Heading>
                <Text size="3" color="gray">
                  Sui blockchain'deki işlem ücretleri çok küçüktür (bir miliardıncı dolardan az). Yani bir grubun yönetilmesi, üye eklenmesi, para dağıtılması neredeyse ücretsizdir. Bu parayı diğer önemli şeyler için harcayabilirsiniz.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  🔐 Kriptografik Güvenlik
                </Heading>
                <Text size="3" color="gray">
                  Her üye kendi özel anahtarıyla işlemleri onaylar. Bu, başkası adına hareket edilemeyeceği anlamına gelir. Ayrıca Sui'nin Move programlama dili, "akıllı kontrat hataları" kütüphanesinde yaygın hataları önceden engeller. Sistem tasarım gereği güvenlidir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  🌐 Merkezi Olmayan
                </Heading>
                <Text size="3" color="gray">
                  Sui blockchain, merkezi olmayan binlerce bilgisayar tarafından yönetilir. Yani Lock Friend'i yönetecek merkezi bir sunucu yok. Hiç kimse (hatta biz bile) sistemi kapatıp verileri silemez. Tüm veriler dünyadaki birçok yerde kopyalanır ve kalıcı olur.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Best Practices */}
          <Box>
            <Heading size="6" mb="4">
              💡 Grup Yönetiminde En İyi Uygulamalar
            </Heading>
            <Flex direction="column" gap="3">
              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Text size="3" weight="bold">
                  1. Kuralları Önceden Açık Yap
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Grubunuzun kurallarını baştan açık ve net olarak belirleyin. Ceza miktarı, buluşma saati, ödül sistemi gibi herşey önceden anlaşmalı olmalı. Blockchain'de yazılırsa, kimse daha sonra "ben bunu bilmiyordum" diyemez.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Text size="3" weight="bold">
                  2. Ceza Miktarını Makul Tut
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Ceza miktarı herkesi etkilese de makul olmalı. Çok yüksek ceza setersen kimse katılmak istemez. Çok düşük olursa disiplin sağlanamaz. 0.1 - 1 SUI aralığı genellikle iyi çalışır.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Text size="3" weight="bold">
                  3. Tüm Üyelerin Cüzdan Adresi Olsun
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Blockchain'de para hareketleri cüzdan adresleriyle yapılır. Her üyenin Sui cüzdan adresi olmalı ve doğru olmalı. Yanlış adres girerseniz para yanlış yere gider!
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Text size="3" weight="bold">
                  4. Düzenli Check-in Yap
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Buluşma saatinde belirlenen yerde üyeler check-in yapmalı. GPS kontrol sistem otomatik olarak kimlerin zamanında gelip gelmediğini belirler. Check-in yapmazsa sistem otomatik olarak "Katılmadı" işaretler.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Text size="3" weight="bold">
                  5. Blockchain'i Düzenli Kontrol Et
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Uygulamada "Geçmiş" sekmesinden grubun tam blockchain kaydını görebilirsiniz. Düzenli olarak kontrol edin. Herkesin para hareketleri doğru mu? Kurallar doğru uygulanıyor mu? Şeffaflık denetim kolaylığı sağlar.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Common Scenarios */}
          <Box>
            <Heading size="6" mb="4">
              📖 Örnek Senaryolar
            </Heading>
            <Flex direction="column" gap="4">
              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  Senaryo 1: İyi Disiplin Grubu
                </Heading>
                <Text size="3" color="gray">
                  "Cuma Buluşmaları" grubu oluşturuyorsunuz: 5 kişi, ceza 1 SUI. Her hafta Cuma 19:00'de Taksim'de buluşuyorsunuz. Hep zamanında geldiğiniz için herkes her hafta 1 SUI kazanır. 10 hafta sonra herkes 10 SUI kazanmış olur ve bu blockchain'de yazılı olur. Kimse bu kaydı silemez, bu sizin başarınız!
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  Senaryo 2: Hile Denemesi
                </Heading>
                <Text size="3" color="gray">
                  Birisi "ben zamanında geldiğimi söyle" diye temasa geçer. Ama sistem blockchain tarafından kontrol edilir. GPS verisi, kontrol merkezi ve akıllı kontrat hepsi bu kişinin geç geldiğini doğrular. Hiç kimse sistem kaydını değiştiremez. Hile olmaz!
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 146, 60, 0.1))",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  Senaryo 3: Üye Katılması ve Ayrılması
                </Heading>
                <Text size="3" color="gray">
                  Grupta ilk 5 kişi vardır. 6. kişi katılmak ister. Sistem maksimum üye sayısını kontrol eder (genellikle 10 kişi). Yeni kişi blockchain'de kaydedilir ve gelecekteki işlemlerine katılır. Eğer daha sonra çıkış yaparsa, blockchain kaydı kalıcı olur - eski işlemler silinmez.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* FAQ */}
          <Box>
            <Heading size="6" mb="4">
              ❓ Sıkça Sorulan Sorular
            </Heading>
            <Flex direction="column" gap="3">
              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  S: Grup yöneticisi değişebilir mi?
                </Heading>
                <Text size="3" color="gray">
                  C: Lock Friend sisteminde "yönetici" yoktur. Kural bellenene sonra sistem otomatik olarak çalışır. Kimse tek başına kararlar alamaz. Bu adilliği sağlar. Kuralları değiştirmek istiyorsanız, tüm üyelerin anlaşması gerekir - ama bu yeni bir grup oluşturmak anlamına gelir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  S: Üye çıkmak isterse ne olur?
                </Heading>
                <Text size="3" color="gray">
                  C: Üye istediği zaman çıkabilir. Ama blockchain'de tüm geçmiş işlemleri kalıcı kalır. Çıktıktan sonraki buluşmaları etkilemez. Şimdiye kadar kazandığı/kaybettiği para hesaplaşılır ve cüzdanına geri verilir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  S: GPS konum spoofing'i (hile) yapılabilir mi?
                </Heading>
                <Text size="3" color="gray">
                  C: Teorik olarak GPS hile yapılabilir, fakat Lock Friend sisteminde multiple katmanlar vardır. Check-in saatinde, belirlenen yerde ve cüzdan sahip tarafından yapılması gerekir. Ayrıca geçmiş veriler blockchain'de kalır ve anormal aktiviteler tespit edilebilir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  S: Grubun parası kayıp olabilir mi?
                </Heading>
                <Text size="3" color="gray">
                  C: Hayır. Tüm para akıllı kontrat tarafından tutulur. Hiç kimse parayı çalıp kaçıramaz. Sistem otomatik olarak hesaplama yaparak herkese doğru miktarı gönderir. Anda Sui blockchain'in kriptografik güvenliği parayı korur.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "var(--gray-a3)",
                  border: "1px solid var(--gray-a4)",
                  borderRadius: "6px",
                }}
              >
                <Heading size="4" mb="2">
                  S: Grubun blockchain kaydı silinebilir mi?
                </Heading>
                <Text size="3" color="gray">
                  C: Absolutley not! Blockchain'in temel özelliği değişmezliktir. Bir kez yazılan kayıt sonsuza kadar orada kalır. Hiç kimse (biz de dahil) silemez, değiştiremez. Bu, grubun tüm geçmişinin bir "kalıcı bellek" olduğunu sağlar.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* CTA Section */}
          <Box
            style={{
              padding: "40px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              textAlign: "center",
              color: "white",
            }}
          >
            <Heading size="7" mb="3" style={{ color: "white" }}>
              🚀 Haydi Grup Oluşturalım!
            </Heading>
            <Text size="4" mb="6" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
              Şimdi bir grup oluşturun ve arkadaşlarınızı zamanında gelmeye teşvik edin. Sui blockchain'in gücüyle adil ve güvenli bir sistem kurun.
            </Text>
            <Button
              size="4"
              onClick={onBack}
              style={{
                background: "white",
                color: "#667eea",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ← Geri Dön ve Başla
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

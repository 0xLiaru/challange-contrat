import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface TimeTrackingPageProps {
  onBack: () => void;
}

export function TimeTrackingPage({ onBack }: TimeTrackingPageProps) {
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
        <Heading size="6">⏰ Zaman Takibi</Heading>
        <Box style={{ width: "32px" }} />
      </Flex>

      {/* Main Content */}
      <Container size="4" py="6">
        <Flex direction="column" gap="8">
          {/* Introduction */}
          <Box>
            <Heading size="7" mb="3">
              Zaman Takibi Nedir?
            </Heading>
            <Text size="4" style={{ lineHeight: 1.8, color: "var(--gray-11)" }}>
              Lock Friend'de zaman takibi, buluşmalara katılan kişilerin tam olarak ne zaman ve nerde olduklarını gerçek zamanlı olarak kaydeden ve Sui blockchain'de depolayan güçlü bir sistemdir. GPS teknolojisi, timestamp'ler ve blockchain kayıtları sayesinde, hiç kimse zamanında gelip gelmediği hakkında yalan söyleyemez. Her check-in kalıcı olarak blockchain'de kaydedilir ve hiçbir şekilde silinerek veya değiştirilerek yalan söylenemez.
            </Text>
          </Box>

          {/* Why Time Tracking Matters */}
          <Box>
            <Heading size="6" mb="4">
              🎯 Zaman Takibi Neden Önemli?
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
                  📍 Doğru Kontrol
                </Heading>
                <Text size="3" color="gray">
                  Zaman takibi, kimin tam olarak ne zaman gelip gelmediklerini bilimsel ve objektif bir şekilde ölçer. "Ben geç gelmedim" demek artık mümkün değil - GPS ve timestamp bunu kanıtlar. Herkes eşit ve adil bir şekilde ölçülür.
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
                  💪 Disiplin Oluşturur
                </Heading>
                <Text size="3" color="gray">
                  Insanlar zamanında gelip gelmediklerinin herkese görünür şekilde kaydedileceğini bilince, daha sorumlu hale gelir. Geç gelme sıklığı düşer çünkü hile yapıp kaçış yoktur. Blockchain tüm kaydı tuttuğu için, uzun dönemde davranış değişir.
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
                  🔍 Şeffaflık ve Güven
                </Heading>
                <Text size="3" color="gray">
                  Tüm zaman kayıtları blockchain'de açık olduğu için, kimse "sistem hile yaptı" diyemez. Her üye kendi ve diğer üyelerin zamanını kontrol edebilir. Hiç kimse gizli işlem yapamaz - her şey herkese görünen bir defterdir.
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
                  📊 Veri Tabanlı Kararlar
                </Heading>
                <Text size="3" color="gray">
                  Geçmiş zaman verisi, grup hakkında kararlar almak için kullanılabilir. "Bu grup hep geç buluşuyor mu?" "Kimin performansı iyi?" gibi soruların cevapları blockchain'de bulunur. Veriye dayanarak kararlar alırsanız, daha adil olursunuz.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* How Time Tracking Works */}
          <Box>
            <Heading size="6" mb="4">
              ⚙️ Zaman Takibi Nasıl Çalışır?
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
                  1️⃣ Konum İzni
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Üyeler uygulamayı indirip cüzdanlarını bağladıklarında, konum iznini verirler. Bu izin, smartphone'larının GPS'ini kullanarak gerçek konumlarını uygulamaya gönderir. Bu tamamen gönüllüdür - kimse zorunlu değil ama gruba katılmak istiyorsa bu gerekir.
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
                  2️⃣ Buluşma Saatine Kadar Bekleme
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Belirlenen buluşma saatine kadar sistem sadece izler. Herkes kendi planını yapar, rahat gezer. Ama blockchain arka planda her şeyi kayıt altına alır. Buluşma saati gelince, artık check-in yapma zamanı gelir.
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
                  3️⃣ Check-in Penceresi Açılır
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Buluşma saatinden 15 dakika öncesi ile 15 dakika sonrasına kadar check-in yapılabilir. Bu pencere içinde "Check-in Yap" butonuna basarsanız, sistem o anki konum ve zamanı kaydeder. Check-in, blockchain'de imzalı bir işlem olarak kalıcılaştırılır.
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
                  4️⃣ Konum Doğrulaması
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Check-in yapıldığında, sistem kişinin konumunu grup tarafından belirlenen buluşma yeriyle karşılaştırır. Eğer kişi doğru yerdeyse (örneğin Taksim Meydanı), check-in kabul edilir. Yanlış yerdeyse, sistem bunu redder ve uyarı verir.
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
                <Heading size="5" mb="2">
                  5️⃣ Blockchain'e Kayıt
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Check-in doğrulandığında, tüm bilgiler (kişi, saat, konum, koordinatlar) blockchain'de kalıcı olarak kaydedilir. Bu kaydı hiç kimse silip kaçıramaz. Tüm üyeler bu kaydı görebilir ve doğrulayabilir.
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(75, 85, 99, 0.1))",
                  border: "1px solid rgba(107, 114, 128, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  6️⃣ Otomatik Ceza Hesaplaması
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Check-in penceresinin kapanmasından sonra, akıllı kontrat otomatik olarak hesaplama yapar: Zamanında check-in yapmışsa (saatin 15 dakika öncesine kadar) = zamanında geldi. Saatin 15 dakika sonrasında ya da hiç check-in yapmazsa = geç geldi veya katılmadı. Ceza otomatik dağıtılır.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Time Categories */}
          <Box>
            <Heading size="6" mb="4">
              🕐 Zaman Kategorileri
            </Heading>
            <Flex direction="column" gap="3">
              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))",
                  border: "2px solid rgba(16, 185, 129, 0.5)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  ✅ Zamanında Geldi (On-Time)
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Buluşma saatinden 15 dakika öncesine kadar check-in yapan kişi "zamanında geldi" kategorisine girer. Örneğin, buluşma 19:00 ise, 18:45-19:00 arasında check-in yapanlar zamanında sayılır. Bu kişiler ödül alırlar (ceza miktarı kadar SUI kazanırlar).
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 146, 60, 0.1))",
                  border: "2px solid rgba(245, 158, 11, 0.5)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  ⏱️ Geç Geldi (Late)
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Buluşma saatinden 15 dakika sonrasına kadar (ama işlem kapatılmadan) check-in yapan kişi "geç geldi" kategorisine girer. Örneğin, 19:00-19:15 arasında check-in yapanlar geç sayılır. Bu kişiler ceza öderler (belirlenen ceza miktarı kadar SUI kaybederler).
                </Text>
              </Box>

              <Box
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))",
                  border: "2px solid rgba(239, 68, 68, 0.5)",
                  borderRadius: "8px",
                }}
              >
                <Heading size="4" mb="2">
                  ✕ Katılmadı (Absent)
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Check-in penceresi kapandıktan sonra check-in yapmayan veya yapamayan kişi "katılmadı" kategorisine girer. Bu kişiler ağır ceza öderler (genellikle ceza miktarının 2 katı kadarını kaybederler). Blockchain'de bu davranış permanent kaydedilir.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* GPS and Location Technology */}
          <Box>
            <Heading size="6" mb="4">
              📡 GPS ve Konum Teknolojisi
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
                  🛰️ GPS Nasıl Çalışır?
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Smartphone'unuzun GPS'i, uydu sinyallerini kullanarak konumunuzu hesaplar. Genellikle 5-10 metresi kadar doğruluk vardır. Check-in yapıldığında, cihazınız o anki enlem ve boylam koordinatlarını Lock Friend uygulamasına gönderir. Veriler şifreli olarak iletilir ve blockchain'de kaydedilir.
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
                  🎯 Konum Doğrulaması
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Grup yöneticileri buluşma yerinin merkez koordinatlarını ve yarıçapını belirler (örneğin Taksim Meydanı etrafı 100 metresi). Check-in yapıldığında, sistem kullanıcının konumunun bu yarıçap içinde olup olmadığını kontrol eder. Eğer içindeyse kabul, dışındaysa reddedilir.
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
                  🔒 GPS Spoofing Koruması
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Bazı kişiler GPS'ini hile yaparak "ben başka yerdeyim" diyebilir. Lock Friend buna karşı çeşitli korumaları vardır: Cihazın işletim sistemi seviyesinde GPS doğrulaması, hız kontrolü (bir dakika içinde çok uzak yere gidip geleni reddeder), ve anormal aktivite analizi. Blockchain tüm işlemleri tuttuğu için, anormal çiftler tespit edilebilir.
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
                  ⏱️ Timestamp Güvenliği
                </Heading>
                <Text size="3" color="gray" style={{ lineHeight: 1.6 }}>
                  Check-in yapıldığında kaydedilen zaman, sunucu zamanından alınır (cihaz zamanından değil). Bu, cihazının saatini geriye alarak "ben 10 dakika önceydi" demesini engeller. Blockchain'de kalıcı olarak blockchain ağında tanınmış zaman kaydedilir.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Real-time Monitoring */}
          <Box>
            <Heading size="6" mb="4">
              👁️ Gerçek Zamanlı İzleme
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
                  📊 Canlı Gösterge Paneli
                </Heading>
                <Text size="3" color="gray">
                  Grup yöneticileri, buluşma sırasında canlı bir gösterge paneli görebilir. Hangi üyeler check-in yaptı, kim daha yapacak, kim yolda, kim çok geç kalacak gibi bilgiler görünür. Tüm veriler blockchain'den alınır ve gerçek zamanlıdır.
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
                  🔔 Bildirim Sistemi
                </Heading>
                <Text size="3" color="gray">
                  Buluşma saatine 30 dakika kaldığında, tüm üyelere hatırlatma bildirimi gönderilir. 5 dakika kaldığında tekrar hatırlatılır. Check-in penceresi açıldığında ve kapanıyor iken bildirim gönderilir. Tüm bu bildirimler blockchain'de kaydedilir ve kimin haber aldığı izlenebilir.
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
                  📍 Harita Görünümü
                </Heading>
                <Text size="3" color="gray">
                  Uygulamada, grup üyelerinin konumlarını harita üzerinde görebilirsiniz (sadece buluşma saatinde). Herkes nerede olduğunu görebilir. Bu şeffaflık, hile yapmasını çok zorlaştırır ve herkesin hesap verebilmesini sağlar. Veriler blockchain'den alınır.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Data Security */}
          <Box>
            <Heading size="6" mb="4">
              🔐 Veri Güvenliği ve Blockchain Kalıcılığı
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
                  🔐 Şifreli İletişim
                </Heading>
                <Text size="3" color="gray">
                  Smartphone'unuzdan sunucuya gönderilen tüm veriler (konum, zaman vb) SSL/TLS şifrelemesiyle korunur. Hiç kimse bu veriyi intercepte edemez. Veriler sadece Lock Friend sunucularına ve blockchain'e kaydedilir.
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
                  ⛓️ Blockchain Kalıcılığı
                </Heading>
                <Text size="3" color="gray">
                  Zaman kayıtları blockchain'de depolandığında, sonsuza kadar kalıcılaşırlar. Lock Friend sunucuları kapanırsa bile, blockchain'de tüm veriler kalır. Başka bir platform devralabilir ve verileri geri yükleyebilir. Hiç bir veri kaybolmaz.
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
                  ✅ Değişmezlik Garantisi
                </Heading>
                <Text size="3" color="gray">
                  Blockchain'e yazılan zaman kaydı, asla değiştirilemez veya silineemez. Kriptografik hash'ler, tüm blokları birbirine bağlar. Eski bir kaydı değiştirmek istesen, sonraki tüm blokları da değiştirmen gerekir - bu matematik olarak imkansızdır.
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
                  🌐 Dağıtılmış Depolama
                </Heading>
                <Text size="3" color="gray">
                  Sui blockchain, binlerce bilgisayar üzerinde çalışır. Her bilgisayar tüm zaman kayıtlarının kopyasını tutup. Bir sunucu hack'lenirse, tüm ağdaki diğer sunucular doğru veriyi korur. Merkezi olmayan yapı, verileri hack'lere karşı muhtemel kılar.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Benefits */}
          <Box>
            <Heading size="6" mb="4">
              💡 Zaman Takibinin Avantajları
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
                  ✨ Objektif Ölçüm
                </Heading>
                <Text size="3" color="gray">
                  Zamanında gelip gelmediği, insan kararı değil teknoloji tarafından belirlenmiştir. GPS ve blockchain sahtesiz kanıt sunar. Kimse tartışamaz, kimse hile yapamaz. Tam adalet sağlanır.
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
                  🎯 Otomatik İşlem
                </Heading>
                <Text size="3" color="gray">
                  Zaman takibi tamamen otomatiktir. Hiç kimse manüel olarak "bu kişi zamanında geldi" yazması gerekmez. Sistem bunu otomatik yapar. Bu, insan hatalarını ve yolsuzlukları ortadan kaldırır.
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
                  📊 Tarihsel Veri
                </Heading>
                <Text size="3" color="gray">
                  Tüm zaman kaydı blockchain'de tutulur. Bu sayede, geçmişteki herhangi bir buluşmaya geri dönüp verileri kontrol edebilirsiniz. "Aylar önce kim neden geldi?" sorusunun cevapını blockchain'de bulabilirsiniz.
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
                  🌍 Küresel Uygulanabilirlik
                </Heading>
                <Text size="3" color="gray">
                  Zaman takibi, dünyanın herhangi bir yerinde çalışır. Farklı saat dilimlerinde, farklı ülkelerde buluşmalar yaparsanız bile sistem aynı şekilde doğru çalışır. Sui blockchain global standartlara sahip.
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
                  💰 Düşük Maliyet
                </Heading>
                <Text size="3" color="gray">
                  Zaman takibi, GPS ve blockchain kullandığı halde neredeyse ücretsizdir. Cihazınızın GPS'i zaten var. Blockchain işlem ücretleri çok düşük. Böylece büyük gideri olmadan güvenli sistem kurabilirsiniz.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Scenarios */}
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
                  Senaryo 1: Başarılı Buluşma
                </Heading>
                <Text size="3" color="gray">
                  Cuma Buluşmaları saat 19:00'de Taksim Meydanı'nda planlandı. 5 kişi: Ahmet, Mehmet, Ayşe, Fatih, Zeynep. Ahmet 18:50'de, Ayşe 18:55'te, Zeynep 19:00'de, Mehmet 19:05'te (geç), Fatih hiç check-in yapmadı. Blockchain kaydı: Ahmet ✓, Ayşe ✓, Zeynep ✓, Mehmet ⏱️, Fatih ✕. Ceza dağıtımı: 3 kişi kazanır, Mehmet ceza öder, Fatih ağır ceza öder.
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
                  Senaryo 2: GPS Hile Denemesi
                </Heading>
                <Text size="3" color="gray">
                  Mehmet, GPS'ini hile yaparak "ben Taksim'deyim" diye check-in yapmaya çalışır. Ama sistem birden fazla kontrol yapar: 1) Cihaz GPS'ini doğrula, 2) Hız kontrolü (son check-indan bu kadar uzaktaydı ama bu kadar çabuk olamaz), 3) Network trafiği analizi. Check-in reddedilir ve "Konum doğrulama başarısız" mesajı görülür. Blockchain'de bu girişim kaydedilir.
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
                  Senaryo 3: Aylık Rapor
                </Heading>
                <Text size="3" color="gray">
                  Grup yöneticileri, 4 haftanın blockchain kaydını incelemeye karar verir. Fatih, 4 hafta boyunca 3'sinde katılmamış, 1'inde geç gelmiş. Sistem otomatik olarak "Fatih'in katılım sıklığı düşük" uyarısı verir. Grupta tartışılarak ya kaydı iyileştirilmesi istenir ya da gruptan ayrılması önerilir.
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Best Practices */}
          <Box>
            <Heading size="6" mb="4">
              💡 Zaman Takibinde En İyi Uygulamalar
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
                  1. GPS'i Açık Tutun
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Lock Friend kullanmadan önce cihazınızın GPS'inin açık olduğundan emin olun. GPS kapalı olursa, check-in yapamazsınız. Bluetooth veya WiFi tabanlı konum da desteklenir ama GPS en doğru sonuç verir.
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
                  2. Erken Çıkın
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Check-in saati gelmeden 10-15 dakika erken yola çıkın. Böylece trafik veya beklenmedik durumlar olsa bile zamanında yetiştirirsiniz. Blockchain hiçbir mazeretimi kabul etmediği için, güvenli olmak en iyisidir.
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
                  3. Doğru Yerde Olun
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Check-in penceresi açıldığında, grubun belirlediği tam yerde olun. GPS'in 5-10 metrelik toleransı vardır ama çok uzakta olmayın. Buluşma yeri "Taksim Meydanı 100 metresi" ise, tam o alanın içine girin.
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
                  4. Internet Bağlantısı Sağlayın
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Check-in yapmak için internet bağlantısına ihtiyacınız vardır. Cihazınız WiFi veya mobil veri ile bağlı olmalı. Bağlantı kaybı olursa, uygulama otomatik olarak birkaç dakika beklemeye alır ve tekrar deneme yapar.
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
                  5. Saati Doğru Ayarlayın
                </Text>
                <Text size="2" color="gray" style={{ marginTop: "8px", lineHeight: 1.6 }}>
                  Cihazınızın sistem saati doğru olmalı. Yanlış saat ayarlanmışsa, check-in gemi geç yapabilirsiniz. Cihazınızda "Otomatik Saat Ayarla" seçeneğini etkin tutun.
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
                  S: GPS'im işin yapmıyorsa?
                </Heading>
                <Text size="3" color="gray">
                  C: GPS'in açık olup olmadığını kontrol edin. İç mekanda ise, GPS zayıflayabilir - dışarı çıkın. Sabit bir cihazdan GPS alınamazsa, uygulamada "Konum Problemi" mesajı görürsünüz. Check-in yapamayacaksınız.
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
                  S: Yanlış yerde check-in yaparsam?
                </Heading>
                <Text size="3" color="gray">
                  C: Sistem sizi uyaracak ve check-in reddedecek. Blockchain'de reddedilen girişim de kaydedilir. Daha sonra tarafından geç geldiğiniz muhasebeleştirilecek.
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
                  S: Check-in penceresi sona erdi, hala geliyorum, ne yapabilirim?
                </Heading>
                <Text size="3" color="gray">
                  C: Ne yazık ki, pencerenin sona ermesinden sonra check-in yapıp "Katılmadı" kategorisine geriş. Blockchain'de bu kaydı değiştiremezsiniz. Gelecek buluşmada zamanında gelmek, reputasyonunuzu iyileştirir.
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
                  S: Konum verilerim gizli midir?
                </Heading>
                <Text size="3" color="gray">
                  C: Konum verileri blockchain'de grup üyeleri tarafından görülebilir (buluşma sırasında). Blockchain şeffaf olduğu için kimse bunu gizleyemez. Bundan hoşlanmıyorsanız, gruplara katılmadan hesapları yapabilirsiniz.
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
                  S: Check-in penceresinin süresi neden sabit?
                </Heading>
                <Text size="3" color="gray">
                  C: Pencerenin süresi (genellikle 15 dakika öncesi ve 15 dakika sonrası) grup tarafından önceden belirlenmiştir. Daha uzun bir pencere istiyorsanız, grup ayarlarında bunu tartışarak değiştirebilirsiniz (ancak tüm üyeler anlayışlı olmalı).
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
              🚀 Zaman Takibini Başlat!
            </Heading>
            <Text size="4" mb="6" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
              Blockchain tabanlı zaman takibi ile adil ve şeffaf bir sistem kurun. GPS teknolojisi ve Sui blockchain'in gücüyle zamanında gelmeyi teşvik edin.
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

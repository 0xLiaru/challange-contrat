import { Box, Button, Container, Flex, Heading, Text, Card } from "@radix-ui/themes";
import { ArrowLeftIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { ClaimButton } from "./ClaimButton";

interface GamePageProps {
  onBack: () => void;
}

interface Challenge {
  id: string;
  name: string;
  createdBy: string;
  targetLat: number;
  targetLong: number;
  stake: string;
  participants: string[]; // cüzdan adresleri
  createdAt: string;
  status: "active" | "completed";
}

export function GamePage({ onBack }: GamePageProps) {
  const account = useCurrentAccount();
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "ch_001",
      name: "Taksim Oyunu",
      createdBy: "0x1a2b3c4d5e6f...",
      targetLat: 41.0082,
      targetLong: 28.9784,
      stake: "1 SUI",
      participants: ["0x2a2b3c4d5e6f...", "0x3a2b3c4d5e6f..."],
      createdAt: "5 saat önce",
      status: "active",
    },
  ]);

  // Challenge Oluşturma Formu
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    targetLat: "",
    targetLong: "",
    stake: "",
    participantWallet: "",
  });
  const [tempParticipants, setTempParticipants] = useState<string[]>([]);

  // Handle Challenge Oluştur
  const handleCreateChallenge = () => {
    if (!account) {
      alert("Lütfen önce cüzdan bağlayın!");
      return;
    }

    if (
      !createFormData.name ||
      !createFormData.targetLat ||
      !createFormData.targetLong ||
      !createFormData.stake ||
      tempParticipants.length === 0
    ) {
      alert("Tüm alanları doldurun ve en az bir katılımcı ekleyin!");
      return;
    }

    const newChallenge: Challenge = {
      id: `ch_${Date.now()}`,
      name: createFormData.name,
      createdBy: account.address.slice(0, 12) + "...",
      targetLat: parseFloat(createFormData.targetLat),
      targetLong: parseFloat(createFormData.targetLong),
      stake: createFormData.stake,
      participants: [...tempParticipants],
      createdAt: "Az önce",
      status: "active",
    };

    setChallenges([...challenges, newChallenge]);
    setCreateFormData({ name: "", targetLat: "", targetLong: "", stake: "", participantWallet: "" });
    setTempParticipants([]);
    setShowCreateForm(false);
    alert("✅ Challenge başarıyla oluşturuldu!");
  };

  // Katılımcı Ekle
  const handleAddParticipant = () => {
    if (!createFormData.participantWallet.trim()) {
      alert("Cüzdan adresini girin");
      return;
    }

    if (tempParticipants.includes(createFormData.participantWallet)) {
      alert("Bu cüzdan zaten eklenmiş");
      return;
    }

    setTempParticipants([...tempParticipants, createFormData.participantWallet]);
    setCreateFormData({ ...createFormData, participantWallet: "" });
  };

  // Katılımcı Kaldır
  const handleRemoveParticipant = (wallet: string) => {
    setTempParticipants(tempParticipants.filter((w) => w !== wallet));
  };

  // Challenge Sil
  const handleDeleteChallenge = (id: string) => {
    if (window.confirm("Bu challenge'ı silmek istediğinize emin misiniz?")) {
      setChallenges(challenges.filter((c) => c.id !== id));
    }
  };

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
        <Heading size="6">🎮 Blockchain Challenges</Heading>
        <Box style={{ width: "32px" }} />
      </Flex>

      <Container size="4" py="6">
        <Flex direction="column" gap="6">
          {/* Account Info */}
          {account && (
            <Card style={{ background: "var(--gray-a3)", border: "1px solid var(--gray-a4)" }}>
              <Flex justify="between" align="center">
                <Text weight="bold">Cüzdan Adresi</Text>
                <Text size="2" style={{ fontFamily: "monospace" }}>
                  {account.address.slice(0, 12)}...{account.address.slice(-8)}
                </Text>
              </Flex>
            </Card>
          )}

          {/* New Challenge Section */}
          <Flex direction="column" gap="4">
            <Flex justify="between" align="center">
              <Heading size="6">🆕 Yeni Challenge</Heading>
              <Button
                size="2"
                onClick={() => setShowCreateForm(!showCreateForm)}
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <PlusIcon width="16" height="16" />
                {showCreateForm ? "İptal" : "Challenge Oluştur"}
              </Button>
            </Flex>

            {showCreateForm && (
              <Card style={{ background: "var(--gray-a3)", border: "1px solid var(--gray-a4)" }}>
                <Flex direction="column" gap="4">
                  {/* Challenge Adı */}
                  <Flex direction="column" gap="2">
                    <Text size="2" weight="bold">Challenge Adı</Text>
                    <input
                      type="text"
                      placeholder="Örn: Taksim Challenge"
                      value={createFormData.name}
                      onChange={(e) =>
                        setCreateFormData({ ...createFormData, name: e.target.value })
                      }
                      style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid var(--gray-a5)",
                        fontSize: "14px",
                      }}
                    />
                  </Flex>

                  {/* Konum Bilgileri */}
                  <Flex gap="2">
                    <Flex direction="column" gap="2" style={{ flex: 1 }}>
                      <Text size="2" weight="bold">Hedef Enlem</Text>
                      <input
                        type="number"
                        placeholder="41.0082"
                        value={createFormData.targetLat}
                        onChange={(e) =>
                          setCreateFormData({ ...createFormData, targetLat: e.target.value })
                        }
                        step="0.0001"
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--gray-a5)",
                          fontSize: "14px",
                        }}
                      />
                    </Flex>
                    <Flex direction="column" gap="2" style={{ flex: 1 }}>
                      <Text size="2" weight="bold">Hedef Boylam</Text>
                      <input
                        type="number"
                        placeholder="28.9784"
                        value={createFormData.targetLong}
                        onChange={(e) =>
                          setCreateFormData({ ...createFormData, targetLong: e.target.value })
                        }
                        step="0.0001"
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--gray-a5)",
                          fontSize: "14px",
                        }}
                      />
                    </Flex>
                  </Flex>

                  {/* Stake */}
                  <Flex direction="column" gap="2">
                    <Text size="2" weight="bold">Stake (SUI)</Text>
                    <input
                      type="text"
                      placeholder="1"
                      value={createFormData.stake}
                      onChange={(e) =>
                        setCreateFormData({ ...createFormData, stake: e.target.value })
                      }
                      style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid var(--gray-a5)",
                        fontSize: "14px",
                      }}
                    />
                  </Flex>

                  {/* Katılımcı Ekleme */}
                  <Card style={{ background: "var(--gray-a2)", border: "1px solid var(--gray-a4)" }}>
                    <Flex direction="column" gap="3">
                      <Heading size="4">👥 Katılımcılar Ekle</Heading>

                      <Flex gap="2">
                        <input
                          type="text"
                          placeholder="0x... (cüzdan adresi)"
                          value={createFormData.participantWallet}
                          onChange={(e) =>
                            setCreateFormData({
                              ...createFormData,
                              participantWallet: e.target.value,
                            })
                          }
                          style={{
                            flex: 1,
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid var(--gray-a5)",
                            fontSize: "14px",
                            fontFamily: "monospace",
                          }}
                        />
                        <Button
                          onClick={handleAddParticipant}
                          style={{
                            background: "#10b981",
                            color: "white",
                            cursor: "pointer",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "6px",
                          }}
                        >
                          <PlusIcon width="16" height="16" />
                        </Button>
                      </Flex>

                      {/* Eklenen Katılımcılar */}
                      {tempParticipants.length > 0 && (
                        <Flex direction="column" gap="2">
                          <Text size="2" color="gray">
                            Katılımcılar ({tempParticipants.length})
                          </Text>
                          {tempParticipants.map((wallet, idx) => (
                            <Flex
                              key={idx}
                              justify="between"
                              align="center"
                              style={{
                                padding: "8px 12px",
                                background: "var(--gray-a1)",
                                borderRadius: "6px",
                                border: "1px solid var(--gray-a4)",
                              }}
                            >
                              <Text size="2" style={{ fontFamily: "monospace" }}>
                                {wallet.slice(0, 12)}...{wallet.slice(-8)}
                              </Text>
                              <Button
                                size="1"
                                color="red"
                                variant="soft"
                                onClick={() => handleRemoveParticipant(wallet)}
                                style={{ cursor: "pointer" }}
                              >
                                <TrashIcon width="14" height="14" />
                              </Button>
                            </Flex>
                          ))}
                        </Flex>
                      )}
                    </Flex>
                  </Card>

                  {/* Create Button */}
                  <Button
                    onClick={handleCreateChallenge}
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      cursor: "pointer",
                      border: "none",
                      padding: "12px 16px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    ✅ Challenge Oluştur
                  </Button>
                </Flex>
              </Card>
            )}
          </Flex>

          {/* Active Challenges Section */}
          <Flex direction="column" gap="4">
            <Heading size="6">
              🔥 Aktif Challenges ({challenges.filter((c) => c.status === "active").length})
            </Heading>

            {challenges.filter((c) => c.status === "active").length === 0 ? (
              <Card style={{ background: "var(--gray-a3)", border: "1px solid var(--gray-a4)" }}>
                <Flex direction="column" gap="2" align="center" style={{ textAlign: "center" }}>
                  <Text size="4" color="gray">
                    😴 Henüz aktif challenge yok
                  </Text>
                  <Text size="2" color="gray">
                    Yeni bir challenge oluşturmaya başlayın!
                  </Text>
                </Flex>
              </Card>
            ) : (
              challenges
                .filter((c) => c.status === "active")
                .map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onDelete={() => handleDeleteChallenge(challenge.id)}
                  />
                ))
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

function ChallengeCard({
  challenge,
  onDelete,
}: {
  challenge: Challenge;
  onDelete: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={{ background: "var(--gray-a3)", border: "1px solid var(--gray-a4)" }}>
      <Flex direction="column" gap="4">
        {/* Header */}
        <Flex justify="between" align="start">
          <Flex direction="column" gap="2" style={{ flex: 1 }}>
            <Heading size="4">🎯 {challenge.name}</Heading>
            <Flex gap="4">
              <Box>
                <Text size="1" color="gray">
                  Oluşturan
                </Text>
                <Text size="2" style={{ fontFamily: "monospace" }}>
                  {challenge.createdBy}
                </Text>
              </Box>
              <Box>
                <Text size="1" color="gray">
                  Stake
                </Text>
                <Text size="2" weight="bold">
                  {challenge.stake}
                </Text>
              </Box>
              <Box>
                <Text size="1" color="gray">
                  Katılımcı
                </Text>
                <Text size="2" weight="bold">
                  {challenge.participants.length}
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Flex gap="2">
            <Button
              size="2"
              variant="soft"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Gizle" : "Detay"}
            </Button>
            <Button
              size="2"
              color="red"
              variant="soft"
              onClick={onDelete}
              style={{ cursor: "pointer" }}
            >
              <TrashIcon width="16" height="16" />
            </Button>
          </Flex>
        </Flex>

        {/* Details */}
        {showDetails && (
          <Flex direction="column" gap="3" style={{ borderTop: "1px solid var(--gray-a4)", paddingTop: "16px" }}>
            {/* Konum */}
            <Box>
              <Text size="2" weight="bold" style={{ marginBottom: "8px", display: "block" }}>
                📍 Hedef Konum
              </Text>
              <Flex gap="4">
                <Box>
                  <Text size="1" color="gray">
                    Enlem
                  </Text>
                  <Text size="2">{challenge.targetLat.toFixed(6)}</Text>
                </Box>
                <Box>
                  <Text size="1" color="gray">
                    Boylam
                  </Text>
                  <Text size="2">{challenge.targetLong.toFixed(6)}</Text>
                </Box>
              </Flex>
            </Box>

            {/* Katılımcılar */}
            <Box>
              <Text size="2" weight="bold" style={{ marginBottom: "8px", display: "block" }}>
                👥 Katılımcılar
              </Text>
              <Flex direction="column" gap="2">
                {challenge.participants.map((wallet, idx) => (
                  <Box
                    key={idx}
                    style={{
                      padding: "8px 12px",
                      background: "var(--gray-a2)",
                      borderRadius: "6px",
                      border: "1px solid var(--gray-a4)",
                    }}
                  >
                    <Text size="2" style={{ fontFamily: "monospace" }}>
                      {wallet.slice(0, 12)}...{wallet.slice(-8)}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Ödül Talep Et */}
            <Box style={{ borderTop: "1px solid var(--gray-a4)", paddingTop: "12px" }}>
              <ClaimButton
                gameId={challenge.id}
                onSuccess={(digest) => {
                  alert(`✅ Başarılı! Tx: ${digest.slice(0, 12)}...`);
                }}
                onError={(error) => {
                  alert(`❌ Hata: ${error}`);
                }}
              />
            </Box>
          </Flex>
        )}

        {/* Status Bar */}
        <Box
          style={{
            padding: "8px 12px",
            background: "rgba(16, 185, 129, 0.1)",
            borderRadius: "6px",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        >
          <Flex justify="between" align="center">
            <Text size="1" color="gray">
              Oluşturuldu: {challenge.createdAt}
            </Text>
            <Text size="1" style={{ color: "#10b981", fontWeight: "bold" }}>
              🟢 Aktif
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}

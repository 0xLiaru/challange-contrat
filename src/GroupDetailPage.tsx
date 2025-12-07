import { Box, Button, Container, Flex, Heading, Text, Grid, Card, Tabs } from "@radix-ui/themes";
import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AddMemberModal } from "./AddMemberModal";

interface GroupDetailPageProps {
  group: {
    name: string;
    members: number;
    totalLocked: string;
    nextMeeting: string;
  };
  onBack: () => void;
  onDeleteGroup?: (groupName: string) => void;
}

export function GroupDetailPage({ group, onBack, onDeleteGroup }: GroupDetailPageProps) {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [groupName, setGroupName] = useState(group.name);
  const [penaltyAmount, setPenaltyAmount] = useState("0.1");
  const [maxMembers, setMaxMembers] = useState("10");
  const [isEditing, setIsEditing] = useState(false);
  
  const getInitialMembers = () => {
    if (group.name === "Cuma Buluşmaları") {
      return [
        { name: "Ahmet", status: "Zamanında Geldi", amount: "+0.1 SUI", time: "2 saat önce", onTime: true, walletAddress: "0x1a2b3c4d5e6f..." },
        { name: "Mehmet", status: "Geç Geldi", amount: "-5 SUI", time: "5 saat önce", onTime: false, walletAddress: "0x2a2b3c4d5e6f..." },
        { name: "Ayşe", status: "Zamanında Geldi", amount: "+0.1 SUI", time: "1 saat önce", onTime: true, walletAddress: "0x3a2b3c4d5e6f..." },
        { name: "Fatih", status: "Katılmadı", amount: "-5 SUI", time: "30 dakika önce", onTime: false, walletAddress: "0x4a2b3c4d5e6f..." },
        { name: "Zeynep", status: "Zamanında Geldi", amount: "+0.1 SUI", time: "45 dakika önce", onTime: true, walletAddress: "0x5a2b3c4d5e6f..." },
      ];
    } else if (group.name === "Spor Arkadaşları") {
      return [
        { name: "Ahmet", status: "Zamanında Geldi", amount: "+0.1 SUI", time: "2 saat önce", onTime: true, walletAddress: "0x1a2b3c4d5e6f..." },
        { name: "Mehmet", status: "Geç Geldi", amount: "-0.2 SUI", time: "5 saat önce", onTime: false, walletAddress: "0x2a2b3c4d5e6f..." },
        { name: "Ayşe", status: "Zamanında Geldi", amount: "+0.1 SUI", time: "1 saat önce", onTime: true, walletAddress: "0x3a2b3c4d5e6f..." },
      ];
    }
    return [];
  };
  
  const [groupMembers, setGroupMembers] = useState(getInitialMembers());

  const handleAddMember = (memberName: string, walletAddress: string) => {
    const newMember = {
      name: memberName,
      status: "Beklemede",
      amount: "0 SUI",
      time: "Az önce",
      onTime: false,
      walletAddress: walletAddress,
    };
    setGroupMembers([...groupMembers, newMember]);
  };

  const handleSaveSettings = () => {
    if (!groupName.trim()) {
      alert("Grup adı boş olamaz");
      return;
    }
    if (parseFloat(penaltyAmount) <= 0) {
      alert("Ceza miktarı 0'dan büyük olmalı");
      return;
    }
    if (parseInt(maxMembers) < 2) {
      alert("Maksimum üye sayısı en az 2 olmalı");
      return;
    }
    setIsEditing(false);
    alert("Ayarlar başarıyla kaydedildi!");
  };

  const handleCancelEdit = () => {
    setGroupName(group.name);
    setPenaltyAmount("0.1");
    setMaxMembers("10");
    setIsEditing(false);
  };

  const handleDeleteGroup = () => {
    if (window.confirm(`"${group.name}" grubunu silmek istediğinize emin misiniz?`)) {
      onDeleteGroup?.(group.name);
      onBack();
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
        <Heading size="6">{group.name}</Heading>
        <Box style={{ width: "40px" }} />
      </Flex>

      {/* Main Content */}
      <Container size="4" py="6">
        <Flex direction="column" gap="6">
          {/* Group Info Cards */}
          <Grid columns="3" gap="4">
            <InfoCard
              icon="👥"
              label="Üyeler"
              value={groupMembers.length.toString()}
            />
            <InfoCard
              icon="💰"
              label="Kilitli Para"
              value={group.totalLocked}
            />
            <InfoCard
              icon="⏰"
              label="Sonraki Buluşma"
              value={group.nextMeeting}
            />
          </Grid>

          {/* Tabs */}
          <Tabs.Root defaultValue="members">
            <Tabs.List>
              <Tabs.Trigger value="members">Üyeler</Tabs.Trigger>
              <Tabs.Trigger value="history">Geçmiş</Tabs.Trigger>
              <Tabs.Trigger value="settings">Ayarlar</Tabs.Trigger>
            </Tabs.List>

            {/* Members Tab */}
            <Tabs.Content value="members">
              <Box mt="4">
                <Flex justify="between" align="center" mb="4">
                  <Heading size="5">Grup Üyeleri ({groupMembers.length})</Heading>
                  <Button
                    size="2"
                    onClick={() => setIsAddMemberModalOpen(true)}
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    <PlusIcon width="16" height="16" />
                    Üye Ekle
                  </Button>
                </Flex>

                <Flex direction="column" gap="3">
                  {groupMembers.map((member, index) => (
                    <MemberCard 
                      key={index} 
                      member={member}
                      onRemove={() => {
                        setGroupMembers(groupMembers.filter((_, i) => i !== index));
                      }}
                    />
                  ))}
                </Flex>
              </Box>
            </Tabs.Content>

            {/* History Tab */}
            <Tabs.Content value="history">
              <Box mt="4">
                <Heading size="5" mb="4">Buluşma Geçmişi</Heading>
                <Flex direction="column" gap="3">
                  <HistoryCard
                    date="5 Aralık 2024"
                    onTime={5}
                    late={1}
                    absent={0}
                    totalPenalty="0.2 SUI"
                  />
                  <HistoryCard
                    date="28 Kasım 2024"
                    onTime={6}
                    late={0}
                    absent={0}
                    totalPenalty="0 SUI"
                  />
                  <HistoryCard
                    date="21 Kasım 2024"
                    onTime={4}
                    late={2}
                    absent={1}
                    totalPenalty="0.7 SUI"
                  />
                </Flex>
              </Box>
            </Tabs.Content>

            {/* Settings Tab */}
            <Tabs.Content value="settings">
              <Box mt="4">
                <Flex justify="between" align="center" mb="4">
                  <Heading size="5">Grup Ayarları</Heading>
                  {!isEditing && (
                    <Button
                      size="2"
                      variant="soft"
                      onClick={() => setIsEditing(true)}
                    >
                      Düzenle
                    </Button>
                  )}
                </Flex>

                <Flex direction="column" gap="4">
                  {isEditing ? (
                    <>
                      {/* Editable Fields */}
                      <EditableSettingItem
                        label="Grup Adı"
                        value={groupName}
                        onChange={setGroupName}
                        type="text"
                      />
                      <EditableSettingItem
                        label="Ceza Miktarı (SUI)"
                        value={penaltyAmount}
                        onChange={setPenaltyAmount}
                        type="number"
                        step="0.1"
                        min="0"
                      />
                      <EditableSettingItem
                        label="Maksimum Üyeler"
                        value={maxMembers}
                        onChange={setMaxMembers}
                        type="number"
                        min="2"
                      />
                      <SettingItem label="Oluşturma Tarihi" value="1 Kasım 2024" />

                      {/* Action Buttons */}
                      <Flex gap="2">
                        <Button
                          onClick={handleSaveSettings}
                          style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            cursor: "pointer",
                            border: "none",
                          }}
                        >
                          Kaydet
                        </Button>
                        <Button
                          variant="soft"
                          color="gray"
                          onClick={handleCancelEdit}
                        >
                          İptal
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <>
                      {/* Read-only Fields */}
                      <SettingItem label="Grup Adı" value={groupName} />
                      <SettingItem label="Ceza Miktarı" value={`${penaltyAmount} SUI`} />
                      <SettingItem label="Maksimum Üyeler" value={maxMembers} />
                      <SettingItem label="Oluşturma Tarihi" value="1 Kasım 2024" />
                    </>
                  )}

                  <Button
                    color="red"
                    variant="soft"
                    onClick={handleDeleteGroup}
                    style={{
                      marginTop: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Grubu Sil
                  </Button>
                </Flex>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Flex>
      </Container>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
        groupName={group.name}
      />
    </Box>
  );
}

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <Card
      style={{
        background: "var(--gray-a3)",
        border: "1px solid var(--gray-a4)",
      }}
    >
      <Flex direction="column" gap="2" align="center" style={{ textAlign: "center" }}>
        <Box style={{ fontSize: "2rem" }}>{icon}</Box>
        <Text size="1" color="gray">
          {label}
        </Text>
        <Text size="4" weight="bold">
          {value}
        </Text>
      </Flex>
    </Card>
  );
}

function MemberCard({ member, onRemove }: { 
  member: {
    name: string;
    status: string;
    amount: string;
    time: string;
    onTime: boolean;
    walletAddress?: string;
  };
  onRemove?: () => void;
}) {
  return (
    <Card
      style={{
        background: "var(--gray-a3)",
        border: "1px solid var(--gray-a4)",
      }}
    >
      <Flex justify="between" align="center">
        <Flex gap="3" align="center" style={{ flex: 1 }}>
          <Box
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              flexShrink: 0,
            }}
          >
            {member.name.charAt(0)}
          </Box>
          <Flex direction="column" gap="1">
            <Text weight="bold">{member.name}</Text>
            <Text size="2" color="gray">
              {member.status}
            </Text>
            {member.walletAddress && (
              <Text size="1" color="gray" style={{ fontFamily: "monospace", marginTop: "2px" }}>
                {member.walletAddress}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex gap="2" align="center" style={{ flexShrink: 0 }}>
          <Flex direction="column" gap="1" align="end">
            <Text
              weight="bold"
              style={{ color: member.onTime ? "#10b981" : "#ef4444" }}
            >
              {member.amount}
            </Text>
            <Text size="2" color="gray">
              {member.time}
            </Text>
          </Flex>
          {onRemove && (
            <Button
              size="1"
              color="red"
              variant="soft"
              onClick={onRemove}
              style={{
                cursor: "pointer",
              }}
            >
              Sil
            </Button>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}

function HistoryCard({ date, onTime, late, absent, totalPenalty }: {
  date: string;
  onTime: number;
  late: number;
  absent: number;
  totalPenalty: string;
}) {
  return (
    <Card
      style={{
        background: "var(--gray-a3)",
        border: "1px solid var(--gray-a4)",
      }}
    >
      <Flex justify="between" align="center">
        <Flex direction="column" gap="2">
          <Text weight="bold" size="3">
            {date}
          </Text>
          <Flex gap="4">
            <StatBadge icon="✓" label="Zamanında" value={onTime} color="#10b981" />
            <StatBadge icon="⏱" label="Geç" value={late} color="#f59e0b" />
            <StatBadge icon="✕" label="Katılmadı" value={absent} color="#ef4444" />
          </Flex>
        </Flex>
        <Box style={{ textAlign: "right" }}>
          <Text size="1" color="gray">
            Toplam Ceza
          </Text>
          <Text size="4" weight="bold">
            {totalPenalty}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}

function StatBadge({ icon, label, value, color }: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Flex gap="1" align="center">
      <Box style={{ color, fontSize: "14px" }}>
        {icon}
      </Box>
      <Text size="1" color="gray">
        {label}: <span style={{ color, fontWeight: "bold" }}>{value}</span>
      </Text>
    </Flex>
  );
}

function SettingItem({ label, value }: { label: string; value: string }) {
  return (
    <Card
      style={{
        background: "var(--gray-a3)",
        border: "1px solid var(--gray-a4)",
      }}
    >
      <Flex justify="between" align="center">
        <Text weight="bold">{label}</Text>
        <Text color="gray">{value}</Text>
      </Flex>
    </Card>
  );
}

function EditableSettingItem({
  label,
  value,
  onChange,
  type = "text",
  step,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  step?: string;
  min?: string;
}) {
  return (
    <Flex direction="column" gap="2">
      <Text size="2" weight="bold">
        {label}
      </Text>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        min={min}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid var(--gray-a5)",
          fontSize: "14px",
          fontFamily: "inherit",
        }}
      />
    </Flex>
  );
}

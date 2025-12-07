import { useState } from "react";
import { Box, Button, Dialog, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupData: GroupFormData) => void;
}

export interface GroupFormData {
  name: string;
  description: string;
  meetingTime: string;
  penaltyAmount: string;
  maxMembers: string;
}

export function CreateGroupModal({ isOpen, onClose, onCreateGroup }: CreateGroupModalProps) {
  const [formData, setFormData] = useState<GroupFormData>({
    name: "",
    description: "",
    meetingTime: "",
    penaltyAmount: "0.1",
    maxMembers: "10",
  });

  const [errors, setErrors] = useState<Partial<GroupFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<GroupFormData> = {};

    if (!formData.name.trim()) newErrors.name = "Grup adı gerekli";
    if (!formData.description.trim()) newErrors.description = "Açıklama gerekli";
    if (!formData.meetingTime.trim()) newErrors.meetingTime = "Buluşma zamanı gerekli";
    if (!formData.penaltyAmount || parseFloat(formData.penaltyAmount) <= 0) {
      newErrors.penaltyAmount = "Ceza miktarı 0'dan büyük olmalı";
    }
    if (!formData.maxMembers || parseInt(formData.maxMembers) < 2) {
      newErrors.maxMembers = "Maksimum üye sayısı en az 2 olmalı";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onCreateGroup(formData);
      setFormData({
        name: "",
        description: "",
        meetingTime: "",
        penaltyAmount: "0.1",
        maxMembers: "10",
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      meetingTime: "",
      penaltyAmount: "0.1",
      maxMembers: "10",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content
        style={{
          maxWidth: "500px",
        }}
      >
        <Flex justify="between" align="center" mb="4">
          <Dialog.Title>
            <Heading size="6">🔒 Yeni Grup Oluştur</Heading>
          </Dialog.Title>
          <Dialog.Close>
            <Button variant="ghost" size="2">
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Flex>

        <Flex direction="column" gap="4">
          {/* Grup Adı */}
          <Flex direction="column" gap="2">
            <Text size="2" weight="bold">
              Grup Adı
            </Text>
            <TextField.Root
              placeholder="Örn: Cuma Buluşmaları"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            />
            {errors.name && (
              <Text size="1" style={{ color: "#ef4444" }}>
                {errors.name}
              </Text>
            )}
          </Flex>

          {/* Açıklama */}
          <Flex direction="column" gap="2">
            <Text size="2" weight="bold">
              Açıklama
            </Text>
            <TextField.Root
              placeholder="Bu grup ne için? Örn: Haftanın cuma günleri buluşmalar"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: undefined });
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            />
            {errors.description && (
              <Text size="1" style={{ color: "#ef4444" }}>
                {errors.description}
              </Text>
            )}
          </Flex>

          {/* Buluşma Zamanı */}
          <Flex direction="column" gap="2">
            <Text size="2" weight="bold">
              Buluşma Zamanı
            </Text>
            <TextField.Root
              placeholder="Örn: Cuma 19:00"
              value={formData.meetingTime}
              onChange={(e) => {
                setFormData({ ...formData, meetingTime: e.target.value });
                if (errors.meetingTime) setErrors({ ...errors, meetingTime: undefined });
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            />
            {errors.meetingTime && (
              <Text size="1" style={{ color: "#ef4444" }}>
                {errors.meetingTime}
              </Text>
            )}
          </Flex>

          {/* Ceza Miktarı ve Maksimum Üye */}
          <Flex gap="4">
            <Flex direction="column" gap="2" style={{ flex: 1 }}>
              <Text size="2" weight="bold">
                Ceza Miktarı (SUI)
              </Text>
              <TextField.Root
                type="number"
                placeholder="0.1"
                value={formData.penaltyAmount}
                onChange={(e) => {
                  setFormData({ ...formData, penaltyAmount: e.target.value });
                  if (errors.penaltyAmount) setErrors({ ...errors, penaltyAmount: undefined });
                }}
                step="0.1"
                min="0"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              />
              {errors.penaltyAmount && (
                <Text size="1" style={{ color: "#ef4444" }}>
                  {errors.penaltyAmount}
                </Text>
              )}
            </Flex>

            <Flex direction="column" gap="2" style={{ flex: 1 }}>
              <Text size="2" weight="bold">
                Maksimum Üyeler
              </Text>
              <TextField.Root
                type="number"
                placeholder="10"
                value={formData.maxMembers}
                onChange={(e) => {
                  setFormData({ ...formData, maxMembers: e.target.value });
                  if (errors.maxMembers) setErrors({ ...errors, maxMembers: undefined });
                }}
                min="2"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              />
              {errors.maxMembers && (
                <Text size="1" style={{ color: "#ef4444" }}>
                  {errors.maxMembers}
                </Text>
              )}
            </Flex>
          </Flex>

          {/* Info Box */}
          <Box
            style={{
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <Text size="2" style={{ color: "#4f46e5" }}>
              ℹ️ Geç gelen üyeler ceza miktarı kadar para kaybederler. Bu para zamanında gelen üyelere dağıtılır.
            </Text>
          </Box>

          {/* Buttons */}
          <Flex gap="3" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                İptal
              </Button>
            </Dialog.Close>
            <Button
              onClick={handleSubmit}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                cursor: "pointer",
                border: "none",
              }}
            >
              Grubu Oluştur
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

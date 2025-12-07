import { useState } from "react";
import { Box, Button, Dialog, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (memberName: string, walletAddress: string) => void;
  groupName: string;
}

export function AddMemberModal({
  isOpen,
  onClose,
  onAddMember,
  groupName,
}: AddMemberModalProps) {
  const [memberName, setMemberName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");

  const handleAddMember = () => {
    if (!memberName.trim()) {
      setError("Üye adı gerekli");
      return;
    }

    if (memberName.trim().length < 2) {
      setError("Üye adı en az 2 karakter olmalı");
      return;
    }

    if (!walletAddress.trim()) {
      setError("Cüzdan adresi gerekli");
      return;
    }

    onAddMember(memberName.trim(), walletAddress.trim());
    setMemberName("");
    setWalletAddress("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setMemberName("");
    setWalletAddress("");
    setError("");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content
        style={{
          maxWidth: "400px",
        }}
      >
        <Flex justify="between" align="center" mb="4">
          <Dialog.Title>
            <Heading size="6">👤 {groupName}'ne Üye Ekle</Heading>
          </Dialog.Title>
          <Dialog.Close>
            <Button variant="ghost" size="2">
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Flex>

        <Flex direction="column" gap="4">
          {/* Member Name Input */}
          <Flex direction="column" gap="2">
            <Text size="2" weight="bold">
              Üye Adı
            </Text>
            <TextField.Root
              placeholder="Örn: Ahmet"
              value={memberName}
              onChange={(e) => {
                setMemberName(e.target.value);
                if (error) setError("");
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            />
          </Flex>

          {/* Wallet Address Input */}
          <Flex direction="column" gap="2">
            <Text size="2" weight="bold">
              Cüzdan Adresi
            </Text>
            <TextField.Root
              placeholder="Örn: 0x1234567890abcdef..."
              value={walletAddress}
              onChange={(e) => {
                setWalletAddress(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddMember();
                }
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            />
            {error && (
              <Text size="1" style={{ color: "#ef4444" }}>
                {error}
              </Text>
            )}
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
              ℹ️ Yeni üye gruba katıldığında ilk buluşmada zamanında gelirse ödül kazanacak, geç gelirse ceza ödeyecektir.
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
              onClick={handleAddMember}
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
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

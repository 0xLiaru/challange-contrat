import { Box, Button, Dialog, Flex, Heading, Text, Card } from "@radix-ui/themes";
import { Cross2Icon, CheckIcon, TrashIcon } from "@radix-ui/react-icons";

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableGroups: Array<{
    name: string;
    members: number;
    totalLocked: string;
    nextMeeting: string;
  }>;
  joinedGroups: string[];
  onJoinGroup: (groupName: string) => void;
  onLeaveGroup: (groupName: string) => void;
}

export function JoinGroupModal({
  isOpen,
  onClose,
  availableGroups,
  joinedGroups,
  onJoinGroup,
  onLeaveGroup,
}: JoinGroupModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content
        style={{
          maxWidth: "600px",
        }}
      >
        <Flex justify="between" align="center" mb="4">
          <Dialog.Title>
            <Heading size="6">👥 Gruplara Katıl / Ayrıl</Heading>
          </Dialog.Title>
          <Dialog.Close>
            <Button variant="ghost" size="2">
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Flex>

        <Flex direction="column" gap="4">
          {availableGroups.length === 0 ? (
            <Box
              style={{
                background: "rgba(156, 163, 175, 0.1)",
                border: "1px solid rgba(156, 163, 175, 0.3)",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <Text color="gray">Henüz hiç grup yok</Text>
            </Box>
          ) : (
            availableGroups.map((group, index) => {
              const isJoined = joinedGroups.includes(group.name);
              return (
                <Card
                  key={index}
                  style={{
                    background: isJoined
                      ? "rgba(16, 185, 129, 0.1)"
                      : "var(--gray-a3)",
                    border: isJoined
                      ? "1px solid rgba(16, 185, 129, 0.3)"
                      : "1px solid var(--gray-a4)",
                  }}
                >
                  <Flex justify="between" align="center">
                    <Flex direction="column" gap="2" style={{ flex: 1 }}>
                      <Flex gap="2" align="center">
                        <Text weight="bold" size="3">
                          {group.name}
                        </Text>
                        {isJoined && (
                          <Box
                            style={{
                              background: "#10b981",
                              color: "white",
                              borderRadius: "4px",
                              padding: "2px 8px",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            Üyesin
                          </Box>
                        )}
                      </Flex>
                      <Flex gap="4">
                        <Text size="2" color="gray">
                          👥 {group.members} üye
                        </Text>
                        <Text size="2" color="gray">
                          💰 {group.totalLocked}
                        </Text>
                        <Text size="2" color="gray">
                          ⏰ {group.nextMeeting}
                        </Text>
                      </Flex>
                    </Flex>

                    {isJoined ? (
                      <Button
                        size="2"
                        color="red"
                        variant="soft"
                        onClick={() => onLeaveGroup(group.name)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <TrashIcon width="16" height="16" />
                        Ayrıl
                      </Button>
                    ) : (
                      <Button
                        size="2"
                        onClick={() => onJoinGroup(group.name)}
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          cursor: "pointer",
                          border: "none",
                        }}
                      >
                        <CheckIcon width="16" height="16" />
                        Katıl
                      </Button>
                    )}
                  </Flex>
                </Card>
              );
            })
          )}
        </Flex>

        <Flex gap="3" justify="end" mt="4">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Kapat
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

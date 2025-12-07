import { useState, useEffect } from "react";
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { LandingPage } from "./LandingPage";
import { HomePage } from "./HomePage";
import { GamePage } from "./GamePage";
import { SmartPenaltyPage } from "./SmartPenaltyPage";
import { BlockchainSecurityDetailPage } from "./BlockchainSecurityDetailPage";
import { GroupManagementDetailPage } from "./GroupManagementDetailPage";
import { TimeTrackingDetailPage } from "./TimeTrackingDetailPage";

function App() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const [showGame, setShowGame] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showLanding, setShowLanding] = useState(false); // Genel bilgi sayfası için
  const [showDetailPage, setShowDetailPage] = useState<string | null>(null);

  // Cüzdan bağlandığında otomatik olarak HomePage'e yönlendir
  // Ama showLanding true ise yönlendirme
  useEffect(() => {
    if (account && !showHome && !showGame && !showDetailPage && !showLanding) {
      setShowHome(true);
    }
  }, [account]);

  const handleLogout = () => {
    disconnect();
    setShowHome(false);
    setShowGame(false);
    setShowDetailPage(null);
    setShowLanding(false);
  };

  // Logo'ya tıklandığında genel bilgi sayfasına (LandingPage) git
  const handleLogoClick = () => {
    setShowDetailPage(null);
    setShowGame(false);
    setShowHome(false);
    setShowLanding(true); // Genel bilgi sayfasını göster
  };

  const handleBackFromGame = () => {
    setShowGame(false);
    setShowHome(true);
  };

  // LandingPage'den uygulamayı başlat butonuna tıklandığında
  const handleGameClick = () => {
    setShowLanding(false);
    setShowHome(true);
  };

  const handleDetailPageClick = (page: string) => {
    setShowDetailPage(page);
  };

  const handleBackFromDetail = () => {
    setShowDetailPage(null);
    setShowHome(true);
  };

  if (showGame) {
    return <GamePage onBack={handleBackFromGame} />;
  }

  if (showDetailPage === "smart-penalty") {
    return <SmartPenaltyPage onBack={handleBackFromDetail} />;
  }

  if (showDetailPage === "blockchain-security") {
    return <BlockchainSecurityDetailPage onBack={handleBackFromDetail} />;
  }

  if (showDetailPage === "group-management") {
    return <GroupManagementDetailPage onBack={handleBackFromDetail} />;
  }

  if (showDetailPage === "time-tracking") {
    return <TimeTrackingDetailPage onBack={handleBackFromDetail} />;
  }

  // Genel bilgi sayfası (Logo'ya tıklandığında)
  if (showLanding) {
    return <LandingPage onGameClick={handleGameClick} />;
  }

  if (showHome) {
    return (
      <HomePage
        onLogout={handleLogout}
        onLogoClick={handleLogoClick}
        onDetailPageClick={handleDetailPageClick}
      />
    );
  }

  // Cüzdan bağlı değilse LandingPage göster
  if (!account) {
    return <LandingPage onGameClick={handleGameClick} />;
  }

  return (
    <HomePage
      onLogout={handleLogout}
      onLogoClick={handleLogoClick}
      onDetailPageClick={handleDetailPageClick}
    />
  );
}

export default App;


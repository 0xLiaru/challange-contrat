# 🚀 Lock Friend - Quick Reference Card

## Deploy Contract (5 minutes)

```bash
# 1. Get your address
sui client active-address

# 2. Go to faucet and get test SUI
# https://faucet.testnet.sui.io/

# 3. Deploy contract
cd sui-contracts
sui client publish --gas-budget 50000000 game.move

# 4. Copy Package ID from output
# Example: Successfully published: 0x1234567890...
```

## Configure Application (2 minutes)

**Edit:** `src/contractInteraction.ts` (Lines 6-8)

```typescript
// BEFORE:
const GAME_CONTRACT_PACKAGE = "0xYourPackageId";
const GAME_MODULE = "game";

// AFTER (Example):
const GAME_CONTRACT_PACKAGE = "0x1234567890abcdef1234567890abcdef12345678";
const GAME_MODULE = "game";
```

## Run Application

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## Game Workflow

### Create Game
1. Wallet → "🎮 Blockchain Oyunu"
2. "Oyun Oluştur" tab
3. Enter:
   - **Oyun Adı:** "Taksim Oyunu"
   - **Hedef Enlem:** 41.0082
   - **Hedef Boylam:** 28.9784
   - **Stake:** 1 SUI
4. Click "Oyunu Oluştur"
5. ✅ Copy Game ID from success message

### Play Game
1. "Oyna" tab
2. Click "📍 Konumu Güncelle"
3. Allow GPS permission
4. See distance to target
5. When <100m away → "🎉 Ödülü Talep Et"
6. Reward automatically distributed!

---

## Key Files

| File | Purpose |
|------|---------|
| `sui-contracts/game.move` | Smart contract (Move) |
| `src/GamePage.tsx` | Game UI interface |
| `src/contractInteraction.ts` | Contract calls |
| `src/locationUtils.ts` | GPS functions |
| `SMART_CONTRACT_SETUP.md` | Detailed guide |

---

## Coordinate Reference

**Common Locations (for testing):**

```
Taksim (Istanbul):
- Lat: 41.0082
- Long: 28.9784

Galata:
- Lat: 41.0252
- Long: 28.9738

Bosphorus:
- Lat: 41.0530
- Long: 29.0058
```

**Distance Tolerance:**
- ±50-60 metres (500 units in contract)
- Test with nearby coordinates

---

## Smart Contract Functions

```move
// Create game pool
create_game(lat, long, payment)

// Join existing game
join_game(game, payment)

// Claim reward (with location check)
claim_winner(game, user_lat, user_long)
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Package ID not found" | Contract not deployed | Run `sui client publish...` |
| "Insufficient gas" | Gas budget too low | Increase to 100000000 |
| "TOO_FAR_FROM_LOCATION" | User >100m from target | Move closer to target location |
| "GPS not working" | Not HTTPS or no permission | Allow permission in browser |
| "EGameAlreadyClaimed" | Game already won | Create new game |

---

## Testing Coordinates

**Nearby Taksim (for testing):**

```typescript
// Target
target_lat: 41.0082
target_long: 28.9784

// Test Points (within 100m):
test1_lat: 41.0083
test1_long: 28.9784

test2_lat: 41.0081
test2_long: 28.9785

test3_lat: 41.0084
test3_long: 28.9783
```

---

## Advanced

### Change Fee Percentage
**File:** `sui-contracts/game.move` (Line ~145)
```move
let fee_value = (total_value * 5) / 100;  // Change 5 to other %
```

### Change Tolerance
**File:** `sui-contracts/game.move` (Line ~137)
```move
let tolerance: u64 = 500;  // Change from 500 to adjust distance
```

### Use Mainnet
**File:** `src/contractInteraction.ts`
```typescript
chain: "sui:mainnet"  // Change from "sui:testnet"
```

---

## Verify Deployment

```bash
# Check transaction
sui client call --package 0x... --module game --function create_game

# View object
sui client object 0x...
```

---

## Performance Tips

- Use GPS.enableHighAccuracy = true (default)
- Test outdoors for best GPS accuracy
- Clear browser cache if issues
- Use Testnet (faster transactions)

---

**Ready to deploy!** 🚀

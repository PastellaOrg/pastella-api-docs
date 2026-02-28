# Using Mobile Wallet

The Pastella mobile wallet is a secure, modern Android application for managing your PAS on the go.

## Features

- **Wallet Creation**: Generate new 25-word mnemonic wallets or import existing ones
- **Secure Storage**: Mnemonic phrases stored locally with PIN protection
- **Send & Receive**: Send transactions with QR scanning and address validation
- **Transaction History**: View all incoming, outgoing, and staking transactions
- **Staking**: Stake PAS coins with selectable durations
- **Wallet Sync**: Automatic blockchain scanning and balance tracking
- **Address Book**: Save frequently used addresses
- **Multi-language**: English, Dutch, and German support

## Installation

### From Source

```bash
git clone https://github.com/PastellaOrg/pastella-mobile-wallet.git
cd pastella-mobile-wallet
npm install
```

### Running on Device

#### Android Emulator

1. Start Android Studio and create an AVD
2. Run: `npm run android`

#### Physical Device

1. Enable USB Debugging
2. Connect via USB
3. Run: `npm run android`

### Building APK

```bash
expo build:android
```

## First Time Setup

### Creating a New Wallet

1. Open the app
2. Tap **Create Wallet**
3. Choose a PIN code
4. Write down your 25-word mnemonic seed phrase
5. Confirm your mnemonic

⚠️ **Important**: Store your mnemonic safely. It's the only way to recover your wallet!

### Importing Existing Wallet

1. Open the app
2. Tap **Import Wallet**
3. Enter your 25-word mnemonic seed phrase
4. Choose a PIN code
5. Wait for the wallet to sync

## Receiving PAS

1. Tap **Receive**
2. Copy your public address or show QR code
3. Share the address or QR code with the sender
4. Wait for the transaction to confirm

## Sending PAS

1. Tap **Send**
2. Enter the recipient address
3. Enter the amount (in PAS or atomic units)
4. Select fee tier
5. Confirm and authorize with your PIN

## Staking

1. Tap **Staking**
2. Choose staking duration:
   - 30 days (2% APY)
   - 90 days (8% APY)
   - 180 days (18% APY)
   - 365 days (50% APY)
3. Enter the amount to stake
4. Confirm and authorize

Your stake will be locked for the chosen period, and you'll earn rewards automatically.

### Viewing Stakes

- See all your active stakes
- Check pending rewards
- View stake history

## Node Configuration

The wallet connects to Pastella daemon nodes. Configure:

1. Tap **Settings** → **Node Management**
2. Add a custom node:
   - **Name**: My Node
   - **URL**: `http://your-node-ip:21001`
3. Select the node from the list

## Address Book

Save frequently used addresses:

1. Tap **Address Book**
2. Tap **Add Address**
3. Enter:
   - Name (e.g., "Exchange Wallet")
   - Address
4. Save

## Security Tips

### PIN Protection

- Always use a strong PIN
- Don't share your PIN with anyone
- Change your PIN periodically

### Backup

- **Write down your mnemonic** on paper
- Store in multiple secure locations
- Never store it digitally (screenshots, cloud storage, etc.)
- Test with a small amount first

### Device Security

- Use a screen lock
- Keep your device updated
- Avoid rooted devices
- Use official builds only

## Troubleshooting

### Sync Issues

- Check your internet connection
- Verify the node URL is correct
- Restart the app
- Make sure the node is fully synced

### Transaction Not Confirming

- Check your balance
- Verify the recipient address
- Make sure you're connected to a synced node
- Try increasing the fee

### Can't Import Wallet

- Double-check your mnemonic spelling
- Make sure you have all 25 words in the correct order
- Ensure extra spaces aren't included

## Screenshots

The wallet provides an intuitive interface for all operations:

- **Dashboard**: Balance, transaction overview
- **Send/Receive**: Clean transaction interface
- **Staking**: Easy stake creation and management
- **Settings**: Node management and preferences

## Multi-Language Support

The wallet supports:
- 🇬🇧 English
- 🇳🇱 Dutch
- 🇩🇪 German

Change language in **Settings** → **Language**.

## Getting Help

- [Help and Support](/docs/developer/help-support)
- [CLI Wallet Guide](/docs/guides/cli-wallet) - CLI wallet usage
- [API Documentation](/api.html) - Complete API reference
- [Discord](https://discord.gg/9jqwc4UWrK) - Community support

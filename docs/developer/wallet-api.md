# Pastella Wallet API

The Pastella Wallet API provides endpoints for wallet operations, address management, and transaction handling.

## Overview

The Wallet API is documented using OpenAPI 3.0.0 and includes endpoints for:

- **Wallet creation and management**
- **Address operations**
- **Transaction submission**
- **Balance queries**
- **Synchronization**

## Quick Reference

- **API Docs**: [wallet-api.html](/wallet-api.html)
- **Daemon API**: [Pastellad API](/api.html)

## Key Concepts

### Wallet Synchronization

The wallet syncs with the blockchain to track:
- Your addresses
- Transaction history
- Balance updates
- Stake information

### Address Format

Pastella addresses are public keys with the format: `PAS[58-character base58 string]`

Example:
```
PAS18z7m9DGbJFoVv6HiGoiwxNG5mLoniSEFWkguBKt59JSHPHjYaa
```

### Transactions

Pastella supports multiple transaction types:
- **COINBASE**: Mining reward transaction
- **TRANSFER**: Regular transfer transaction
- **STAKING**: Staking-related transaction

## API Endpoints

### Wallet Operations

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/createwallet` | POST | Create a new wallet |
| `/restorewallet` | POST | Restore from mnemonic |
| `/getwalletsyncdata` | GET | Get sync status |
| `/getwalletdetails` | GET | Get wallet information |
| `/getaddresses` | GET | List all addresses |
| `/getbalance` | GET | Get wallet balance |

### Transactions

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/sendtransaction` | POST | Send a transaction |
| `/gettransactionsstatus` | GET | Check transaction status |
| `/getpoolchangeslite` | GET | Get mempool changes |

### Staking

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/stake` | POST | Create a stake |
| `/getmystakes` | GET | Get your stakes |
| `/getpendingrewards` | GET | Get pending rewards |
| `/getstakingpool` | GET | Get staking pool info |

## Example Usage

### Create a Wallet

```bash
curl -X POST http://localhost:21001/createwallet
```

Response:
```json
{
  "status": "GetwalletsyncdataOK",
  "wallet_address": "PAS18z7m9DGbJFoVv6HiGoiwxNG5mLoniSEFWkguBKt59JSHPHjYaa",
  "mnemonic": "word1 word2 word3 ..."
}
```

**Important**: Save your mnemonic seed phrase securely. It's the only way to recover your wallet!

### Get Balance

```bash
curl http://localhost:21001/getbalance
```

### Send a Transaction

```bash
curl -X POST http://localhost:21001/sendtransaction \
  -H "Content-Type: application/json" \
  -d '{
    "transfers": [
      {
        "address": "PAS2...",
        "amount": 100000000000
      }
    ],
    "fee": 1000000,
    "anonymity": 0
  }'
```

## Full Documentation

For complete API documentation including all endpoints, parameters, and response schemas, see:

- **[Wallet API Reference](/wallet-api.html)** - Interactive API documentation
- **[Pastellad API](/api.html)** - Full daemon API

## Libraries and Tools

### TypeScript/JavaScript

[pastella-utils](https://github.com/PastellaOrg/pastella-utils) - Official TypeScript/JavaScript library for developers.

### Desktop Wallet

[pastella-desktop-wallet](https://github.com/PastellaOrg/pastella-desktop-wallet) - Native desktop wallet application.

### Mobile Wallet

[pastella-mobile-wallet](https://github.com/PastellaOrg/pastella-mobile-wallet) - Android mobile wallet.

## Need Help?

- [Help and Support](../developer/help-support)
- [Guides - CLI Wallet](/docs/guides/cli-wallet)
- [API Documentation](/api.html)

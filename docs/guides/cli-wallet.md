# Using CLI Wallet

The Pastella CLI wallet (`pastellad`) provides full wallet functionality through command-line and RPC interface.

## Prerequisites

- Running Pastella node (see [Running a Node](/docs/developer/running-node))
- `pastellad` compiled and running
- Basic knowledge of command-line tools or curl

## Creating a Wallet

### Generate a New Wallet

```bash
curl -X POST http://localhost:21001/createwallet
```

**Response:**
```json
{
  "status": "OK",
  "wallet_address": "PAS18z7m9DGbJFoVv6HiGoiwxNG5mLoniSEFWkguBKt59JSHPHjYaa",
  "mnemonic": "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 word13 word14 word15 word16 word17 word18 word19 word20 word21 word22 word23 word24 word25"
}
```

**⚠️ CRITICAL**: Write down your mnemonic seed phrase on paper. This is the ONLY way to recover your wallet!

### Restore from Mnemonic

```bash
curl -X POST http://localhost:21001/restorewallet \
  -H "Content-Type: application/json" \
  -d '{"mnemonic": "word1 word2 ... word25"}'
```

## Checking Balance

```bash
curl http://localhost:21001/getbalance
```

**Response:**
```json
{
  "status": "OK",
  "available_balance": 1000000000000,
  "locked_balance": 500000000000,
  "available_balance_formatted": "1000.00000000",
  "locked_balance_formatted": "500.00000000"
}
```

## Getting Addresses

### Get All Addresses

```bash
curl http://localhost:21001/getaddresses
```

**Response:**
```json
{
  "status": "OK",
  "addresses": [
    "PAS18z7m9DGbJFoVv6HiGoiwxNG5mLoniSEFWkguBKt59JSHPHjYaa",
    "PAS2..."
  ]
}
```

### Create New Address

```bash
curl -X POST http://localhost:21001/createaddress
```

## Sending Transactions

### Basic Transfer

```bash
curl -X POST http://localhost:21001/sendtransaction \
  -H "Content-Type: application/json" \
  -d '{
    "transfers": [
      {
        "address": "PAS2youraddresshere",
        "amount": 100000000000
      }
    ],
    "fee": 1000000,
    "anonymity": 0
  }'
```

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| `transfers` | Array of recipients with address and amount |
| `amount` | Amount in atomic units (1 PAS = 100,000,000 atomic units) |
| `fee` | Transaction fee in atomic units |
| `anonymity` | Privacy level (0-3, higher = more private) |

### Amount Calculation

```bash
# 1 PAS = 100,000,000 atomic units
# To send 10 PAS:
amount: 1000000000
```

## Checking Transaction Status

```bash
curl -X POST http://localhost:21001/get_transactions_status \
  -H "Content-Type: application/json" \
  -d '{"transactionHashes": ["abc123..."]}'
```

## Staking Operations

### Create a Stake

```bash
curl -X POST http://localhost:21001/stake \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000000000000,
    "anonymity": 0
  }'
```

### Get Your Stakes

```bash
curl http://localhost:21001/getmystakes
```

### Get Pending Rewards

```bash
curl -X POST http://localhost:21001/getpendingrewards \
  -H "Content: application/json" \
  -d '{}'
```

## Wallet Synchronization

### Check Sync Status

```bash
curl http://localhost:21001/getwalletsyncdata
```

**Response:**
```json
{
  "status": "OK",
  "height": 150000,
  "wallet_height": 150000,
  "synced": true
}
```

## Tips

### Using with jq for Pretty Output

```bash
curl http://localhost:21001/getbalance | jq '.'
```

### Saving Common Commands

Create aliases or scripts for common operations:

```bash
# Get balance alias
alias pas-balance="curl http://localhost:21001/getbalance | jq '.'

# Send transaction script
cat > send-pas.sh
#!/bin/bash
curl -X POST http://localhost:21001/sendtransaction \
  -H "Content-Type: application/json" \
  -d "{
    \"transfers\": [{\"address\": \"$1\", \"amount\": $2}],
    \"fee\": 1000000,
    \"anonymity\": 0
  }"
```

## Advanced Usage

### JSON-RPC via /json_rpc endpoint

All methods can also be called via POST to `/json_rpc`:

```bash
curl -X POST http://localhost:21001/json_rpc \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "getbalance",
    "params": {},
    "id": 1
  }'
```

### Multiple Wallets

Run multiple instances with different data directories:

```bash
# Wallet 1
./Pastellad --data-dir=~/.pastella1 --rpc-port=21001

# Wallet 2
./Pastellad --data-dir=~/.pastella2 --rpc-port=21002
```

## Troubleshooting

### "Wallet not found"

Make sure the daemon has synced and your wallet is created.

### "Address not found"

Double-check the address format: `PAS[58-character string]`

### "Insufficient funds"

You need more PAS in your available balance (not locked in stakes).

## Related Resources

- [API Reference](/api.html) - Full API documentation
- [Staking Guide](/docs/about/about-pastella) - Staking information
- [Getting Help](/docs/developer/help-support) - Support channels

# Making a Paper Wallet

A paper wallet is a secure way to store your PAS offline. It consists of your mnemonic seed phrase and your public address printed on paper.

## What is a Paper Wallet?

A paper wallet contains:
- **Your mnemonic seed phrase** - 25 words that restore your wallet
- **Your public address** - Where you receive funds
- **Optionally**: Your private keys for each address

## Security Benefits

- **Offline storage** - Not connected to the internet
- **Immune to malware** - No software vulnerabilities
- **Physical control** - You control the physical paper
- **Long-term storage** - Ideal for long-term holding

## Risks

- **Physical damage** - Fire, water, wear, loss
- **Theft** - Someone with the paper can access your funds
- **Human error** - Losing or forgetting the seed phrase

## Creating a Paper Wallet

### Using the Block Explorer

The easiest way to create a paper wallet is using the [Pastella Block Explorer](https://explorer.pastella.network):

1. Visit the explorer
2. Navigate to the **Wallet Generator** section
3. Follow the instructions to generate a new wallet
4. **Print or write down** your mnemonic seed phrase
5. **Print or write down** your public address

### Using CLI Tools

If you have `pastellad` running:

```bash
# Create a new wallet
curl -X POST http://localhost:21001/createwallet
```

Save the response securely:
- Write down the mnemonic on paper
- Store the public address separately
- Never store them together digitally

## Best Practices

### Generating the Wallet

1. **Use a clean, offline computer** - Disconnect from internet
2. **Use a trusted printer** - Or write by hand
3. **Generate in a secure location** - Private room, no cameras
4. **Test with small amounts first** - Verify everything works

### Storing the Paper Wallet

1. **Make multiple copies** - Store in different secure locations
2. **Use waterproof bags** - Protect from water damage
3. **Use a fireproof safe** - Protect from fire
4. **Don't show to anyone** - The mnemonic is the key to your funds
5. **Consider using a safety deposit box** - For large amounts

### Using the Paper Wallet

1. **Sweep the funds** - When you're ready to use the funds
2. **Use a fresh wallet** - After sweeping, generate a new paper wallet
3. **Don't reuse addresses** - For privacy and security

## What to Include

On your paper wallet, include:

### Required
- **Mnemonic seed phrase** (25 words)
- **Public address** (for receiving funds)

### Optional
- **Date created**
- **Wallet creation date**
- **Notes** (e.g., "Hardware wallet backup", "Main savings")
- **Amount stored** (for tracking)

## Example Paper Wallet Layout

```
===================
PASTELLA PAPER WALLET
===================

Date: February 19, 2025

Public Address (RECEIVING ADDRESS):
------------------------------------
PAS18z7m9DGbJFoVv6HiGoiwxNG5mLoniSEFWkguBKt59JSHPHjYaa

Seed Phrase (KEEP SECRET!):
-------------------------------
word1 word2 word3 word4 word5 word6 word7 word8 word9 word10
word11 word12 word13 word14 word15 word16 word17 word18 word19
word20 word21 word22 word23 word24 word25

NOTES:
- Never share the seed phrase with anyone
- This is the ONLY way to recover your wallet
- Store in a safe, dry place
- Check the address before sending large amounts
```

## Recovery

To recover your wallet from the paper:

```bash
curl -X POST http://localhost:21001/restorewallet \
  -H "Content-Type: application/json" \
  -d '{"mnemonic": "word1 word2 ... word25"}'
```

## Important Reminders

- ⚠️ **Never share your mnemonic** - Anyone with the mnemonic can access your funds
- ⚠️ **Make multiple backups** - One fire can destroy everything
- ⚠️ **Test first** - Send a small amount before storing significant funds
- ⚠️ **Use high-quality paper** - Acid-free, archival quality
- ⚠️ **Laminating** - Consider laminating for extra protection

## Digital Backup (Advanced)

For digital backup, consider:
- **Hardware wallet** - Store the seed phrase on a hardware wallet
- **Encrypted storage** - Use strong encryption for digital backups
- **Multiple locations** - Distribute encrypted backups

Remember: **Your mnemonic seed phrase is your cryptocurrency.**

## Related Resources

- [Using CLI Wallet](cli-wallet) - Command-line wallet usage
- [Using Mobile Wallet](mobile-wallet) - Mobile wallet guide
- [Security Best Practices](/docs/developer/help-support) - General security tips

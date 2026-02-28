# Get Started with Mining

Mining secures the Pastella network and rewards you with newly minted PAS coins.

## What is Mining?

Mining is the process of using computing power to:
- **Secure the network** - Validate transactions and add them to the blockchain
- **Create new coins** - Earn block rewards (currently 4 PAS per block)
- **Support decentralization** - Distributed network of miners

## Mining Rewards

| Block Time | Current Reward |
|-----------|---------------|
| 30 seconds | 4 PAS |
| Yearly halving over 10 years | See [About Pastella](/docs/about/about-pastella) |

## Mining Options

### Solo Mining
- **You receive the full block reward** when you find a block
- **No pool fees** - Keep 100% of your earnings
- **Complete independence** - Mine directly to your own wallet
- **Higher variance** - payouts are less predictable

### Pool Mining
- **Steady, predictable payouts** - Receive consistent rewards
- **Lower barrier to entry** - Start mining with less hardware
- **Community** - Join other Pastella miners
- **Pool fee** - Typically 1% fee to pool operator

### Mining with SBC (Single Board Computer)
- **Low power consumption** - Mine on Raspberry Pi or similar devices
- **Cost-effective** - Uses minimal electricity
- **Great for learning** - Perfect for beginners

## Choosing Your Approach

| Factor | Solo Mining | Pool Mining | SBC Mining |
|---------|--------------|--------------|-------------|
| **Earnings** | Full block reward | PPS/PPLNS | Depends on pool |
| **Consistency** | Less predictable | Steady | Steady |
| **Hardware** | Needs significant hash rate | Flexible | Low power OK |
| **Setup** | Simple | Medium | Simple |
| **Cost** | Higher variance | Pool fee | Low power |

## Hardware Requirements

### For Solo Mining
- **CPU**: Modern multi-core processor (8+ cores recommended)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 50GB+ for blockchain data

### For Pool Mining
- **CPU**: Any modern CPU
- **RAM**: 2GB minimum
- **Internet**: Stable connection

### For SBC Mining
- **Device**: Raspberry Pi 4 or better (4GB RAM model recommended)
- **Power**: Reliable power supply
- **Storage**: 32GB+ microSD card (Class 10 recommended)

## Software Requirements

- **Pastella daemon** (`pastellad`) - [Compile from source](/docs/developer/compiling-source) or use pre-built binaries
- **Wallet** - For receiving rewards
- **Mining software** - Options include:
  - **XMRig** (with RandomX support)
  - **Pastella native miner** (when available)

## Getting Started

### Step 1: Set Up a Wallet

You'll need a wallet address to receive your mining rewards:

1. [Create a wallet](/docs/guides/cli-wallet) or use the [mobile wallet](/docs/guides/mobile-wallet)
2. Save your **mnemonic seed phrase** securely
3. Copy your **wallet address**

### Step 2: Run a Node

Keep your node synchronized:

```bash
pastellad --enable-blockexplorer
```

### Step 3: Configure Mining

Choose your mining method:

- [Solo Mining Pastella](../mining/solo-mining) - Mine independently
- [Mining with SBC](../mining/sbc-mining) - Mine on Raspberry Pi
- [Run a Mining Pool](../mining/mining-pool) - Start your own pool

## Mining Pools

Join an existing pool to start earning quickly:

| Pool | URL | Features |
|------|-----|----------|
| **Official Pool** | [pool.pastella.network](https://pool.pastella.network) | Low fees, web interface |
| **Community Pools** | Check Discord for community-run pools | Various fee structures |

When choosing a pool, consider:
- Pool fee percentage
- Pool hash rate (your share)
- Payment threshold (when you get paid)
- Pool reputation and transparency

## Mining Rewards Calculator

Approximate earnings (before costs):

| Hash Rate (H/s) | Daily PAS (at 4 PAS/block) |
|-----------------|----------------------------|
| 100 H/s | ~1.15 PAS/day |
| 500 H/s | ~5.76 PAS/day |
| 1000 H/s | ~11.52 PAS/day |
| 5000 H/s | ~57.6 PAS/day |

*Assumes perfect mining luck. Actual earnings will vary.*

## Next Steps

- **Solo Mining**: [Solo Mining Guide](../mining/solo-mining)
- **SBC Mining**: [Raspberry Pi Guide](../mining/sbc-mining)
- **Pool Mining**: [Mining Pool Guide](../mining/mining-pool)
- **Hardware**: [Build from Source](/docs/developer/compiling-source)

## Need Help?

- [Help and Support](/docs/developer/help-support)
- [Community](/docs/about/community) - Join our Discord
- [API Reference](/api.html) - Full API documentation

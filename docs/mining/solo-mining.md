# Solo Mining Pastella

Solo mining allows you to mine Pastella independently and receive the full block reward when you find a block. This guide covers everything you need to know about solo mining.

## What is Solo Mining?

Solo mining means you mine directly to your own wallet without joining a mining pool. When your hardware finds a valid block, you receive the entire block reward (currently 4 PAS).

### Pros and Cons

| Advantages | Disadvantages |
|-----------|---------------|
| Full block reward (no pool fees) | Higher variance in payouts |
| Complete independence | Requires significant hash rate |
| Direct to your wallet | Less predictable earnings |
| No pool dependency | May go long periods without rewards |

## Prerequisites

Before starting solo mining, ensure you have:

- **Running Pastella node** - Fully synced with the network
- **Wallet address** - To receive mining rewards
- **Mining software** - XMRig or similar with RandomX support
- **Adequate hash rate** - 500+ H/s recommended for regular rewards

## Hardware Requirements

### Minimum Requirements
- **CPU**: Modern multi-core processor (4+ cores)
- **RAM**: 4GB minimum
- **Storage**: 50GB+ for blockchain data

### Recommended Configuration
- **CPU**: 8+ cores with AES-NI support
- **RAM**: 8GB+
- **Hash rate**: 1000+ H/s for consistent rewards

## Software Setup

### Step 1: Run a Pastella Node

Start the daemon with RPC enabled:

```bash
pastellad --enable-cors --rpc-bind-ip 0.0.0.0
```

**Key Parameters:**
- `--enable-cors` - Enable CORS for RPC access
- `--rpc-bind-ip 0.0.0.0` - Allow external connections
- `--rpc-bind-port 21001` - Default RPC port
- `--data-dir` - Specify blockchain data directory

Wait for the node to fully sync with the network.

### Step 2: Configure XMRig

Download and extract [XMRig](https://github.com/xmrig/xmrig/releases) (v6.16+ with RandomX support).

Create a configuration file (`config.json`):

```json
{
  "autosave": true,
  "cpu": true,
  "opencl": false,
  "cuda": false,
  "pools": [
    {
      "url": "127.0.0.1:21001",
      "user": "PAS1LqBfSfzeu7Khipaj1JbSvkJfP6yJ8Z16wZVjSdd75QqM8KTcnF",
      "pass": "x",
      "rig-id": null,
      "nicehash": false,
      "keepalive": true,
      "variant": -1,
      "tls": false,
      "tls-fingerprint": null,
      "daemon": true,
      "daemon-poll-interval": 1000
    }
  ],
  "randomx": {
    "init": -1,
    "mode": "auto",
    "1gb-pages": false,
    "rdmsr": true,
    "wrmsr": true,
    "cache_qos": false,
    "numa": true,
    "scratchpad_prefetch_mode": 1
  },
  "cpu-priority": null,
  "cpu-affinity": null,
  "threads": null,
  "donate-level": 0
}
```

**Important Settings:**
- `url`: Your daemon RPC address (127.0.0.1:21001)
- `user`: Your wallet address
- `daemon`: true - Enable solo mining mode
- `daemon-poll-interval`: 1000ms - Poll every second for new blocks

### Step 3: Start Mining

Run XMRig with your configuration:

```bash
./xmrig -c config.json
```

Or run directly with parameters:

```bash
./xmrig -o 127.0.0.1:21001 -u PAS1LqBfSfzeu7Khipaj1JbSvkJfP6yJ8Z16wZVjSdd75QqM8KTcnF --daemon
```

## Understanding Solo Mining

### How It Works

1. **Block Template Request** - XMRig requests a block template from your daemon via `getblocktemplate` RPC
2. **Mining** - Your CPU searches for a valid nonce using RandomX algorithm
3. **Submission** - When found, XMRig submits via `submitblock` RPC
4. **Reward** - If valid, you receive the full 4 PAS block reward

### Expected Variance

Solo mining has high variance. Your actual earnings will depend on:

- **Network difficulty** - Higher difficulty = harder to find blocks
- **Your hash rate** - Higher hash rate = more chances
- **Luck** - Random nature of finding blocks

**Example with 1000 H/s:**
- Network share: ~0.01%
- Expected time per block: ~8.3 hours
- Actual may vary: 1 hour to 2+ days

### Reward Calculation

```
Block Reward = 4 PAS (current halving epoch)
Your Share = 100% (no pool fees)
```

Compare to pool mining where you typically receive 99% (1% pool fee).

## RPC API Details

### getblocktemplate

Request a new block template:

```bash
curl -X POST http://localhost:21001/getblocktemplate \
  -H "Content-Type: application/json" \
  -d '{
    "reserve_size": 8,
    "wallet_address": "PAS1LqBfSfzeu7Khipaj1JbSvkJfP6yJ8Z16wZVjSdd75QqM8KTcnF"
  }'
```

**Response:**
```json
{
  "difficulty": 15000,
  "height": 12345,
  "reserved_offset": 145,
  "blocktemplate_blob": "..."
}
```

### submitblock

Submit a mined block:

```bash
curl -X POST http://localhost:21001/submitblock \
  -H "Content-Type: application/json" \
  -d '["<block_blob_hex>"]'
```

## Optimization Tips

### CPU Configuration

1. **Enable all threads** - Use `--threads` or leave `null` for auto
2. **Set CPU affinity** - Bind threads to specific cores
3. **Enable large pages** - Set `1gb-pages: true` if supported
4. **Adjust priority** - Lower if mining affects other tasks

### System Optimization

```bash
# Disable CPU frequency scaling
sudo cpupower frequency-set -g performance

# Set CPU governor to performance
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

### Mining Script (Linux)

Create a monitoring script:

```bash
#!/bin/bash
# solo-mining.sh

while true; do
  if pgrep -x "xmrig" > /dev/null; then
    echo "Mining is running..."
  else
    echo "Starting XMRig..."
    ./xmrig -c config.json
  fi
  sleep 60
done
```

## Troubleshooting

### "Low difficulty share"

This is normal in solo mining. Keep mining - only blocks matter, not shares.

### "Daemon connection failed"

Check that your daemon is running:
```bash
curl http://localhost:21001/info
```

Verify `--rpc-bind-ip 0.0.0.0` is set.

### "High rejected share rate"

- Ensure your daemon is fully synced
- Check network connectivity
- Reduce `daemon-poll-interval` if needed

### No blocks after long period

Solo mining variance is normal. Consider:
- Your hash rate vs network difficulty
- Joining a pool for steady payouts
- Checking [block explorer](https://explorer.pastella.network) for network stats

## Monitoring Your Mining

### Check Daemon Status

```bash
curl http://localhost:21001/info
```

### Check Wallet Balance

```bash
curl http://localhost:21001/getbalance
```

### View Mined Blocks

Use the [block explorer](https://explorer.pastella.network) to search for your address.

## Switching from Pool to Solo

If you're currently pool mining:

1. Stop your pool miner
2. Start your local daemon (if not running)
3. Update XMRig config to point to `127.0.0.1:21001`
4. Set `daemon: true` in config
5. Restart XMRig

## When to Choose Pool Mining Instead

Consider pool mining if you have:
- **Low hash rate** (< 500 H/s)
- **Need steady payouts** - Bills to pay, etc.
- **Lower tolerance for variance**
- **Limited uptime** - Can't mine 24/7

See [Getting Started with Mining](getting-started) for pool options.

## Next Steps

- [Mining with SBC](sbc-mining) - Solo mine on Raspberry Pi
- [Run a Mining Pool](mining-pool) - Start your own pool
- [API Reference](/api.html) - Full RPC documentation
- [Help and Support](/docs/developer/help-support) - Community support

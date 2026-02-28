# Run a Mining Pool

Running a Pastella mining pool allows miners to combine their hash rate and receive steady, predictable payouts. This guide covers setting up and operating your own mining pool.

## What is a Mining Pool?

A mining pool is a cooperative mining service where multiple miners contribute computing power to find blocks. When a block is found, rewards are distributed among participants based on their contributed shares.

### How Payouts Work

Pastella pools use **PPLNS** (Pay Per Last N Shares):

- **Pool fee**: 1% of block reward
- **Finder reward**: 1% to block finder
- **Miners**: 98% distributed proportionally

### Benefits of Running a Pool

- **Service to community** - Help smaller miners earn
- **Pool fee income** - Earn 1% of all block rewards
- **Control** - Custom payout thresholds, fees, features
- **Transparency** - Full visibility into pool operations

## Prerequisites

### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **CPU** | 4 cores | 8+ cores |
| **RAM** | 4GB | 8GB+ |
| **Storage** | 50GB SSD | 100GB+ SSD |
| **Network** | 100 Mbps | 1 Gbps |

### Software Requirements

- **OS**: Ubuntu 20.04+ / Debian 11+
- **Node.js**: v14.21.3 (use NVM)
- **Redis**: v2.6+
- **Pastella Daemon**: Latest from PastellaCore

### Network Requirements

- **Public IP** with open ports:
  - **3333** - Low end miners
  - **5555** - Mid range miners
  - **7777** - High end miners
  - **8117** - Stratum protocol
  - **80/443** - Frontend (optional)

## Installation

### Step 1: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install build dependencies
sudo apt install -y \
  build-essential \
  libssl-dev \
  libboost-all-dev \
  libsodium-dev \
  python3 \
  git

# Install Redis
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

### Step 2: Install Node.js

Use NVM for Node.js management:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js v14.21.3
nvm install 14.21.3
nvm use 14.21.3
nvm alias default 14.21.3
```

### Step 3: Install and Sync Pastella Daemon

```bash
# Clone PastellaCore
git clone https://github.com/PastellaOrg/Pastella
cd Pastella

# Build
mkdir build && cd build
cmake ..
make -j$(nproc)

# Run daemon
./src/Pastellad --rpc-bind-ip 0.0.0.0
```

Wait for full blockchain sync.

### Step 4: Clone Mining Pool

```bash
# Clone pool repository
cd ~
git clone https://github.com/PastellaOrg/pastella-mining-pool
cd pastella-mining-pool

# Install dependencies
npm install
```

## Configuration

### Step 1: Create Pool Wallet

Generate a wallet for pool rewards:

```bash
# Using Pastella Wallet API
./Pastella-Wallet-API --generate-container \
  --container-file pool.wallet \
  --container-password YourStrongPassword
```

Save the wallet address that's generated.

### Step 2: Configure Pool

Copy and edit the configuration:

```bash
cp config.json.example config.json
nano config.json
```

### Key Configuration Settings

```json
{
  "poolHost": "your-pool-domain.com",
  "poolAddress": "PAS1YourPoolWalletAddressHere",
  "coinUnits": 100000000,
  "cnAlgorithm": "randomx",
  "isRandomX": true,
  "cnVariant": 0,
  "cnHalfVariant": 0,

  "daemon": {
    "host": "127.0.0.1",
    "port": 21001
  },

  "walletApi": {
    "host": "127.0.0.1",
    "port": 21002,
    "apiKey": "your-api-key-here",
    "walletFile": "/path/to/pool.wallet",
    "walletPassword": "YourStrongPassword"
  },

  "payments": {
    "enabled": true,
    "interval": 300,
    "minPayment": 100000,
    "denomination": 1000,
    "transferFee": 1000,
    "dynamicTransferFee": true,
    "minerPayFee": true
  },

  "blockUnlocker": {
    "enabled": true,
    "poolFee": 1,
    "finderReward": 1,
    "depth": 10
  },

  "ports": {
    "3333": {
      "diff": 1000,
      "desc": "Low end hardware"
    },
    "5555": {
      "diff": 15000,
      "desc": "Mid range hardware"
    },
    "7777": {
      "diff": 25000,
      "desc": "High end hardware"
    },
    "9999": {
      "diff": 500000,
      "desc": "Super high end"
    }
  },

  "varDiff": {
    "minDiff": 100,
    "maxDiff": 100000000,
    "targetTime": 30,
    "retargetTime": 15,
    "variancePercent": 30,
    "maxJump": 50
  },

  "redis": {
    "host": "127.0.0.1",
    "port": 6379,
    "db": 0,
    "password": null
  }
}
```

### Setting Difficulty Ports

Adjust difficulty based on your miners:

| Port | Difficulty | Hardware | Notes |
|------|------------|----------|-------|
| 3333 | 1000-5000 | CPUs, SBCs | Raspberry Pi friendly |
| 5555 | 15000 | Modern CPUs | i5/i7, Ryzen |
| 7777 | 25000 | High-end CPUs | Threadripper, i9 |
| 9999 | 500000+ | Mining farms | Enterprise grade |

### Payment Configuration

Understanding payment settings:

- `interval`: Seconds between payment runs (300 = 5 minutes)
- `minPayment`: Minimum payout (100000 = 0.001 PAS)
- `denomination`: Round to this amount (1000 = 0.00001 PAS)
- `minerPayFee`: If true, miners pay transfer fee

## Running the Pool

### Start the Pool

```bash
cd ~/pastella-mining-pool
node init.js
```

You should see output like:

```
[Pool] Started on 3333 port (low difficulty)
[Pool] Started on 5555 port (mid range)
[Pool] Started on 7777 port (high end)
[Api] Listening for API requests on port 8117
```

### Create Systemd Service

For auto-start on boot:

```bash
sudo nano /etc/systemd/system/pastella-pool.service
```

```ini
[Unit]
Description=Pastella Mining Pool
After=network.target pastellad.service redis.service

[Service]
Type=simple
User=your-user
WorkingDirectory=/home/your-user/pastella-mining-pool
ExecStart=/usr/bin/node /home/your-user/pastella-mining-pool/init.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=pastella-pool

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start
sudo systemctl enable pastella-pool
sudo systemctl start pastella-pool

# View logs
sudo journalctl -u pastella-pool -f
```

## Frontend Setup

The pool includes a web frontend for miner statistics.

### Build Frontend

```bash
cd ~/pastella-mining-pool/frontend
npm install
npm run build
```

### Deploy to Web Server

```bash
# Install nginx
sudo apt install nginx

# Copy built files
sudo cp -r dist/* /var/www/html/

# Configure nginx
sudo nano /etc/nginx/sites-available/pastella-pool
```

```nginx
server {
    listen 80;
    server_name your-pool-domain.com;

    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8117;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/pastella-pool /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## Pool Management

### Monitoring Pool Performance

Access the pool API:

```bash
# Pool stats
curl http://localhost:8117/stats

# Miner stats
curl http://localhost:8117/stats?address=PAS1MinerAddress

# Worker stats
curl http://localhost:8117/workers?address=PAS1MinerAddress
```

### Redis Commands

```bash
# Connect to redis
redis-cli

# View all pool keys
KEYS pastella:*

# View pool stats
HGETALL pastella:stats

# View miner balance
HGET pastella:balances:PAS1MinerAddress balance

# Clear all data (danger!)
FLUSHDB
```

### Backup and Recovery

**Backup Redis data:**

```bash
# Save snapshot
redis-cli BGSAVE

# Backup RDB file
cp /var/lib/redis/dump.rdb ~/redis-backup-$(date +%Y%m%d).rdb
```

**Backup wallet:**

```bash
# Backup wallet file
cp pool.wallet ~/pool-wallet-backup.wallet

# Backup wallet keys
cat pool.wallet.keys > ~/pool-wallet-keys-$(date +%Y%m%d).txt
```

## Security

### Firewall Configuration

```bash
# Install UFW
sudo apt install ufw

# Allow SSH
sudo ufw allow 22/tcp

# Allow pool ports
sudo ufw allow 3333/tcp
sudo ufw allow 5555/tcp
sudo ufw allow 7777/tcp
sudo ufw allow 9999/tcp

# Allow web
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
```

### API Key Security

Generate strong API key:

```bash
# Generate random key
openssl rand -hex 32
```

Update `config.json`:

```json
"walletApi": {
  "apiKey": "generated-random-key-here"
}
```

### Rate Limiting

Protect against abuse:

```bash
# Install fail2ban
sudo apt install fail2ban

# Create filter
sudo nano /etc/fail2ban/filter.d/pastella-pool.conf
```

```
[Definition]
failregex = <HOST> .* "Ban:.*"
ignoreregex =
```

```bash
# Enable jail
sudo nano /etc/fail2ban/jail.local
```

```
[pastella-pool]
enabled = true
filter = pastella-pool
logpath = /var/log/syslog
maxretry = 10
bantime = 3600
```

## Docker Deployment

Alternative deployment using Docker:

### Dockerfile

```dockerfile
FROM node:10.24.0-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libboost-all-dev \
    redis-server \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333 5555 7777 8117

CMD ["node", "init.js"]
```

### docker-compose.yml

```yaml
version: '3'

services:
  pool:
    build: .
    ports:
      - "3333:3333"
      - "5555:5555"
      - "7777:7777"
      - "8117:8117"
    volumes:
      - ./config.json:/app/config.json
      - pool-data:/app/data
    restart: always
    depends_on:
      - redis

  redis:
    image: redis:alpine
    volumes:
      - redis-data:/data
    restart: always

volumes:
  pool-data:
  redis-data:
```

```bash
# Deploy
docker-compose up -d

# View logs
docker-compose logs -f pool
```

## Troubleshooting

### "Cannot connect to daemon"

Ensure daemon is running with RPC enabled:

```bash
# Check daemon status
curl http://localhost:21001/info

# Check daemon logs
tail -f ~/.pastella/debug.log
```

### "Wallet API connection failed"

Verify wallet API is running:

```bash
# Check if wallet API is accessible
curl http://localhost:21002/getbalance

# Start wallet API if not running
./Pastella-Wallet-API \
  --rpc-bind-port 21002 \
  --container-file pool.wallet \
  --container-password YourPassword
```

### Miners cannot connect

Check firewall and ports:

```bash
# Check if ports are listening
netstat -tulpn | grep -E '3333|5555|7777'

# Check firewall
sudo ufw status
```

### High memory usage

Tune Redis:

```bash
# Edit redis config
sudo nano /etc/redis/redis.conf
```

```
maxmemory 1gb
maxmemory-policy allkeys-lru
```

## Pool Best Practices

### 1. Regular Backups

- Backup Redis daily
- Backup wallet files weekly
- Test recovery procedures

### 2. Monitoring

- Set up alerts for pool downtime
- Monitor hash rate and miner count
- Track payout processing

### 3. Transparency

- Publish pool fee structure
- Show pool hash rate transparently
- Provide miner statistics

### 4. Community

- Provide clear documentation
- Respond to support requests
- Maintain communication channels

## Profitability

### Revenue Calculation

```
Daily Revenue = Blocks Found × Block Reward × Pool Fee
Blocks Found = (Pool Hash Rate / Network Hash Rate) × Daily Blocks
Daily Blocks = 2880 (30-second block time)
```

**Example:**
- Pool has rate: 10,000 H/s
- Network has rate: 500,000 H/s
- Pool share: 2%
- Blocks per day: ~58
- Pool fee (1%): 2.3 PAS/day

### Costs

- **VPS**: $10-50/month
- **Domain**: $10/year
- **SSL certificate**: Free (Let's Encrypt)
- **Development time**: Variable

## Next Steps

- [Solo Mining Pastella](solo-mining) - Mining details
- [Getting Started with Mining](getting-started) - Mining overview
- [Help and Support](/docs/developer/help-support) - Community support
- [API Reference](/api.html) - Pool API documentation

## Additional Resources

- [pastella-mining-pool on GitHub](https://github.com/PastellaOrg/pastella-mining-pool)
- [Pastella Community](/docs/about/community)
- [Node.js Documentation](https://nodejs.org/docs)

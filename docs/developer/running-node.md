# Running a Node

This guide covers running a Pastella full node and keeping it synchronized with the network.

## Quick Start

Once you've compiled Pastella, run the daemon:

```bash
cd Pastella/build/src
./Pastellad
```

The daemon will start synchronizing with the network. By default:

- **P2P Port**: 21000
- **RPC Port**: 21001
- **Data Directory**: `~/.pastella`

## Configuration Options

### Command-Line Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--data-dir` | Custom data directory | `~/.pastella` |
| `--rpc-bind-ip` | RPC bind IP address | `127.0.0.1` |
| `--p2p-port` | P2P network port | 21000 |
| `--rpc-port` | RPC interface port | 21001 |
| `--enable-cors` | Enable CORS for RPC | Disabled |
| `--enable-blockexplorer` | Enable block explorer features | Disabled |
| `--enable-blockexplorer-detailed` | Enable all API features | Disabled |
| `--start-mining <address>` | Start mining with wallet address | Disabled |
| `--mining-threads <N>` | Number of mining threads | 1 |

### Public Node Configuration

To run a public node accessible from the internet:

```bash
./Pastellad --rpc-bind-ip=0.0.0.0 --enable-cors
```

**Important**: Make sure your firewall allows:
- **Port 21000** - P2P network (for peer connections)
- **Port 21001** - RPC API (for external access)

### Examples

```bash
# Custom data directory
./Pastellad --data-dir=/mnt/pastella-data

# Public node with external access
./Pastellad --rpc-bind-ip=0.0.0.0 --enable-cors

# Enable block explorer mode
./Pastellad --enable-blockexplorer

# Start mining
./Pastellad --start-mining=PAS18z7m9DGbJFoVv6HiGoiwxNG5mLoniSEFWkguBKt59JSHPHjYaa
```

## Daemon Modes

### Default Mode
Basic endpoints for mining and network info.

### Block Explorer Mode (`--enable-blockexplorer`)
Adds blockchain explorer features like transaction queries and balance checks.

### Full Access Mode (`--enable-blockexplorer-detailed`)
Advanced querying features for detailed blockchain analysis.

## Connecting to the Network

### Default Seed Nodes

Pastella connects to seed nodes automatically when you start the daemon. No manual configuration needed for basic operation.

### Custom Peers

```bash
./Pastellad --add-peer=peer_ip:21000 --add-peer=another_peer:21000
```

## Checking Sync Status

Use the API to check your sync status:

```bash
curl http://localhost:21001/info
```

Response includes:
```json
{
  "status": "OK",
  "wallet_height": 150000,
  "daemon_height": 150000,
  "synchronized": true
}
```

## Running as a Service

### systemd (Linux)

Create `/etc/systemd/system/pastellad.service`:

```ini
[Unit]
Description=Pastella Daemon
After=network.target

[Service]
Type=simple
User=pastella
WorkingDirectory=/opt/pastella
ExecStart=/opt/pastella/Pastellad --rpc-bind-ip=0.0.0.0 --data-dir=/var/lib/pastella
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable pastellad
sudo systemctl start pastellad
```

### Docker

```dockerfile
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y wget
RUN wget https://github.com/PastellaOrg/PastellaCore/releases/latest/download/Pastellad-linux-x64.zip
RUN unzip Pastellad-linux-x64.zip
EXPOSE 21000 21001
CMD ["./Pastellad"]
```

## Firewall Configuration

Open the necessary ports:

```bash
# Linux
sudo ufw allow 21000/tcp comment 'Pastella P2P'
sudo ufw allow 21001/tcp comment 'Pastella RPC'
```

## Monitoring

### Logs

Logs are written to stdout. To save them:

```bash
./Pastellad 2>&1 | tee pastellad.log
```

### Health Check

```bash
# Check if daemon is responding
curl http://localhost:21001/info

# Check peer connections
curl http://localhost:21001/peers
```

## Troubleshooting

### High CPU Usage

- Normal during initial sync
- Reduce mining threads if mining
- Check for stuck sync

### Cannot Connect to Peers

- Verify ports 21000/21001 are open
- Check firewall settings
- Try restarting the daemon

### Sync Stuck

- Restart the daemon
- Check if you're on the correct chain
- Verify your internet connection

## Next Steps

- [Mining Guide](/docs/mining/getting-started) - Start mining
- [API Reference](/api.html) - Full API documentation
- [Wallet Guide](/docs/guides/cli-wallet) - Set up a wallet

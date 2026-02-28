# Mining with SBC

Single Board Computers (SBCs) like Raspberry Pi offer a low-power, cost-effective way to mine Pastella. This guide covers everything you need to know about mining on ARM devices.

## What is SBC Mining?

SBC mining uses low-power, ARM-based single board computers to mine Pastella using the RandomX algorithm. While not as powerful as desktop CPUs, SBCs offer:

- **Ultra-low power consumption** - 5-15W typical
- **Low cost** - Raspberry Pi 4 starts at $35
- **Always-on capability** - Perfect for 24/7 mining
- **Silent operation** - No fans needed

## Supported Hardware

### Recommended Devices

| Device | RAM | Hash Rate | Power | Notes |
|--------|-----|-----------|-------|-------|
| **Raspberry Pi 4** | 8GB | 50-100 H/s | ~6W | Best option |
| **Raspberry Pi 4** | 4GB | 50-100 H/s | ~5W | Good value |
| **Raspberry Pi 400** | 4GB | 50-100 H/s | ~5W | Integrated keyboard |
| **Rock Pi 4** | 4GB | 60-120 H/s | ~6W | Faster CPU |
| **Orange Pi 5** | 4GB | 100-150 H/s | ~8W | Best performance |

### Requirements

- **64-bit OS** - ARM64/aarch64 required
- **2GB RAM minimum** - 4GB+ recommended
- **Class 10 microSD** - 32GB+ recommended
- **Reliable power supply** - Undervoltage causes crashes
- **Network connection** - Ethernet preferred over WiFi

## Operating System Setup

### Recommended OS Options

#### 1. Pi64 (Recommended)

[Pi64](https://github.com/Crazyhead90/pi64) is a specialized 64-bit OS for Raspberry Pi.

```bash
# Download and flash Pi64 image
# Use Raspberry Pi Imager or Etcher
```

#### 2. Ubuntu Server ARM64

Official Ubuntu Server for Raspberry Pi:

```bash
# Download from ubuntu.com
# Flash to microSD
```

#### 3. Arch Linux ARM

Lightweight option for advanced users:

```bash
# Follow instructions on archlinuxarm.org
```

### Initial Setup

After flashing and booting:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Enable SSH (if not enabled)
sudo systemctl enable ssh
sudo systemctl start ssh

# Set static IP (optional)
sudo nano /etc/dhcpcd.conf
# Add: interface eth0
#      static ip_address=192.168.1.100/24
```

## Swap Space Configuration

ARM devices have limited RAM - add swap to prevent crashes:

```bash
# Create 4GB swap file
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify
free -h
```

## Building Pastella on ARM

### Install Dependencies

```bash
sudo apt update
sudo apt install -y \
  build-essential \
  g++-8 \
  gcc-8 \
  git \
  libboost-all-dev \
  python3-pip \
  libssl-dev \
  libsodium-dev

# Install CMake
pip3 install cmake
```

### Clone and Build PastellaCore

```bash
# Clone repository
git clone -b master --single-branch https://github.com/PastellaOrg/Pastella
cd Pastella

# Create build directory
mkdir build
cd build

# Configure for ARM
cmake \
  -DWITH_LEVELDB=ON \
  -DNO_AES=ON \
  ..

# Build (this will take a while on ARM)
make -j$(nproc)
```

**Build Options:**
- `-DWITH_LEVELDB=ON` - Use LevelDB (better for ARM)
- `-DNO_AES=ON` - Disable hardware AES (ARM compatibility)
- `-j$(nproc)` - Use all CPU cores for building

## Running a Node on SBC

### Start the Daemon

```bash
cd ~/Pastella/build
./src/Pastellad \
  --rpc-bind-ip 0.0.0.0 \
  --rpc-bind-port 21001 \
  --data-dir ~/.pastella \
  --log-level 3
```

### Create Systemd Service

```bash
sudo nano /etc/systemd/system/pastellad.service
```

```ini
[Unit]
Description=Pastella Daemon
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/Pastella/build
ExecStart=/home/pi/Pastella/build/src/Pastellad \
  --rpc-bind-ip 0.0.0.0 \
  --rpc-bind-port 21001 \
  --data-dir=/home/pi/.pastella
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start
sudo systemctl enable pastellad
sudo systemctl start pastellad

# Check logs
sudo journalctl -u pastellad -f
```

## Mining on SBC

### Build XMRig for ARM

```bash
# Clone XMRig
git clone https://github.com/xmrig/xmrig.git
cd xmrig

# Build for ARM
mkdir build
cd build
cmake .. \
  -DWITH_OPENCL=OFF \
  -DWITH_CUDA=OFF \
  -DWITH_LIBCPUID=OFF \
  -DCMAKE_BUILD_TYPE=Release

make -j$(nproc)
```

### Configure XMRig for Solo Mining

Create `config.json`:

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
      "daemon": true,
      "keepalive": true,
      "daemon-poll-interval": 1000
    }
  ],
  "randomx": {
    "init": -1,
    "mode": "auto",
    "1gb-pages": false,
    "rdmsr": true,
    "wrmsr": true,
    "numa": false
  },
  "cpu-priority": 2,
  "threads": 3
}
```

**ARM-Specific Settings:**
- `1gb-pages: false` - Not supported on ARM
- `numa: false` - Disable NUMA
- `cpu-priority: 2` - Lower priority to prevent freezes
- `threads: 3` - Leave 1 core for system (Pi 4 has 4 cores)

### Start Mining

```bash
./xmrig -c config.json
```

### Create Mining Service

```bash
sudo nano /etc/systemd/system/xmrig.service
```

```ini
[Unit]
Description=XMRig Pastella Miner
After=network.target pastellad.service

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/xmrig/build
ExecStart=/home/pi/xmrig/build/xmrig \
  -c /home/pi/xmrig/config.json
Restart=always
RestartSec=10
Nice=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable xmrig
sudo systemctl start xmrig
```

## Performance Optimization

### CPU Governor

Set to performance mode:

```bash
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# Make permanent
sudo apt install cpupower
sudo cpupower frequency-set -g performance
```

### Thermal Management

Monitor temperature:

```bash
# Check temperature
vcgencmd measure_temp

# Set throttle warning (80°C)
echo 80 | sudo tee /sys/class/thermal/thermal_zone0/trip_point_0_temp

# Under-voltage detection
vcgencmd get_throttled
# Output: 0x0 = Not throttled
```

### Overclocking (Optional)

Raspberry Pi 4 overclocking in `/boot/config.txt`:

```bash
sudo nano /boot/config.txt
```

```
# Overclock settings (at your own risk)
over_voltage=4
arm_freq=2000
gpu_freq=650
```

**⚠️ Warning**: Overclocking may reduce lifespan and cause instability.

### Cooling Solutions

- **Passive cooling** - Heatsinks on CPU and RAM
- **Active cooling** - Small 5V fan
- **Case selection** - Ventilated case recommended
- **Avoid enclosed spaces** - Ensure airflow

## Pool Mining on SBC

For more consistent rewards, join a mining pool:

```json
{
  "pools": [
    {
      "url": "pool.pastella.network:3333",
      "user": "PAS1LqBfSfzeu7Khipaj1JbSvkJfP6yJ8Z16wZVjSdd75QqM8KTcnF",
      "pass": "rig1",
      "daemon": false,
      "keepalive": true
    }
  ]
}
```

**Pool ports:**
- `3333` - Low difficulty (Pi-friendly)
- `5555` - Medium difficulty
- `7777` - High difficulty

## Expected Earnings

### Solo Mining Example

With 80 H/s on Raspberry Pi 4:
- **Daily**: ~0.9 PAS (perfect luck)
- **Reality**: 0-5 PAS per day (high variance)
- **Time per block**: ~4 days (average)

### Pool Mining Example

With 80 H/s in a pool:
- **Daily**: ~0.9 PAS (steady)
- **Payout**: Every 1-3 days
- **Consistency**: Predictable earnings

## Power Consumption

| Device | Idle | Mining | Daily (kWh) | Monthly (kWh) |
|--------|------|--------|-------------|---------------|
| Pi 4 (4GB) | 2W | 5W | 0.12 | 3.6 |
| Pi 4 (8GB) | 2.5W | 6W | 0.144 | 4.32 |

**Cost calculation** (at $0.12/kWh):
- Pi 4: ~$0.43/month electricity
- Very profitable even at low hash rates

## Monitoring

### Local Monitoring

```bash
# Check CPU usage
htop

# Check temperature
watch -n 5 vcgencmd measure_temp

# Check mining status
tail -f ~/.xmrig.log
```

### Remote Monitoring

Set up web-based monitoring:

```bash
# Install web server
sudo apt install nginx lighttpd

# Create status page
sudo nano /var/www/html/status.html
```

### Email Alerts

Use cron to check uptime:

```bash
crontab -e
```

```
*/10 * * * * pgrep -x xmrig || echo "XMRig stopped" | mail -s "Mining Alert" you@example.com
```

## Troubleshooting

### "Illegal instruction" error

Build failed - recompile with `-DNO_AES=ON`.

### System crashes or freezes

- Check power supply voltage
- Reduce thread count in XMRig config
- Add swap space
- Check temperature

### Low hash rate

- Verify CPU governor is set to "performance"
- Check for thermal throttling
- Reduce thread count if system is unresponsive
- Use Ubuntu/Debian instead of Raspbian

### Out of memory

```bash
# Add more swap
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## Multi-Pi Mining Farm

Scale up with multiple Pis:

### Setup

1. Flash all SD cards with same image
2. Use different static IPs
3. Run same daemon config
4. Mine to same wallet address

### Power Management

- Use powered USB hub
- Consider industrial-grade power supply
- Monitor total amperage

### Management

Use Ansible or similar for mass deployment:

```yaml
# playbook.yml
- hosts: pis
  tasks:
    - name: Update system
      apt: update_cache=yes upgrade=dist
    - name: Copy XMRig config
      copy: src=config.json dest=/home/pi/xmrig/
```

## Security

### Firewall

```bash
sudo apt install ufw
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 21001/tcp # RPC
sudo ufw enable
```

### SSH Hardening

```bash
sudo nano /etc/ssh/sshd_config
```

```
PermitRootLogin no
PasswordAuthentication no
```

### Auto-updates

```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

## Next Steps

- [Solo Mining Pastella](solo-mining) - Solo mining details
- [Getting Started with Mining](getting-started) - Mining overview
- [Run a Mining Pool](mining-pool) - Pool operator guide
- [Help and Support](/docs/developer/help-support) - Community support

## Additional Resources

- [Raspberry Pi Documentation](https://www.raspberrypi.com/documentation)
- [XMRig ARM Builds](https://github.com/xmrig/xmrig/releases)
- [Pastella on GitHub](https://github.com/PastellaOrg)

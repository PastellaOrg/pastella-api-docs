# Help and Support

Need help with Pastella? Here are the best ways to get support.

## Quick Links

- **GitHub Issues**: [PastellaCore Issues](https://github.com/PastellaOrg/PastellaCore/issues)
- **Discord**: [Join our Discord](https://discord.gg/9jqwc4UWrK)
- **Documentation**: [API Reference](/api.html)

## Getting Help

### Before Asking for Help

1. **Search existing issues** - Your question may already be answered
2. **Check the documentation** - Most answers are in our docs
3. **Include relevant information**:
   - OS and version
   - Pastella version
   - Error messages or logs
   - Steps to reproduce

## Common Issues

### Build/Compilation Problems

See [Compiling from Source](../developer/compiling-source) for platform-specific instructions.

### RPC Connection Issues

- Verify port 21001 is not blocked by firewall
- Check if the daemon is running: `ps aux | grep Pastellad`
- Test locally: `curl http://localhost:21001/info`

### Sync Problems

- Check your connection to seed nodes
- Verify your clock is synchronized
- Restart the daemon and let it resync

### Wallet Issues

- Make sure your wallet file is backed up
- Verify your mnemonic seed is safe
- Check if the daemon is fully synced before troubleshooting wallet operations

## Community Resources

### Discord

Our [Discord server](https://discord.gg/9jqwc4UWrK) is the best place for:
- Real-time help from other users
- Developer discussions
- General questions

### GitHub Issues

Use GitHub issues for:
- Bug reports
- Feature requests
- Documentation improvements

Always use the issue templates when available.

### Documentation

- [API Reference](/api.html) - Complete API documentation
- [Compiling from Source](../developer/compiling-source) - Build instructions
- [Running a Node](../developer/running-node) - Daemon configuration

## Contributing

Found a bug or want to help improve Pastella? See [Contributing](/docs/about/contributing) for guidelines.

## Professional Support

For enterprise or production support, contact the Pastella team through official channels.

## Emergency Contact

For critical issues affecting the entire network:
- Post on Discord (tag @moderators)
- Create a GitHub issue with the "critical" label

## Reporting Security Vulnerabilities

**Do NOT create public issues for security problems.**

Contact the team directly through private channels or use the security disclosure process documented in the repository.

---

Thank you for using Pastella!

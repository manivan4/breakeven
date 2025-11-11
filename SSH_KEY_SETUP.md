# SSH Key Setup - Quick Reference

## Your SSH Public Key
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMiKPbht9TdA40Y73AWwT+bLCuwsgAMUq6FYqffKZl+V github
```

## Steps to Add to GitHub

1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Title: `InnovateHer Mac` (or any descriptive name)
4. Key type: Authentication Key
5. Key: Paste the key above
6. Click "Add SSH key"

## After Adding the Key

Run this command to push your code:
```bash
git push -u origin main
```

The SSH key has already been:
- ✅ Generated
- ✅ Added to ssh-agent
- ✅ Remote URL changed to SSH

You just need to add it to GitHub!


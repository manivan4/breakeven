# How to Push to GitHub

Your code has been committed locally. To push to GitHub, you need to authenticate.

## Option 1: Personal Access Token (Recommended)

1. **Create a Personal Access Token on GitHub:**
   - Go to https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name (e.g., "InnovateHer Project")
   - Select scopes: check `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Push using the token:**
   ```bash
   git push -u origin main
   ```
   - When prompted for username: enter your GitHub username
   - When prompted for password: paste your personal access token (not your GitHub password)

## Option 2: Switch to SSH (More Secure, One-Time Setup)

1. **Generate an SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter to accept default file location
   # Press Enter twice for no passphrase (or set one if you prefer)
   ```

2. **Add SSH key to ssh-agent:**
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. **Copy your public key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy the entire output
   ```

4. **Add SSH key to GitHub:**
   - Go to https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your public key
   - Click "Add SSH key"

5. **Change remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:lalitboyapati/InnovateHer.git
   ```

6. **Push:**
   ```bash
   git push -u origin main
   ```

## Option 3: Install GitHub CLI

1. **Install GitHub CLI:**
   ```bash
   brew install gh
   ```

2. **Authenticate:**
   ```bash
   gh auth login
   # Follow the prompts to authenticate
   ```

3. **Push:**
   ```bash
   git push -u origin main
   ```

## Quick Push (After Authentication)

Once you've set up authentication using any of the above methods, you can push:

```bash
git push -u origin main
```

The `-u` flag sets up tracking so future pushes can be done with just `git push`.


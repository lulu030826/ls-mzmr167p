# Seal

Private notes vault built for iPhone. Notes are encrypted on-device with your passphrase (AES-GCM via Web Crypto). Publish this app as **private** in Cursor so only your signed-in account can open it.

## Local

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765` (needs a secure context for Web Crypto).

## Security model

- Passphrase never leaves the device
- Vault ciphertext lives in `localStorage` on that browser/phone
- Cursor private publish adds sign-in at the host edge (separate from note encryption)

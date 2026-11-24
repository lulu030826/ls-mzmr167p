const STORAGE_KEY = "seal.vault.v1";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const gate = document.getElementById("gate");
const vault = document.getElementById("vault");
const form = document.getElementById("unlock-form");
const passphraseInput = document.getElementById("passphrase");
const unlockBtn = document.getElementById("unlock-btn");
const gateHint = document.getElementById("gate-hint");
const lockBtn = document.getElementById("lock-btn");
const noteBody = document.getElementById("note-body");
const saveBtn = document.getElementById("save-btn");
const noteList = document.getElementById("note-list");
const noteCount = document.getElementById("note-count");
const emptyState = document.getElementById("empty-state");
const statusLine = document.getElementById("status-line");

/** @type {CryptoKey | null} */
let sessionKey = null;
/** @type {{ id: string, text: string, createdAt: number }[]} */
let notes = [];

function bufToB64(buf) {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function b64ToBuf(b64) {
  const s = atob(b64);
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
  return bytes.buffer;
}

async function deriveKey(passphrase, salt) {
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 250000,
      hash: "SHA-256",
    },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptPayload(key, data) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(JSON.stringify(data))
  );
  return { iv: bufToB64(iv), cipher: bufToB64(cipher) };
}

async function decryptPayload(key, envelope) {
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b64ToBuf(envelope.iv) },
    key,
    b64ToBuf(envelope.cipher)
  );
  return JSON.parse(decoder.decode(plain));
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function setHint(text, kind) {
  gateHint.textContent = text || "";
  gateHint.classList.remove("error", "ok");
  if (kind) gateHint.classList.add(kind);
}

function formatWhen(ts) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toLocaleString();
  }
}

function renderNotes() {
  noteList.innerHTML = "";
  noteCount.textContent = String(notes.length);
  emptyState.hidden = notes.length > 0;

  notes
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((note, index) => {
      const li = document.createElement("li");
      li.className = "note-item";
      li.style.animationDelay = `${Math.min(index, 6) * 40}ms`;

      const p = document.createElement("p");
      p.textContent = note.text;

      const meta = document.createElement("div");
      meta.className = "note-meta";

      const when = document.createElement("span");
      when.textContent = formatWhen(note.createdAt);

      const del = document.createElement("button");
      del.type = "button";
      del.className = "btn danger";
      del.textContent = "Delete";
      del.addEventListener("click", () => removeNote(note.id));

      meta.append(when, del);
      li.append(p, meta);
      noteList.appendChild(li);
    });
}

async function persistNotes() {
  if (!sessionKey) return;
  const store = loadStore() || {};
  const encrypted = await encryptPayload(sessionKey, { notes });
  store.payload = encrypted;
  saveStore(store);
}

async function removeNote(id) {
  notes = notes.filter((n) => n.id !== id);
  await persistNotes();
  renderNotes();
}

function showVault() {
  gate.hidden = true;
  vault.hidden = false;
  renderNotes();
  noteBody.focus();
}

function showGate(isNew) {
  sessionKey = null;
  notes = [];
  vault.hidden = true;
  gate.hidden = false;
  unlockBtn.textContent = isNew ? "Create vault" : "Unlock";
  passphraseInput.value = "";
  setHint(
    isNew
      ? "Choose a passphrase you will remember. It never leaves this phone."
      : "Enter your passphrase to decrypt notes on this device."
  );
  passphraseInput.focus();
}

async function unlock(passphrase) {
  const existing = loadStore();

  if (!existing?.salt) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(passphrase, salt);
    const verifier = await encryptPayload(key, { ok: true, createdAt: Date.now() });
    saveStore({
      salt: bufToB64(salt),
      verifier,
      payload: await encryptPayload(key, { notes: [] }),
    });
    sessionKey = key;
    notes = [];
    setHint("Vault created on this device.", "ok");
    showVault();
    return;
  }

  const salt = b64ToBuf(existing.salt);
  const key = await deriveKey(passphrase, salt);
  try {
    await decryptPayload(key, existing.verifier);
    const data = await decryptPayload(key, existing.payload);
    sessionKey = key;
    notes = Array.isArray(data.notes) ? data.notes : [];
    setHint("");
    showVault();
  } catch {
    setHint("Wrong passphrase for this device vault.", "error");
    passphraseInput.select();
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const passphrase = passphraseInput.value;
  if (passphrase.length < 8) {
    setHint("Use at least 8 characters.", "error");
    return;
  }
  unlockBtn.disabled = true;
  try {
    await unlock(passphrase);
  } finally {
    unlockBtn.disabled = false;
  }
});

lockBtn.addEventListener("click", () => {
  const hasVault = Boolean(loadStore()?.salt);
  showGate(!hasVault);
});

saveBtn.addEventListener("click", async () => {
  const text = noteBody.value.trim();
  if (!text) {
    noteBody.focus();
    return;
  }
  notes.push({
    id: crypto.randomUUID(),
    text,
    createdAt: Date.now(),
  });
  noteBody.value = "";
  saveBtn.disabled = true;
  try {
    await persistNotes();
    renderNotes();
  } finally {
    saveBtn.disabled = false;
    noteBody.focus();
  }
});

(function init() {
  const store = loadStore();
  const isNew = !store?.salt;
  showGate(isNew);
  if (!window.isSecureContext || !crypto?.subtle) {
    setHint("This browser cannot encrypt. Open Seal over HTTPS.", "error");
    unlockBtn.disabled = true;
  }
  statusLine.textContent = "Encrypted on this device · passphrase never uploaded";
})();

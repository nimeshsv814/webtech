// server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); // if not already present
const crypto = require('crypto');
const { createUser, findUserByEmail, ping } = require('./dbmodule');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname))); // serves index.html, signup.html, login.html, assets...
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simple password hashing helper (replace with bcrypt if you prefer)
function hashPassword(plain) {
  // NOTE: prefer bcrypt in production; this is a lightweight placeholder
  return crypto.createHash('sha256').update(plain).digest('hex');
}

// Health check
app.get('/health', async (req, res) => {
  try {
    const ok = await ping();
    res.status(ok ? 200 : 500).json({ ok });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

// ----- AUTH ENDPOINTS -----
// Signup (expects fields: name, email, password)
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing name/email/password' });
  }

  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const id = await createUser({
      name,
      email,
      passwordHash: hashPassword(password)
    });

    res.status(201).json({ id, name, email });
  } catch (err) {
    console.error('Signup failed', err);
    res.status(500).json({ error: 'Internal error' });
  }
});

// Login (expects fields: email, password)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email/password' });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = user.password_hash === hashPassword(password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    // Return minimal profile; plug in sessions/JWT later if needed
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error('Login failed', err);
    res.status(500).json({ error: 'Internal error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import Database from 'better-sqlite3';

const db = new Database('dentist.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS dentists (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    qualification TEXT,
    experience INTEGER,
    clinicName TEXT,
    address TEXT,
    location TEXT,
    photoUrl TEXT
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientName TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    appointmentDate TEXT,
    dentistId TEXT,
    dentistName TEXT,
    clinicName TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/dentists', (req, res) => {
    try {
      const dentists = db.prepare('SELECT * FROM dentists').all();
      res.json(dentists);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dentists' });
    }
  });

  app.post('/api/dentists', (req, res) => {
    try {
      const { id, name, qualification, experience, clinicName, address, location, photoUrl } = req.body;
      const stmt = db.prepare('INSERT OR REPLACE INTO dentists (id, name, qualification, experience, clinicName, address, location, photoUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
      stmt.run(id, name, qualification, experience, clinicName, address, location, photoUrl);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add dentist' });
    }
  });

  app.get('/api/appointments', (req, res) => {
    try {
      const appointments = db.prepare('SELECT * FROM appointments ORDER BY createdAt DESC').all();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  });

  app.post('/api/appointments', (req, res) => {
    try {
      const { patientName, age, gender, appointmentDate, dentistId, dentistName, clinicName } = req.body;
      const stmt = db.prepare('INSERT INTO appointments (patientName, age, gender, appointmentDate, dentistId, dentistName, clinicName) VALUES (?, ?, ?, ?, ?, ?, ?)');
      const info = stmt.run(patientName, age, gender, appointmentDate, dentistId, dentistName, clinicName);
      res.status(201).json({ id: info.lastInsertRowid, ...req.body });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

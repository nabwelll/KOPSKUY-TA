import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv. config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Redis Client Setup - CLOUD VERSION
const redisClient = createClient({
    url: process. env.REDIS_URL
  });

  redisClient.on('error', (err) => console.log('❌ Redis Client Error', err));
  redisClient.on('connect', () => console.log('🔗 Connecting to Redis Cloud... '));
  redisClient.on('ready', () => console.log('✅ Redis Cloud connected!'));

await redisClient.connect();

// Test connection
try {
    await redisClient.ping();
    console.log('🏓 Redis PING successful!');
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
  }

// ============ REDIS ROUTES - UNTUK BELAJAR ============

// 1. SET - Simpan data ke Redis
app.post('/api/cache/set', async (req, res) => {
  try {
    const { key, value, expiry } = req.body; // expiry in seconds
    
    if (expiry) {
      await redisClient.setEx(key, expiry, JSON. stringify(value));
    } else {
      await redisClient. set(key, JSON.stringify(value));
    }
    
    res.json({ success: true, message: 'Data cached successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET - Ambil data dari Redis
app.get('/api/cache/get/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const value = await redisClient.get(key);
    
    if (value) {
      res.json({ success: true, data: JSON.parse(value) });
    } else {
      res.json({ success: false, message: 'Key not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. DELETE - Hapus data dari Redis
app.delete('/api/cache/delete/:key', async (req, res) => {
  try {
    const { key } = req.params;
    await redisClient.del(key);
    res.json({ success: true, message: 'Key deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Example: Caching menu kopi
app.get('/api/menu/coffee', async (req, res) => {
  try {
    const cacheKey = 'menu: coffee';
    
    // Cek cache dulu
    const cachedMenu = await redisClient.get(cacheKey);
    
    if (cachedMenu) {
      console.log('📦 Serving from cache');
      return res.json({ 
        success: true, 
        source: 'cache',
        data: JSON.parse(cachedMenu) 
      });
    }
    
    // Kalau ga ada di cache, fetch dari "database" (dummy data)
    console.log('🔄 Fetching from database');
    const menuData = [
      { id: 1, name: 'Espresso', price: 15000 },
      { id: 2, name: 'Cappuccino', price: 25000 },
      { id:  3, name: 'Latte', price: 28000 },
    ];
    
    // Simpan ke cache (expired after 60 seconds)
    await redisClient.setEx(cacheKey, 60, JSON.stringify(menuData));
    
    res.json({ 
      success: true, 
      source: 'database',
      data: menuData 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Example: Counter (untuk track visits)
app.post('/api/counter/increment', async (req, res) => {
  try {
    const count = await redisClient.incr('page:visits');
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/counter/get', async (req, res) => {
  try {
    const count = await redisClient.get('page:visits') || 0;
    res. json({ success: true, count:  parseInt(count) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', redis: redisClient.isOpen ?  'connected' : 'disconnected' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Redis status: ${redisClient.isOpen ?  'connected' : 'disconnected'}`);
});
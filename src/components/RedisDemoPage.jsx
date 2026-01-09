import { useState, useEffect } from 'react';
import { redisService } from '../services/redisService';

export default function RedisDemoPage() {
  const [coffeeMenu, setCoffeeMenu] = useState([]);
  const [source, setSource] = useState('');
  const [visitCount, setVisitCount] = useState(0);
  const [customKey, setCustomKey] = useState('');
  const [customValue, setCustomValue] = useState('');

  // Load coffee menu dengan caching
  const loadMenu = async () => {
    const result = await redisService.getCoffeeMenu();
    setCoffeeMenu(result. data);
    setSource(result.source); // 'cache' atau 'database'
  };

  // Increment visit counter
  const incrementVisit = async () => {
    const result = await redisService.incrementVisit();
    setVisitCount(result.count);
  };

  // Custom cache demo
  const saveCustomCache = async () => {
    await redisService.setCache(customKey, customValue, 30); // expire in 30s
    alert('Data saved to Redis!');
  };

  const getCustomCache = async () => {
    const result = await redisService.getCache(customKey);
    if (result. success) {
      alert(`Value: ${result.data}`);
    } else {
      alert('Key not found! ');
    }
  };

  useEffect(() => {
    loadMenu();
    incrementVisit();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔴 Redis Demo - KOPSKUY</h1>
      
      {/* Visit Counter */}
      <div style={{ marginBottom: '30px', padding: '15px', background: '#f0f0f0' }}>
        <h2>📊 Visit Counter</h2>
        <p>Total visits:  <strong>{visitCount}</strong></p>
        <button onClick={incrementVisit}>Increment</button>
      </div>

      {/* Coffee Menu with Caching */}
      <div style={{ marginBottom: '30px' }}>
        <h2>☕ Coffee Menu (Cached)</h2>
        <p>Data source: <strong style={{ color: source === 'cache' ? 'green' : 'orange' }}>
          {source === 'cache' ? '📦 Cache' : '🔄 Database'}
        </strong></p>
        <button onClick={loadMenu} style={{ marginBottom: '10px' }}>Reload Menu</button>
        <ul>
          {coffeeMenu. map(item => (
            <li key={item.id}>{item.name} - Rp {item.price. toLocaleString()}</li>
          ))}
        </ul>
        <small>💡 Pertama kali load dari "database", selanjutnya dari cache (60 detik)</small>
      </div>

      {/* Custom Cache */}
      <div style={{ padding: '15px', background: '#fff3cd' }}>
        <h2>🔧 Custom Cache</h2>
        <input 
          type="text" 
          placeholder="Key" 
          value={customKey}
          onChange={(e) => setCustomKey(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Value" 
          value={customValue}
          onChange={(e) => setCustomValue(e. target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={saveCustomCache}>Save to Redis</button>
        <button onClick={getCustomCache} style={{ marginLeft: '10px' }}>Get from Redis</button>
        <p><small>⏱️ Auto expire after 30 seconds</small></p>
      </div>
    </div>
  );
}
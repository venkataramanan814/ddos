import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [packetData, setPacketData] = useState([]);
  const [attackDetected, setAttackDetected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/packets');
        const data = await response.json();
        setPacketData(data);
        // Simple logic to detect DDoS (threshold-based)
        setAttackDetected(data.length > 1000); // Example threshold
      } catch (error) {
        console.error('Error fetching packet data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DDoS Attack Detection</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>Status: {attackDetected ? 'Attack Detected' : 'Normal'}</h2>
            <h3>Packet Data</h3>
            <pre>{JSON.stringify(packetData, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import Dashboard from './components/Dashboard';
import theme from './theme';
import { fetchMentions } from './api/mentionApi';

const baseURL = process.env.REACT_APP_BACKEND_URL;
const socket = io(baseURL);


function App() {
  const [mentions, setMentions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spike, setSpike] = React.useState(null);

  React.useEffect(() => {
    async function fetchSpike() {
      try {
        const res = await fetch(`${baseURL}/api/spike`);
        const data = await res.json();
        setSpike(data);
      } catch (e) {
        console.error("Spike API failed", e);
      }
    }
    fetchSpike();
    const interval = setInterval(fetchSpike, 60000);
    return () => clearInterval(interval);
  }, [baseURL]);

  useEffect(() => {
    fetchMentions()
      .then(res => {
        setMentions(res.data.reverse());
        setLoading(false);
      })
      .catch(() => setLoading(false));

    socket.on('newMention', (mention) => {
      // console.log('🔔 new mention received from socket:', mention);
      setMentions(prev => [mention, ...prev]);
    });

    return () => {
      socket.off('newMention');
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f0ff 0%, #e8f6ff 100%)', py: 6, px: { xs: 0, md: 6 } }}>
        <Dashboard mentions={mentions} setMentions={setMentions} loading={loading} spike={spike} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
